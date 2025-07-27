 







  
    
        // Sample data for suppliers
        const suppliers = [
            {
                id: 1,
                name: "FreshSpice Distributors",
                category: "spices",
                location: "Delhi",
                rating: 4.7,
                products: 150,
                image: "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                verified: true,
                description: "Specializing in authentic Indian spices and masalas for street food"
            },
            {
                id: 2,
                name: "Mumbai Masala Co.",
                category: "spices",
                location: "Mumbai",
                rating: 4.9,
                products: 200,
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                verified: true,
                description: "Premium quality masalas and ingredients for authentic street food"
            },
            {
                id: 3,
                name: "Hyderabad Veggie Hub",
                category: "vegetables",
                location: "Hyderabad",
                rating: 4.2,
                products: 80,
                image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                verified: true,
                description: "Fresh vegetables and produce for street food vendors"
            },
            {
                id: 4,
                name: "Chennai Dairy Co.",
                category: "dairy",
                location: "Chennai",
                rating: 3.8,
                products: 50,
                image: "https://images.unsplash.com/photo-1603532648951-a599f07879ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                verified: false,
                description: "Fresh dairy products for street food preparation"
            }
        ];

        // In-memory storage for users and applications
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let supplierApplications = JSON.parse(localStorage.getItem('supplierApplications')) || [];

        // DOM Elements
        const supplierGrid = document.getElementById('supplierGrid');
        const searchInput = document.getElementById('searchInput');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            loadSuppliers(suppliers);
            
            // Form submissions
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
            
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleSignup();
            });
            
            document.getElementById('supplierSearchForm').addEventListener('submit', function(e) {
                e.preventDefault();
                searchSuppliersAdvanced();
            });
            
            document.getElementById('supplierSignupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleSupplierSignup();
            });
            
            // Close modals when clicking outside
            window.addEventListener('click', function(event) {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (event.target === modal) {
                        closeModal(modal.id);
                    }
                });
            });
            
            // Enable Enter key for search
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchSuppliers();
                }
            });
        });

        // Load suppliers into the grid
        function loadSuppliers(suppliersList) {
            supplierGrid.innerHTML = '';
            
            if (suppliersList.length === 0) {
                supplierGrid.innerHTML = '<p class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">No suppliers found. Try a different search.</p>';
                return;
            }
            
            suppliersList.forEach(supplier => {
                const supplierCard = document.createElement('div');
                supplierCard.className = 'supplier-card';
                
                // Determine badge type
                let badgeClass = 'badge';
                let badgeText = 'Verified';
                
                if (!supplier.verified) {
                    badgeClass = 'badge badge-danger';
                    badgeText = 'New';
                } else if (supplier.rating >= 4.5) {
                    badgeClass = 'badge badge-warning';
                    badgeText = 'Premium';
                }
                
                // Generate star rating
                let stars = '';
                const fullStars = Math.floor(supplier.rating);
                const hasHalfStar = supplier.rating % 1 >= 0.5;
                
                for (let i = 0; i < fullStars; i++) {
                    stars += '<i class="fas fa-star"></i>';
                }
                
                if (hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                }
                
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                for (let i = 0; i < emptyStars; i++) {
                    stars += '<i class="far fa-star"></i>';
                }
                
                supplierCard.innerHTML = `
                    <div class="supplier-image" style="background-image: url('${supplier.image}');"></div>
                    <div class="supplier-info">
                        <div class="supplier-header">
                            <h3 class="supplier-name">${supplier.name}</h3>
                            <span class="${badgeClass}">${badgeText}</span>
                        </div>
                        <div class="rating">
                            ${stars}
                            <span>(${supplier.rating})</span>
                        </div>
                        <p>${supplier.description}</p>
                        <div class="supplier-stats">
                            <span><i class="fas fa-box"></i> ${supplier.products}+ Products</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${supplier.location}</span>
                        </div>
                        <div class="supplier-actions">
                            <button class="btn btn-small btn-primary" onclick="viewProducts(${supplier.id})">View Products</button>
                            <button class="btn btn-small btn-outline" onclick="contactSupplier(${supplier.id})">Contact</button>
                        </div>
                    </div>
                `;
                
                supplierGrid.appendChild(supplierCard);
            });
        }

        // Search suppliers
        function searchSuppliers() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                loadSuppliers(suppliers);
                return;
            }
            
            const filteredSuppliers = suppliers.filter(supplier => 
                supplier.name.toLowerCase().includes(searchTerm) ||
                supplier.description.toLowerCase().includes(searchTerm) ||
                supplier.location.toLowerCase().includes(searchTerm) ||
                supplier.category.toLowerCase().includes(searchTerm)
            );
            
            loadSuppliers(filteredSuppliers);
        }

        // Advanced search suppliers
        function searchSuppliersAdvanced() {
            const category = document.getElementById('searchCategory').value;
            const location = document.getElementById('searchLocation').value.toLowerCase().trim();
            
            let filteredSuppliers = [...suppliers];
            
            if (category) {
                filteredSuppliers = filteredSuppliers.filter(supplier => 
                    supplier.category === category
                );
            }
            
            if (location) {
                filteredSuppliers = filteredSuppliers.filter(supplier => 
                    supplier.location.toLowerCase().includes(location)
                );
            }
            
            loadSuppliers(filteredSuppliers);
            closeModal('supplierSearchModal');
            showNotification(`Found ${filteredSuppliers.length} suppliers matching your criteria`, 'info');
        }

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        
        // Show notification
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
        
        // Form handlers
        function handleLogin() {
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Check if user exists
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                showNotification(`Welcome back, ${user.name}!`, 'success');
                closeModal('loginModal');
                document.getElementById('loginForm').reset();
            } else {
                showNotification('Invalid email or password', 'error');
            }
        }
        
        function handleSignup() {
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const userType = document.getElementById('signupType').value;
            
            // Simple validation
            if (!name || !email || !password || !userType) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Check if user already exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                showNotification('User with this email already exists', 'error');
                return;
            }
            
            // Create new user
            const newUser = {
                id: users.length + 1,
                name,
                email,
                password, // In production, hash the password!
                type: userType
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            showNotification(`Account created successfully! Welcome ${name}.`, 'success');
            closeModal('signupModal');
            document.getElementById('signupForm').reset();
        }
        
        function handleSupplierSignup() {
            const name = document.getElementById('supplierName').value.trim();
            const contact = document.getElementById('supplierContact').value.trim();
            const email = document.getElementById('supplierEmail').value.trim();
            const phone = document.getElementById('supplierPhone').value.trim();
            const location = document.getElementById('supplierLocation').value.trim();
            const category = document.getElementById('supplierCategory').value;
            const description = document.getElementById('supplierDescription').value.trim();
            
            // Simple validation
            if (!name || !contact || !email || !phone || !location || !category) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Create new supplier application
            const newApplication = {
                id: supplierApplications.length + 1,
                businessName: name,
                contactPerson: contact,
                email,
                phone,
                location,
                category,
                description,
                status: 'pending',
                submittedAt: new Date().toISOString()
            };
            
            supplierApplications.push(newApplication);
            localStorage.setItem('supplierApplications', JSON.stringify(supplierApplications));
            
            showNotification(`Supplier application submitted for ${name}. We'll contact you soon!`, 'success');
            closeModal('supplierSignupModal');
            document.getElementById('supplierSignupForm').reset();
        }
        
        // Action handlers
        function viewProducts(supplierId) {
            const supplier = suppliers.find(s => s.id === supplierId);
            if (supplier) {
                showNotification(`Viewing products for ${supplier.name}`, 'info');
            }
        }
        
        function contactSupplier(supplierId) {
            const supplier = suppliers.find(s => s.id === supplierId);
            if (supplier) {
                showNotification(`Contact request sent to ${supplier.name}`, 'success');
            }
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
   