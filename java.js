document.addEventListener('DOMContentLoaded', function () {
    const airportDrop = document.getElementById('airportDrop');
    const airportPickup = document.getElementById('airportPickup');

    airportDrop.addEventListener('change', function () {
        if (airportDrop.checked) {
            airportPickup.checked = false;
        }
    });

    airportPickup.addEventListener('change', function () {
        if (airportPickup.checked) {
            airportDrop.checked = false;
        }
    });

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const startKm = parseInt(document.getElementById('startKM').value);
        const endKm = parseInt(document.getElementById('endKM').value);
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const tollCharges = parseInt(document.getElementById('toll').value) || 0;
        const parkingCharges = parseInt(document.getElementById('parking').value) || 0;

        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const endDate = new Date(`1970-01-01T${endTime}:00`);
        let differenceInMillis = endDate - startDate;
        let totalTime = differenceInMillis / (1000 * 60 * 60);

        // Ensure minimum total time is 10 hours
        totalTime = totalTime < 10 ? 10 : totalTime;

        const totalKm = endKm - startKm;

        let totalAmount = 0;
        let moneyForHours = 0;
        let moneyForKm = 0;

        const vehicleType = document.getElementById('vehicleType').value;
        if (airportDrop.checked || airportPickup.checked) {
            totalAmount = vehicleType === 'Innova' ? 1700 + parkingCharges : 800 + parkingCharges;
        } else {
            if (vehicleType === 'Innova') {
                if (totalKm >= 300) {
                    moneyForHours = totalTime * 375;
                    totalAmount = moneyForHours + tollCharges + parkingCharges;
                } else {
                    moneyForHours = totalTime * 375;
                    if (totalKm > (totalTime * 10)) {
                        moneyForKm = (totalKm - (totalTime * 10)) * 18.5;
                        totalAmount = moneyForHours + moneyForKm + tollCharges + parkingCharges;
                    } else {
                        moneyForKm = ((totalTime * 10) - totalKm) * 18.5;
                        totalAmount = moneyForHours + moneyForKm + tollCharges + parkingCharges;
                    }
                }
            } else {
                if (totalKm >= 300) {
                    moneyForHours = totalTime * 200;
                    totalAmount = moneyForHours + tollCharges + parkingCharges;
                } else {
                    moneyForHours = totalTime * 200;
                    if (totalKm > (totalTime * 10)) {
                        moneyForKm = (totalKm - (totalTime * 10)) * 12.5;
                        totalAmount = moneyForHours + moneyForKm + tollCharges + parkingCharges;
                    } else {
                        moneyForKm = ((totalTime * 10) - totalKm) * 12.5;
                        totalAmount = moneyForHours + moneyForKm + tollCharges + parkingCharges;
                    }
                }
            }
        }

        const resultArea = document.getElementById('resultArea');
        const date = new Date().toLocaleDateString();

        resultArea.innerHTML = `Date: ${date}<br>Total Time: ${totalTime} hours<br>Total Kilometers: ${totalKm} km<br>Money for Hours: Rs. ${moneyForHours}<br>Money for Km: Rs. ${moneyForKm}<br>Toll Charges: Rs. ${tollCharges}<br>Parking Charges: Rs. ${parkingCharges}<br>Total Amount: Rs. ${totalAmount}`;
    });
});