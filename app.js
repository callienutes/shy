document.addEventListener('DOMContentLoaded', (event) => {
    const prices = {
        price1: 150.00,
        price2: 120.00,
        price3: 140.00,
        price4: 100.00,
        price5: 180.00,
        price6: 200.00,
        price7: 100.00,
    };

    const qtyInputs = [
        document.getElementById('qty1'),
        document.getElementById('qty2'),
        document.getElementById('qty3'),
        document.getElementById('qty4'),
        document.getElementById('qty5'),
        document.getElementById('qty6'),
        document.getElementById('qty7')
    ];

    const totalInput = document.getElementById('total');
    const cashInput = document.getElementById('cash');
    const changeInput = document.getElementById('change');
    const cartsTextarea = document.getElementById('carts');

    function updateCart() {
        let total = 0;
        let cartText = '';

        qtyInputs.forEach((input, index) => {
            const qty = parseInt(input.value) || 0;
            const priceKey = `price${index + 1}`;
            const productPrice = prices[priceKey];
            if (qty > 0) {
                const totalPrice = qty * productPrice;
                total += totalPrice;
                cartText += `Product ${index + 1} - Quantity: ${qty}, Price: ₱${totalPrice.toFixed(2)}\n`;
            }
        });

        totalInput.value = `₱${total.toFixed(2)}`;
        cartsTextarea.value = cartText.trim();
        calculateChange(); // Recalculate change whenever cart is updated
    }

    function calculateChange() {
        const total = parseFloat(totalInput.value.substr(1)) || 0; // Remove '₱' before parsing
        const cash = parseFloat(cashInput.value) || 0;
        const change = cash - total;
        changeInput.value = `₱${change.toFixed(2)}`;
    }

    qtyInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateCart();
            calculateChange(); // Ensure change is calculated after updating cart
        });
    });
    cashInput.addEventListener('input', calculateChange);

    // Quotes functionality
    const quotes = [
        "Don't be trapped in someone else's dream.",
        "Effort makes you. You will regret someday if you don’t do your best now.",
        "Go on your path, even if you live for a day.",
        "Live your life. It's yours anyway.",
        "Maybe I made a mistake yesterday, but yesterday’s me is still me.",
        "The only time you should ever look back is to see how far you’ve come."
        "Even if you’re not perfect, you’re limited edition."
    "I think that loving yourself is the first step to real love."
    "You're too young to let the world break you." 
    "Rather than worrying about the future, wouldn’t it be better to just live and not worry?" 
    "Don't be afraid. It's okay to lose."
    "It's not about being perfect. It's about effort. And when you bring that effort every single day, that's where transformation happens. That's how change occurs."
    ];

    function displayQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quoteText = document.getElementById('quote');
        quoteText.textContent = quotes[randomIndex];
    }

    document.querySelector('.quote-button').addEventListener('click', displayQuote);

    // Print Receipt
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', () => {
        const receiptContent = `
            ========================
            Shy's BTS Album's Boutique
            ========================
            ${cartsTextarea.value}

            Total: ${totalInput.value}
            Cash Tendered: ₱${cashInput.value}
            Change: ${changeInput.value}

        `;
        alert('Printing receipt:\n\n' + receiptContent);
        // Implement actual printing logic here
    });
});
