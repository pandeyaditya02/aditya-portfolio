function populateCRM() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  
  // Define headers
  var headers = ["Business Name", "Owner Name", "Phone", "Email", "Instagram", "Live Preview URL", "Status"];
  sheet.appendRow(headers);
  
  // Lead Data
  var data = [
    [
      "El Pique Taquería",
      "Hernandez Family",
      "323-555-0187",
      "hola@elpiquetaqueria.com",
      "@elpiquetaqueria",
      "https://pandeyaditya02.github.io/01-el-pique-taqueria/",
      "Not Contacted"
    ],
    [
      "Ruben's Auto Repair",
      "Ruben Morales",
      "323-555-0294",
      "ruben@rubensautorepair.com",
      "@rubensautorepair",
      "https://pandeyaditya02.github.io/02-rubens-auto-repair/",
      "Not Contacted"
    ],
    [
      "Golden Shears Barbershop",
      "Carlos 'Charlie' Vega",
      "213-555-0341",
      "info@goldenshears.com",
      "@goldenshearsla",
      "https://pandeyaditya02.github.io/03-golden-shears-barbershop/",
      "Not Contacted"
    ],
    [
      "Sunny's Coin Laundry",
      "Kim Family",
      "213-555-0478",
      "hello@sunnyscoinlaundry.com",
      "@sunnyscoinlaundry",
      "https://pandeyaditya02.github.io/04-sunnys-coin-laundry/",
      "Not Contacted"
    ],
    [
      "Rosa's Flower Garden",
      "Rosa Delgado",
      "323-555-0562",
      "hello@rosasflowergarden.com",
      "@rosasflowergarden",
      "https://pandeyaditya02.github.io/05-rosas-flower-garden/",
      "Not Contacted"
    ],
    [
      "Lucky Nails & Spa",
      "Linh & Mai Nguyen",
      "323-555-0619",
      "hello@luckynailsspa.com",
      "@luckynailsla",
      "https://pandeyaditya02.github.io/06-lucky-nails-spa/",
      "Not Contacted"
    ],
    [
      "Mike's Plumbing Solutions",
      "Mike Thompson",
      "818-555-0735",
      "info@mikesplumbingsolutions.com",
      "@mikesplumbingla",
      "https://pandeyaditya02.github.io/07-mikes-plumbing/",
      "Not Contacted"
    ],
    [
      "El Gallo Bakery",
      "Espinoza Family",
      "323-263-5528",
      "info@elgallobakery.com",
      "@elgallobakery",
      "https://pandeyaditya02.github.io/08-la-abuela-bakery/",
      "Not Contacted"
    ],
    [
      "Zen Garden Massage",
      "Elena Sato",
      "323-555-0953",
      "hello@zengardenmassage.com",
      "@zengardenla",
      "https://pandeyaditya02.github.io/09-zen-garden-massage/",
      "Not Contacted"
    ],
    [
      "Paws & Claws Pet Grooming",
      "Amanda Chen",
      "310-555-1047",
      "woof@pawsandclawsgrooming.com",
      "@pawsclawsgrooming",
      "https://pandeyaditya02.github.io/10-paws-claws-grooming/",
      "Not Contacted"
    ]
  ];
  
  // Append data rows
  for (var i = 0; i < data.length; i++) {
    sheet.appendRow(data[i]);
  }
  
  // Format headers: Navy Blue (#0F2C59), White Text, Bold, Center-Aligned
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0F2C59")
             .setFontColor("#FFFFFF")
             .setFontWeight("bold")
             .setHorizontalAlignment("center");
             
  // Auto-resize column widths
  sheet.autoResizeColumns(1, headers.length);
  
  // Add Dropdown Data Validation for Status (Column G, rows 2-11)
  var statusRange = sheet.getRange(2, 7, data.length, 1);
  var rule = SpreadsheetApp.newDataValidation()
                           .requireValueInList(["Not Contacted", "Sent", "Replied", "Closed"], true)
                           .setAllowInvalid(false)
                           .build();
  statusRange.setDataValidation(rule);
  
  // Apply formatting to status cells (italicize, center)
  statusRange.setHorizontalAlignment("center");
  
  // Set sheet grid lines to be visible
  sheet.setHideGridlines(false);
  
  SpreadsheetApp.getUi().alert("CRM spreadsheet successfully created with " + data.length + " entries!");
}
