document.addEventListener('DOMContentLoaded', (event) => {
    const prices = {
        price1: 15000.00,
        price2: 12000.00,
        price3: 14000.00,
        price4: 10000.00,
        price5: 18000.00,
        price6: 20000.00,
        price7: 10000.00
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
});
