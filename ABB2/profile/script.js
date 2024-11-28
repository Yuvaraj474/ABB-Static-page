document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('auction-form');
    const auctionItemsContainer = document.getElementById('auction-items');
    const homePageItemsContainer = document.getElementById('home-page-items');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const minBid = document.getElementById('min-bid').value;
        const currentBid = document.getElementById('current-bid').value;
        const endTime = document.getElementById('end-time').value;
        const itemImage = document.getElementById('item-image').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const newItem = document.createElement('div');
            newItem.classList.add('auction-item');

            newItem.innerHTML = `
                <img src="${e.target.result}" alt="${itemName}">
                <div>
                    <h3>${itemName}</h3>
                    <p>Minimum Bid: $${minBid}</p>
                    <p>Current Bid: $${currentBid}</p>
                    <p>Ends in: ${endTime}</p>
                </div>
                <button class="delete-item">Delete</button>
            `;

            newItem.querySelector('.delete-item').addEventListener('click', function() {
                newItem.remove();
                removeItemFromHomePage(itemName);
            });

            auctionItemsContainer.appendChild(newItem);

            // Add item to home page
            const homePageItem = newItem.cloneNode(true);
            homePageItem.querySelector('.delete-item').addEventListener('click', function() {
                homePageItem.remove();
                removeItemFromManagementSection(itemName);
            });

            homePageItemsContainer.appendChild(homePageItem);
        };

        reader.readAsDataURL(itemImage);
        form.reset();
    });

    function removeItemFromHomePage(itemName) {
        const homePageItems = homePageItemsContainer.querySelectorAll('.auction-item');
        homePageItems.forEach(item => {
            if (item.querySelector('h3').textContent === itemName) {
                item.remove();
            }
        });
    }

    function removeItemFromManagementSection(itemName) {
        const managementItems = auctionItemsContainer.querySelectorAll('.auction-item');
        managementItems.forEach(item => {
            if (item.querySelector('h3').textContent === itemName) {
                item.remove();
            }
        });
    }
});
