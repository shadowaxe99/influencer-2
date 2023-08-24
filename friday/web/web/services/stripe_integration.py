import stripe

stripe.api_key = os.getenv('STRIPE_API_KEY')

def refund(charge_id):
    return stripe.Refund.create(charge=charge_id)

def get_transaction_history(customer_id):
    return stripe.Charge.list(customer=customer_id)

def create_charge(amount, currency, source, description):
    return stripe.Charge.create(
        amount=amount,
        currency=currency,
        source=source,
        description=description
    )

def retrieve_charge(charge_id):
    return stripe.Charge.retrieve(charge_id)