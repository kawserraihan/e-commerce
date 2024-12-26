
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("description");

  const tabContent = {
    description: (
      <div>
        <p>
          Uninhibited carnally hired played in whimpered dear gorilla koala
          depending and much yikes off far quetzal goodness and from for
          grimaced goodness unaccountably and meadowlark near unblushingly
          crucial scallop.
        </p>
        <ul>
          <li>Type of Packing: Bottle</li>
          <li>Color: Green, Pink, Powder Blue, Purple</li>
          <li>Quantity Per Case: 100ml</li>
          <li>Ethyl Alcohol: 70%</li>
          <li>Piece in Case: Carton</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
          euismod odio, gravida pellentesque urna varius vitae.
        </p>
        <h4>Packaging & Delivery</h4>
        <p>
          Less lion goodness that euphemistically robin epically bluebird smugly
          scratched far while thus cackled sheepishly rigid far.
        </p>
        <h4>Suggested Use</h4>
        <p>Refrigeration not necessary. Stir before serving.</p>
        <h4>Other Ingredients</h4>
        <p>
          Organic raw pecans, organic raw cashews. Made in machinery that
          processes tree nuts but does not process peanuts, gluten, dairy, or
          soy.
        </p>
        <h4>Warnings</h4>
        <p>Oil separation occurs naturally. May contain pieces of shell.</p>
      </div>
    ),
    additionalInfo: (
      <div>
        <h4>Additional Information</h4>
        <p>Here you can add extra information about the product.</p>
      </div>
    ),
    vendor: (
      <div>
        <h4>Vendor Information</h4>
        <p>Details about the vendor go here.</p>
      </div>
    ),
    reviews: (
      <div>
        <h4>Reviews (5)</h4>
        <p>Customer reviews and ratings for the product.</p>
      </div>
    ),
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
        maxWidth: "900px",
        margin: "2rem auto",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "1.5rem",
        }}
      >
        {["description", "additionalInfo", "vendor", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              fontWeight: activeTab === tab ? "700" : "400",
              color: activeTab === tab ? "#10b981" : "#6b7280",
              borderBottom: activeTab === tab ? "2px solid #10b981" : "none",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tab === "description"
              ? "Description"
              : tab === "additionalInfo"
              ? "Additional Info"
              : tab === "vendor"
              ? "Vendor"
              : "Reviews (5)"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
