const items = [
  { title: "FIGMA", popular: true },
  { title: "ADOBE ILLUSTRATOR", popular: false },
  { title: "PROCREATE", popular: false },
  { title: "AFFINITY DESIGNER", popular: false },
];

// Function to render items
function renderItems() {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear previous content

  items.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = "flex justify-between items-start";

    const contentDiv = document.createElement("div");
    contentDiv.className = "space-y-2";

    const titleContainer = document.createElement("div");
    titleContainer.className = "flex items-center gap-2";

    const title = document.createElement("h2");
    title.className = "text-[#58a6ff] text-2xl font-bold";
    title.textContent = item.title;

    titleContainer.appendChild(title);

    // Check if the item is popular and add the badge
    if (item.popular) {
      const popularBadge = document.createElement("span");
      popularBadge.className =
        "px-2 py-0.5 text-xs border border-white/20 rounded-full text-white";
      popularBadge.textContent = "POPULAR";
      titleContainer.appendChild(popularBadge);
    }

    const description = document.createElement("p");
    description.className = "text-white/90 max-w-2xl";
    description.textContent =
      "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows.";

    contentDiv.appendChild(titleContainer);
    contentDiv.appendChild(description);

    const link = document.createElement("a");
    link.href = "#";
    link.className =
      "px-4 py-2 bg-[#58a6ff] text-black font-bold rounded-full text-sm hover:bg-[#58a6ff]/90 transition-colors";
    link.textContent = "VISIT WEBSITE";

    itemContainer.appendChild(contentDiv);
    itemContainer.appendChild(link);

    app.appendChild(itemContainer);
  });
}

// Call the function to render items on page load
renderItems();
