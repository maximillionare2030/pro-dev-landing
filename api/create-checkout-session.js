import Stripe from 'stripe'

// Initialize Stripe with error handling
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables')
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })
  : null

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if Stripe is initialized
  if (!stripe) {
    console.error('Stripe not initialized: STRIPE_SECRET_KEY missing')
    return res.status(500).json({
      error: 'Server configuration error. Please contact support.',
    })
  }

  try {
    const { amount } = req.body

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount. Minimum donation is $0.50.' })
    }

    // Get the base URL for success/cancel redirects
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers.host || req.headers['x-forwarded-host']
    const baseUrl = req.headers.origin ||
      (host ? `${protocol}://${host}` : 'http://localhost:3000')

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Developing Aspiring Young Professionals',
              description: 'Support UCI students with professional development opportunities',
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
      metadata: {
        donation_amount: (amount / 100).toFixed(2),
      },
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return res.status(500).json({
      error: error.message || 'An error occurred while creating the checkout session'
    })
  }
}

