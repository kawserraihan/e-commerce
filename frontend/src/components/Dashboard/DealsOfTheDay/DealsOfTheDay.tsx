import React from 'react';


const deals = [
  {
    name: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
    price: "$32.85",
    originalPrice: "$35.85",
    image: "/images/deals.jpg",
    by: "NestFood",
  },
  {
    name: "Perdue Simply Smart Organics Gluten Free",
    price: "$24.85",
    originalPrice: "$26.85",
    image: "/images/deals.jpg",
    by: "Old El Paso",
  },
  {
    name: "Signature Wood-Fired Mushroom and Caramelized",
    price: "$12.85",
    originalPrice: "$15.85",
    image: "/images/deals.jpg",
    by: "Progresso",
  },
  {
    name: "Simply Lemonade with Raspberry Juice",
    price: "$15.85",
    originalPrice: "$16.85",
    image: "/images/deals.jpg",
    by: "Yoplait",
  },
];

const categories = {
  topSelling: [
    {
      name: "Nestle Original Coffee-Mate Coffee Creamer",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Nestle Original Coffee-Mate Coffee Creamer",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Nestle Original Coffee-Mate Coffee Creamer",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
  ],
  trending: [
    {
      name: "Organic Cage-Free Grade A Large Brown Eggs",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Naturally Flavored Cinnamon French Toast Coffee",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
  ],
  recentlyAdded: [
    {
      name: "Pepperidge Farm Farmhouse Hearty White Bread",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Organic Frozen Triple Berry Blend",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Oroweat Country Buttermilk Bread",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
  ],
  topRated: [
    {
      name: "Foster Farms Takeout Crispy Classic Buffalo Wings",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "Angie's Boomchickapop Sweet and Salty Kettle Corn",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
    {
      name: "All Natural Italian-Style Chicken Meatballs",
      price: "$32.85",
      image: "/images/deals.jpg",
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

export default function DealsOfTheDay() {
  return (
    <section
      style={{
        padding: "2rem",
        backgroundColor: "#f9fafb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#111827",
        }}
      >
        Deals Of The Day
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
        }}
      >
        {deals.map((deal, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#fff",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              height: "100%",
            }}
          >
            <img
              src={deal.image}
              alt={deal.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            />
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#111827",
                }}
              >
                {deal.name}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                by {deal.by}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    color: "#10b981",
                    fontWeight: "700",
                    fontSize: "1rem",
                  }}
                >
                  {deal.price}
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  {deal.originalPrice}
                </span>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#10b981",
                color: "#fff",
                fontWeight: "700",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "auto",
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {Object.keys(categories).map((category, index) => (
          <div key={index}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              {category.replace(/([A-Z])/g, " $1")}
            </h3>
            {categories[category].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#111827",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#10b981",
                      fontWeight: "700",
                    }}
                  >
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
