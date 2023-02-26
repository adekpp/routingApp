import jsPDF from "jspdf";


export const generatePdf = (routeInstructions, cost, distance) => {
  const doc = new jsPDF(
    "p",
    "mm",
    "a4",
    true 
  );


  let y = 20;

  doc.setFontSize(16);
  doc.text("Route Description", 20, y);
  y += 10;
  doc.setFontSize(12);
   doc.text(`Total distance: ${distance} km  Total cost: ${cost} pln`, 20, y);
    y += 10;

  for (let i = 0; i < routeInstructions.length; i++) {
    const step = routeInstructions[i];

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(`${step.type}: ${step.text}`, 10, y);
    y += 10 
    doc.setFontSize(10);
    doc.text(`Distance: ${step.distance} m`, 20, y);
    doc.text(`Time: ${step.time.toFixed()} s`, 60, y);
    doc.text(`Road: ${step.road}`, 90, y);
    y += 10;
    

    if (y >= doc.internal.pageSize.height - 20) {
      doc.addPage();
      y = 20;
    }
  }


  doc.save("route.pdf");
};
