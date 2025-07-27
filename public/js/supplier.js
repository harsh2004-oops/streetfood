// // Wait for the DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Sample data for demonstration with restaurant-related products
//     let products = [
//         {
//             id: 1,
//             name: "Organic Tomatoes",
//             category: "vegetable",
//             price: 45,
//             quantity: 50
//         },
//         {
//             id: 2,
//             name: "Fresh Basil Leaves",
//             category: "spice",
//             price: 120,
//             quantity: 20
//         },
//         {
//             id: 3,
//             name: "Farm Fresh Milk",
//             category: "dairy",
//             price: 60,
//             quantity: 30
//         }
//     ];

//     let orders = [
//         {
//             id: 101,
//             restaurant: "La Bella Italia",
//             product: "Organic Tomatoes",
//             quantity: 10,
//             total: 450,
//             status: "pending"
//         },
//         {
//             id: 102,
//             restaurant: "Spice Garden",
//             product: "Fresh Basil Leaves",
//             quantity: 5,
//             total: 600,
//             status: "shipped"
//         },
//         {
//             id: 103,
//             restaurant: "Green Leaf Cafe",
//             product: "Farm Fresh Milk",
//             quantity: 15,
//             total: 900,
//             status: "delivered"
//         }
//     ];

//     // DOM Elements
//     const addProductBtn = document.getElementById('addProductBtn');
//     const productForm = document.getElementById('productForm');
//     const cancelProductBtn = document.getElementById('cancelProductBtn');
//     const productFormElement = document.getElementById('productFormElement');
//     const productsContainer = document.getElementById('productsContainer');
//     const ordersContainer = document.getElementById('ordersContainer');
//     const productCount = document.getElementById('productCount');
//     const orderCount = document.getElementById('orderCount');
//     const revenueCount = document.getElementById('revenueCount');

//     // Initialize the dashboard
//     updateStats();
//     renderProducts();
//     renderOrders();

//     // Show product form
//     if (addProductBtn) {
//         addProductBtn.addEventListener('click', function() {
//             if (productForm) {
//                 productForm.classList.add('active');
//             }
//         });
//     }

//     // Hide product form
//     if (cancelProductBtn) {
//         cancelProductBtn.addEventListener('click', function() {
//             if (productForm) {
//                 productForm.classList.remove('active');
//             }
//             if (productFormElement) {
//                 productFormElement.reset();
//             }
//         });
//     }

//     // Handle product form submission
//     if (productFormElement) {
//         productFormElement.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const productName = document.getElementById('productName').value;
//             const productCategory = document.getElementById('productCategory').value;
//             const productPrice = parseFloat(document.getElementById('productPrice').value);
//             const productQuantity = parseInt(document.getElementById('productQuantity').value);
            
//             const newProduct = {
//                 id: Date.now(),
//                 name: productName,
//                 category: productCategory,
//                 price: productPrice,
//                 quantity: productQuantity
//             };
            
//             products.push(newProduct);
//             renderProducts();
//             updateStats();
            
//             // Reset form and hide
//             productFormElement.reset();
//             if (productForm) {
//                 productForm.classList.remove('active');
//             }
//         });
//     }

//     // Update dashboard statistics
//     function updateStats() {
//         if (productCount) {
//             productCount.textContent = products.length;
//         }
        
//         if (orderCount) {
//             const pendingOrders = orders.filter(order => order.status === 'pending').length;
//             orderCount.textContent = pendingOrders;
//         }
        
//         if (revenueCount) {
//             const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
//             revenueCount.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
//         }
//     }

//     // Render products to the page
//     function renderProducts() {
//         if (!productsContainer) return;
        
//         if (products.length === 0) {
//             productsContainer.innerHTML = `
//                 <div class="empty-state">
//                     <i class="fas fa-carrot"></i>
//                     <h3>No Products Added</h3>
//                     <p>Click "Add Product" to start listing your restaurant supplies</p>
//                 </div>
//             `;
//             return;
//         }
        
//         productsContainer.innerHTML = '';
        
//         products.forEach(product => {
//             let categoryClass = '';
//             let categoryName = '';
            
//             switch(product.category) {
//                 case 'vegetable':
//                     categoryClass = 'tag-vegetable';
//                     categoryName = 'Vegetable';
//                     break;
//                 case 'spice':
//                     categoryClass = 'tag-spice';
//                     categoryName = 'Spice';
//                     break;
//                 case 'dairy':
//                     categoryClass = 'tag-dairy';
//                     categoryName = 'Dairy';
//                     break;
//                 case 'meat':
//                     categoryClass = 'tag-meat';
//                     categoryName = 'Meat';
//                     break;
//                 default:
//                     categoryClass = 'tag-vegetable';
//                     categoryName = 'Other';
//             }
            
//             const productCard = document.createElement('div');
//             productCard.className = 'item-card';
//             productCard.innerHTML = `
//                 <div class="item-image">
//                     <i class="fas fa-${product.category === 'vegetable' ? 'carrot' : 
//                                       product.category === 'spice' ? 'mortar-pestle' : 
//                                       product.category === 'dairy' ? 'cheese' : 
//                                       product.category === 'meat' ? 'drumstick-bite' : 'box'}"></i>
//                 </div>
//                 <div class="item-details">
//                     <h3>${product.name}</h3>
//                     <p><span>Category:</span> <span class="category-tag ${categoryClass}">${categoryName}</span></p>
//                     <p><span>Price:</span> <span>₹${product.price.toLocaleString('en-IN')}/unit</span></p>
//                     <p><span>Quantity:</span> <span>${product.quantity} units</span></p>
//                 </div>
//                 <div class="item-actions">
//                     <button class="btn btn-outline"><i class="fas fa-edit"></i> Edit</button>
//                     <button class="btn btn-outline" style="color: #e76f51; border-color: #e76f51;"><i class="fas fa-trash"></i> Delete</button>
//                 </div>
//             `;
//             productsContainer.appendChild(productCard);
//         });
//     }

//     // Render orders to the page
//     function renderOrders() {
//         if (!ordersContainer) return;
        
//         if (orders.length === 0) {
//             ordersContainer.innerHTML = `
//                 <div class="empty-state">
//                     <i class="fas fa-shopping-cart"></i>
//                     <h3>No Orders Yet</h3>
//                     <p>Restaurant orders will appear here</p>
//                 </div>
//             `;
//             return;
//         }
        
//         ordersContainer.innerHTML = '';
        
//         orders.forEach(order => {
//             let statusClass = '';
//             let statusText = '';
            
//             switch(order.status) {
//                 case 'pending':
//                     statusClass = 'status-pending';
//                     statusText = 'Pending';
//                     break;
//                 case 'shipped':
//                     statusClass = 'status-shipped';
//                     statusText = 'Shipped';
//                     break;
//                 case 'delivered':
//                     statusClass = 'status-delivered';
//                     statusText = 'Delivered';
//                     break;
//             }
            
//             const orderCard = document.createElement('div');
//             orderCard.className = 'item-card';
//             orderCard.innerHTML = `
//                 <div class="item-image" style="background: linear-gradient(45deg, var(--warning), var(--danger));">
//                     <i class="fas fa-receipt"></i>
//                 </div>
//                 <div class="item-details">
//                     <h3>Order #${order.id}</h3>
//                     <p><span>Restaurant:</span> <span>${order.restaurant}</span></p>
//                     <p><span>Product:</span> <span>${order.product}</span></p>
//                     <p><span>Quantity:</span> <span>${order.quantity} units</span></p>
//                     <p><span>Total:</span> <span>₹${order.total.toLocaleString('en-IN')}</span></p>
//                     <p><span>Status:</span> <span class="status-badge ${statusClass}">${statusText}</span></p>
//                 </div>
//                 <div class="item-actions">
//                     <button class="btn btn-outline"><i class="fas fa-eye"></i> View</button>
//                     <button class="btn btn-primary"><i class="fas fa-truck"></i> Update</button>
//                 </div>
//             `;
//             ordersContainer.appendChild(orderCard);
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const productFormElement = document.getElementById("productFormElement");
    const addProductBtn = document.getElementById("addProductBtn");
    const productForm = document.getElementById("productForm");
    const cancelProductBtn = document.getElementById("cancelProductBtn");
    const productTableBody = document.querySelector("#productTable tbody");
    const productCount = document.getElementById("productCount");

    // Show the add product form
    addProductBtn.addEventListener("click", () => {
        productForm.style.display = "block";
    });

    // Cancel and hide the form
    cancelProductBtn.addEventListener("click", () => {
        productForm.style.display = "none";
        productFormElement.reset();
    });

    // Handle form submission
    productFormElement.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("productName").value;
        const category = document.getElementById("productCategory").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const quantity = parseInt(document.getElementById("productQuantity").value);

        const productData = { name, category, price, quantity };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                appendProductToTable(data.product);
                productFormElement.reset();
                productForm.style.display = "none";
            } else {
                alert(data.error || 'Failed to save product');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while adding the product.');
        }
    });

    // Append a product row to the table
    function appendProductToTable(p) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price.toFixed(2)}</td>
            <td>${p.quantity}</td>
        `;

        productTableBody.appendChild(row);
        productCount.textContent = document.querySelectorAll("#productTable tbody tr").length;
    }

    // Optional: Load existing products when page loads
    async function loadExistingProducts() {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();

            if (res.ok) {
                data.products.forEach(appendProductToTable);
                productCount.textContent = data.products.length;
            } else {
                console.warn(data.error || 'Failed to load products');
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    }

    loadExistingProducts();
});
