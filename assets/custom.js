// Function to find an object by ID
function findObjectById(id) {
  const objects = canvas.getObjects();
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].get("id") === id) {
      return objects[i];
    }
  }
  return null;
} 

// Function to resize canvas and adjust object positions
function resizeCanvas(newWidth, newHeight, obj_height) {
  var oldWidth = canvas.getWidth();
  var oldHeight = canvas.getHeight();

  // Set new canvas dimensions
  canvas.setWidth(newWidth);
  canvas.setHeight(newHeight);

  // Calculate position adjustments
  var widthRatio = newWidth / oldWidth;
  var heightRatio = newHeight / oldHeight;

  canvas.getObjects().forEach(function (obj) {
    if (obj.type === "i-text" || obj.type === "text") {
      obj.scaleToHeight(obj_height);
      obj.scaleToWidth(obj.width * widthRatio);
      obj.set({
        left: obj.left * widthRatio,
        top: obj.top * heightRatio,
      });
    } else {
      obj.scaleToHeight(canvas.height - obj_height);
      obj.set({
        left: obj.left * widthRatio,
        top: obj.top * heightRatio,
      });
    }
    obj.setCoords();
  });
  canvas.renderAll();
}
function updateHeight() {}

// Design Click End
function refreshClickSvg($this) {
  var class_exsist = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all"
  ).hasClass("active-new");

  var svgEl = $this.find("svg")[0];
  var serializer = new XMLSerializer();
  var svgStr = serializer.serializeToString(svgEl);
  var path = fabric.loadSVGFromString(svgStr, function (objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);

    var size_varinats = $(
      "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new .loop"
    ).attr("size_varinats");
    var canvas_object_height = $(
      "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new"
    ).attr("obj_height");

    if (size_varinats == "6.0 x 6.0") {
      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 4, top: canvas.height / 3.3 });
        obj.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  obj.setCoords();
    } else if (
      size_varinats == "1.5 x 3.0" ||
      size_varinats == "2.0 x 3.0" ||
      size_varinats == "2.0 x 4.0" ||
      size_varinats == "4.0 x 6.0"
    ) {
      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 3.5, top: canvas.height / 2.8 });
        obj.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  obj.setCoords();
    } else if (size_varinats == "1.5 x 2.0") {
      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 3, top: canvas.height / 2.8 });
        obj.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  obj.setCoords();
    } else {
      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 3, top: canvas.height / 2.8 });
       obj.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  obj.setCoords();
    }

    canvas.add(obj);
    canvas.setActiveObject(obj);
    set1Objects.push(obj.toJSON()); // Save image data
    showtoolbardynamic();
  });
  $(".my_editor#design").fadeIn();
  $(".my_editor#text").fadeOut();
  $(".main-secrion .canvas-container").addClass("for-margin");
}

function addImageToCanvas(clickedImageUrl, imgcav_id = null) {
  fabric.Image.fromURL(clickedImageUrl, function (img) {
    var upload_back = $(".div_custom_front_back .back").hasClass("active");
    var width_can = canvas.width * 0.6;
    if (upload_back == true) {
        img.scaleToWidth(width_can);
      img.set({
        left: 70,
        top: 70,
        src: clickedImageUrl, // Custom property to store image URL
      });
       img.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  img.setCoords();
    } else {
        img.scaleToWidth(width_can);
      img.set({
        left: 70,
        top: 70,
        src: clickedImageUrl, // Custom property to store image URL
      });
       img.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    mtr: true
  });
  img.setCoords();
    }
    if (imgcav_id != null) {
      img.id = imgcav_id;
    }

    canvas.add(img);
    canvas.setActiveObject(img);
  });
}

// Function to match image URL with Fabric.js objects on the canvas and select the object
function matchAndSelectObject(clickedImageUrl) {
  var canvasObjects = canvas.getObjects();

  for (var i = 0; i < canvasObjects.length; i++) {
    if (canvasObjects[i].type === "image") {
      // Compare images based on source URL
      var imageUrl = canvasObjects[i].src;
      if (imageUrl === clickedImageUrl) {
        // Select the corresponding object
        canvas.setActiveObject(canvasObjects[i]);
        canvas.renderAll(); // Update the canvas
        return canvasObjects[i]; // Return the matched object
      }
    }
  }
  return null; // No matching object found
}

function saveCanvasState() {
  undoStack.push(canvas.toJSON());
  redoStack.length = 0; // Clear redo stack
}

function setTextAlignment(align) {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject instanceof fabric.Text) {
    selectedObject.set("textAlign", align);
    canvas.renderAll();
  }
}

// Function to set the selected text color
function setTextFillColor(color) {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === "i-text") {
    activeObject.set({ fill: color });
    canvas.renderAll();
  }
}

// Function to set the selected text color
function setTextFillColorText(color) {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set({ fill: color });
    canvas.renderAll();
  }
}
function updateqty_html(variant_id = null){
  if(variant_id == null){
      var custom_variant_size = $("div#shopify-section-tattoo_popup .loop-all.active-new .loop").attr("size_varinats");
     variant_id = $(".variants_data.matched span[size='" + custom_variant_size + "']").attr("id");
  }

  
  var qtyhtml = "";

  $('.loop-all-draft_first[data-id="' + variant_id + '"]').each(function (
    index
  ) {
    var acqty = $(this).attr("data-qty");
    if (index === 0) {
      $(".quantity_selected").attr("value", acqty);
      $(".selected_sizes_data .sel_qty_data .insert_data").text(acqty);
      $("li.file_qty span").text(acqty);
      $(".count_update").text(acqty);
    }
    qtyhtml += '<option value="' + acqty + '">' + acqty + "</option>";
  });
  $(".sel_qty").html(qtyhtml);
  $(".qty_selected_row.sel_qty").trigger("change");
  
}
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


function makevariablefor_atc() {
  $formdata = null;
  $formdata = new FormData();
  var formDataArray = $(".form_syn").serializeArray();

  $.each(formDataArray, function (i, field) {
    // EMPTY values skip karo
    if (field.value !== null && field.value !== "" && field.value !== undefined) {
      $formdata.append(field.name, field.value);
    }
  });

  var sizevariable = jQuery("#shopify-section-tattoo_popup .loop.active").attr("size_varinats");
  var dimensionsku = sizevariable ? sizevariable.split(" x ").join("-") : "";
  var prdsku =
    jQuery(".variants_data.matched").attr("data-sku") +
    "-" +
    dimensionsku +
    "-" +
    jQuery(".quantity_selected").val();
  $formdata.append("sku", prdsku);

  displayFormData(formDataArray);
  $(".form_syn")[0].reset();

  var dataURLs = $(".last-cart_page_inner .cmn.left img.base_img").attr("src");
  if (dataURLs && dataURLs.includes("base64")) {
    var blobBini = atob(dataURLs.split(",")[1]);
    var array_mains = [];
    for (var i = 0; i < blobBini.length; i++) {
      array_mains.push(blobBini.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array_mains)], { type: "image/png" });
    $formdata.append("properties[Front Tattoo]", file, "FrontTattoo.png");
  }

  var dataURL2 = $(".back_tatt img").attr("src");
  if (dataURL2 && dataURL2.includes("base64") && $("span.cstm-btn.active").attr("data-text") == "Yes") {
    var blobBini2 = atob(dataURL2.split(",")[1]);
    var array_mains2 = [];
    for (var i = 0; i < blobBini2.length; i++) {
      array_mains2.push(blobBini2.charCodeAt(i));
    }
    var backfileimage = new Blob([new Uint8Array(array_mains2)], { type: "image/png" });
    $formdata.append("properties[Tatoo image Back]", backfileimage, "TattooBack.png");
  }
}

// Function to new Tattoo the canvas
function clearCanvas() {
  canvas.clear();
  localStorage.removeItem("presentObjects");
}

function saveCanvas6x6() {
  const canvasData_json = JSON.stringify(canvas.toJSON());
  // Retrieve the existing canvas data from local storage
  const savedCanvasDataf = localStorage.getItem("canvasData");

  if (savedCanvasDataf) {
    allCanvasDataf = JSON.parse(savedCanvasDataf);
  }
  allCanvasDataf.push(canvasData_json);
  // Store the updated array back in local storage
  localStorage.setItem("canvasData", JSON.stringify(allCanvasDataf));
  canvasDataDiv.innerHTML = "";
}
function loadCanvas6x6() {
  const savedCanvasData = localStorage.getItem("canvasData");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDiv.appendChild(svgDiv);
        }
      });
    }
  }
}
function loadCanvasNext6x6() {
  canvas.setDimensions({ width: 720, height: 720 });
  const savedCanvasData = localStorage.getItem("canvasData");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        const image = new Image();
        var svgData = canvas.toSVG();
        if (svgData) {
          // Create a new div element to display the SVG
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);
          canvasDataDiv.appendChild(svgDiv);
        }
      });
    }
  }
}
function loadCanvasNextNext6x6() {
  canvas.setDimensions({ width: 720, height: 720 });
  const savedCanvasData = localStorage.getItem("canvasData");
  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        // You can access the objects on the canvas after loading
        const objectsOnCanvas = canvas.getObjects();
      });
    }
  }
}

function saveCanvas4x6() {
  const canvasData_json = JSON.stringify(canvas.toJSON());
  // Retrieve the existing canvas data from local storage
  const savedCanvasDataf = localStorage.getItem("canvasDataSmall");

  if (savedCanvasDataf) {
    allCanvasDatafSmall = JSON.parse(savedCanvasDataf);
  }

  allCanvasDatafSmall.push(canvasData_json);
  // Store the updated array back in local storage
  localStorage.setItem("canvasDataSmall", JSON.stringify(allCanvasDatafSmall));
  canvasDataDivSmall.innerHTML = "";
}
function loadCanvas4x6() {
  const savedCanvasData = localStorage.getItem("canvasDataSmall");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          // canvasDataDiv.innerHTML = '';
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivSmall.appendChild(svgDiv);
        } else {
          //console.log('Canvas is empty or there was an issue converting to SVG.');
        }
      });
    }
  }
}
function loadCanvasNext4x6() {
  canvas.setDimensions({ width: 500, height: 600 });
  const savedCanvasData = localStorage.getItem("canvasDataSmall");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();

        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          // canvasDataDiv.innerHTML = '';
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivSmall.appendChild(svgDiv);
        } else {
          //console.log('Canvas is empty or there was an issue converting to SVG.');
        }
      });
    }
    //canvasDataDiv.innerHTML = '';
  }
}
function loadCanvasNextNext4x6() {
  const savedCanvasData = localStorage.getItem("canvasDataSmall");
  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        // You can access the objects on the canvas after loading
        const objectsOnCanvas = canvas.getObjects();
        // console.log(objectsOnCanvas);
      });
    }
  }
}

function saveCanvasLands() {
  const canvasData_json = JSON.stringify(canvas.toJSON());
  console.log(canvasData_json);
  // Retrieve the existing canvas data from local storage
  const savedCanvasDatalandscape = localStorage.getItem("canvasDatalandscape");

  if (savedCanvasDatalandscape) {
    allCanvasDataflandscape = JSON.parse(savedCanvasDatalandscape);
  }

  allCanvasDataflandscape.push(canvasData_json);
  // Store the updated array back in local storage
  localStorage.setItem(
    "canvasDatalandscape",
    JSON.stringify(allCanvasDataflandscape)
  );
  canvasDataDivlandscape.innerHTML = "";
}
function loadCanvasLands() {
  const savedCanvasData = localStorage.getItem("canvasDatalandscape");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivlandscape.appendChild(svgDiv);
        }
      });
    }
  }
}
function loadCanvasNextLands() {
  canvas.setDimensions({ width: 400, height: 400 });
  const savedCanvasData = localStorage.getItem("canvasDatalandscape");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();

        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          // canvasDataDiv.innerHTML = '';
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivlandscape.appendChild(svgDiv);
        }
      });
    }
  }
}
function loadCanvasNextNextLands() {
  const savedCanvasData = localStorage.getItem("canvasDatalandscape");
  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        // You can access the objects on the canvas after loading
        const objectsOnCanvas = canvas.getObjects();
        // console.log(objectsOnCanvas);
      });
    }
  }
}

function saveCanvasPotraits() {
  const canvasData_json = JSON.stringify(canvas.toJSON());
  //console.log(canvasData_json);
  // Retrieve the existing canvas data from local storage
  const savedCanvasDatapotrait = localStorage.getItem("canvasDatapotrait");

  if (savedCanvasDatapotrait) {
    allCanvasDatafpotrait = JSON.parse(savedCanvasDatapotrait);
  }

  allCanvasDatafpotrait.push(canvasData_json);
  //console.log("allCanvasData"+allCanvasData);
  // Store the updated array back in local storage
  localStorage.setItem(
    "canvasDatapotrait",
    JSON.stringify(allCanvasDatafpotrait)
  );
  canvasDataDivpotrait.innerHTML = "";
}
function loadCanvasPotraits() {
  const savedCanvasData = localStorage.getItem("canvasDatapotrait");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          // canvasDataDiv.innerHTML = '';
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivpotrait.appendChild(svgDiv);
        }
      });
    }
  }
}
function loadCanvasNextPotraits() {
  canvas.setDimensions({ width: 300, height: 400 });
  const savedCanvasData = localStorage.getItem("canvasDatapotrait");

  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();

        const image = new Image();
        var svgData = canvas.toSVG();

        if (svgData) {
          // Create a new div element to display the SVG
          // canvasDataDiv.innerHTML = '';
          var svgDiv = document.createElement("div");
          svgDiv.classList.add("loop-svg");
          svgDiv.innerHTML = svgData;
          var spanElement = document.createElement("span");
          spanElement.textContent = "Add to cart";
          spanElement.classList.add("add-cart-save");
          // Append the SVG div to the canvasDataDiv
          svgDiv.appendChild(spanElement);

          canvasDataDivpotrait.appendChild(svgDiv);
        }
      });
    }
    //canvasDataDiv.innerHTML = '';
  }
}
function loadCanvasNextNextPotraits() {
  const savedCanvasData = localStorage.getItem("canvasDatapotrait");
  if (savedCanvasData) {
    const allCanvasData = JSON.parse(savedCanvasData);

    for (let i = 0; i < allCanvasData.length; i++) {
      const data = allCanvasData[i];

      canvas.loadFromJSON(data, () => {
        canvas.renderAll();
        // You can access the objects on the canvas after loading
        const objectsOnCanvas = canvas.getObjects();
        // console.log(objectsOnCanvas);
      });
    }
  }
}

function loadMoreImages(tabIndex) {
  // console.log("tabIndex",tabIndex);
  var $tab = $("#tab" + tabIndex); // Dynamically target the current tab by index
  var isLoading = $tab.data("isLoading") || false; // Check if it's already loading
  var page = $tab.data("page") || 1; // Get the current page number
  var imagesPerPage = parseInt(
    $tab.find(".design_content_dynamic").attr("limits_data"),
    10
  ); // Get the limit of images to load

  if (isLoading) return; // Prevent multiple load calls
  isLoading = true;
  $tab.data("isLoading", true); // Set loading status to true

  // Simulate an AJAX request (replace with real server request if needed)
  setTimeout(function () {
    for (var i = 1; i <= imagesPerPage; i++) {
      var dataget = $tab
        .find(".design_content.get_imgs .svg_item:first-child")
        .html();
      $tab.find(".design_content.get_imgs .svg_item:first-child").remove();

      if (dataget) {
        var $imageSet = $('<div class="svg_item imgs"></div>');
        $imageSet.append(dataget);
        $tab.find(".design_content_dynamic").append($imageSet); // Append to the dynamic container
      }
    }

    isLoading = false;
    $tab.data("isLoading", false); // Reset loading status
    page++;
    $tab.data("page", page); // Update page number
  }, 1000); // Simulating a delay for demonstration purposes
}

// Clear canvas function
function clearCanvas() {
  canvas.clear();
}

// Function to store the current set of objects
function storeCurrentSet() {
  set1Objects[currentSetIndex] = [];
  canvas.getObjects().forEach(function (obj) {
    set1Objects[currentSetIndex].push(obj.toJSON());
  });
}

// Function to restore stored data onto the canvas
function restoreStoredData() {
  clearCanvas();
  set1Objects[currentSetIndex].forEach(function (obj) {
    fabric.util.enlivenObjects([obj], function (enlivenedObjects) {
      enlivenedObjects.forEach(function (enlivenedObj) {
        enlivenedObj.setControlsVisibility({
          mt: false, 
          mb: false, 
          ml: false, 
          mr: false, 
          mtr: true  
        });
        enlivenedObj.setCoords();
        canvas.add(enlivenedObj);
      });
      canvas.renderAll(); 
    });
  });
}

function resizeCanvasv2() {
  if (jQuery(".div_custom_front_back .cmn.active").length != 0) {
    if (jQuery(".div_custom_front_back .cmn.active").hasClass("back")) {
      jQuery(".div_custom_front_back .front").trigger("click");
      jQuery(".div_custom_front_back .back").trigger("click");
    } else {
      jQuery(".div_custom_front_back .back").trigger("click");
      jQuery(".div_custom_front_back .front").trigger("click");
    }
  } else {
    jQuery(".div_custom_front_back .back").trigger("click");
    jQuery(".div_custom_front_back .front").trigger("click");
  }
}

function showtoolbardynamic() {
  var activeObject = canvas.getActiveObject();

  if (activeObject) {
    // console.log("activeObject.type",activeObject.type);
    if (activeObject.type == "i-text") {
      $(".my_editor.for_text").show();
      $(".my_editor.for_img").hide();
    } else if (activeObject.type == "path") {
      $(".my_editor.for_text").hide();
      $(".my_editor.for_img").show();
      $("span.edit_item.edit_bgremove").hide();
      $("span.edit_item.edit_color").show();
    } else if (activeObject.type == "group") {
      $(".my_editor.for_text").hide();
      $(".my_editor.for_img").show();
      $("span.edit_item.edit_bgremove").hide();
      $("span.edit_item.edit_color").show();
    } else if (activeObject.type == "image") {
      $(".my_editor.for_text").hide();
      $(".my_editor.for_img").show();
      $("span.edit_item.edit_bgremove").show();
      $("span.edit_item.edit_color").hide();
    }
  }
}

function refreshTattooPosition() {
  // Select all elements with the specified class
  $(".cstm_slides.cstm_slides_sticker").each(function () {
    // Get the data-top and data-left attributes
    var top = $(this).data("top");
    var left = $(this).data("left");

    // Set default values if attributes are not present
    if (typeof top === "undefined") {
      top = 50;
    }
    if (typeof left === "undefined") {
      left = 50;
    }

    // Set the CSS top and left properties
    $(this).css({
      top: top + "%",
      left: left + "%",
    });
  });
}
// Function to get a resized image
function getResizedImage(originalCanvas, newWidth, newHeight) {
  // Store original dimensions
  var originalWidth = originalCanvas.getWidth();
  var originalHeight = originalCanvas.getHeight();

  // Calculate scale factors
  var scaleX = newWidth / originalWidth;
  var scaleY = newHeight / originalHeight;

  // Temporarily scale canvas dimensions
  originalCanvas.setWidth(newWidth);
  originalCanvas.setHeight(newHeight);

  // Scale all objects
  originalCanvas.getObjects().forEach(function (object) {
    object.scaleX *= scaleX;
    object.scaleY *= scaleY;
    object.left *= scaleX;
    object.top *= scaleY;
    object.setCoords();
  });

  // Render the canvas
  originalCanvas.renderAll();

  // Get the data URL of the resized image
  var dataURL = originalCanvas.toDataURL("image/png");

  // Reset canvas dimensions and scale objects back to original size
  originalCanvas.setWidth(originalWidth);
  originalCanvas.setHeight(originalHeight);

  originalCanvas.getObjects().forEach(function (object) {
    object.scaleX /= scaleX;
    object.scaleY /= scaleY;
    object.left /= scaleX;
    object.top /= scaleY;
    object.setCoords();
  });

  // Render the canvas back to original state
  originalCanvas.renderAll();

  return dataURL;
}

function displayFormData(formDataArray) {
  var formDataListElement = $("#formDataList");
  var listItem = $("<li></li>").text(JSON.stringify(formDataArray));
  formDataListElement.append(listItem);
}
function addclass_aaccdingto_size_variants(size_varinats) {
  if (size_varinats == "6.0 x 6.0") {
    $(".canvas-container").addClass("lScape");
    $(".canvas-container").removeClass("lPotrait");
    $(".canvas-container").removeClass("SScape");
    $(".canvas-container").removeClass("SPotrait");

    $(".large_design").attr("data-canvas-size", size_varinats);
    $(".data-chk").removeClass("active_layout");
    $(".large_design").addClass("active_layout");
    $(".large_design").click();
  } else if (size_varinats == "4.0 x 6.0") {
    $(".canvas-container").addClass("lPotrait");
    $(".canvas-container").removeClass("lScape");
    $(".canvas-container").removeClass("SScape");
    $(".canvas-container").removeClass("SPotrait");

    $(".small_design").attr("data-canvas-size", size_varinats);
    $(".data-chk").removeClass("active_layout");
    $(".small_design").addClass("active_layout");
    $(".small_design").click();
  } else if (
    size_varinats == "1.5 x 2.0" ||
    size_varinats == "1.5 x 3.0" ||
    size_varinats == "2.0 x 3.0" ||
    size_varinats == "2.0 x 4.0"
  ) {
    $(".canvas-container").addClass("SPotrait");
    $(".canvas-container").removeClass("lScape");
    $(".canvas-container").removeClass("lPotrait");
    $(".canvas-container").removeClass("SScape");

    $(".canvas-container").addClass("canvas_width_tablet");
    $(".lands_design").attr("data-canvas-size", size_varinats);
    $(".data-chk").removeClass("active_layout");
    $(".lands_design").addClass("active_layout");
    $(".lands_design").click();
  } else if (
    size_varinats == "1.5 x 1.5" ||
    size_varinats == "2.0 x 2.0" ||
    size_varinats == "3.0 x 3.0" ||
    size_varinats == "4.0 x 4.0"
  ) {
    $(".canvas-container").addClass("SScape");
    $(".canvas-container").removeClass("lScape");
    $(".canvas-container").removeClass("SPotrait");
    $(".canvas-container").removeClass("lPotrait");

    $(".potrait_design").attr("data-canvas-size", size_varinats);
    $(".data-chk").removeClass("active_layout");
    $(".potrait_design").addClass("active_layout");
    $(".potrait_design").click();
  }
}

/**********************************************/
/**********************************************/
/********************Our Script****************/
/**********************************************/
/**********************************************/
var $formdata = null;
var $nopopup = false;
var $svgloaded = false;
var $vrsvg = `<svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.19276 0.19635L3.99983 3.00342L6.79236 0.210894C6.85404 0.145239 6.92835 0.0927167 7.01082 0.0564776C7.0933 0.0202384 7.18224 0.00102854 7.27232 0C7.46519 0 7.65017 0.0766176 7.78655 0.212998C7.92293 0.349378 7.99954 0.53435 7.99954 0.72722C8.00124 0.816379 7.9847 0.904944 7.95093 0.987479C7.91717 1.07001 7.86689 1.14478 7.80319 1.20719L4.97431 3.99971L7.80319 6.8286C7.92305 6.94586 7.99333 7.10464 7.99954 7.2722C7.99954 7.46508 7.92293 7.65005 7.78655 7.78643C7.65017 7.92281 7.46519 7.99943 7.27232 7.99943C7.17964 8.00327 7.08717 7.9878 7.00079 7.954C6.91441 7.9202 6.836 7.8688 6.77054 7.80308L3.99983 4.996L1.20003 7.7958C1.13859 7.85927 1.06518 7.90994 0.984049 7.94489C0.902919 7.97984 0.81567 7.99837 0.727339 7.99943C0.534468 7.99943 0.349497 7.92281 0.213116 7.78643C0.076736 7.65005 0.000118324 7.46508 0.000118324 7.2722C-0.00157719 7.18305 0.0149648 7.09448 0.0487293 7.01195C0.0824938 6.92941 0.132769 6.85465 0.196468 6.79224L3.02536 3.99971L0.196468 1.17082C0.076611 1.05357 0.00632851 0.894781 0.000118324 0.72722C0.000118324 0.53435 0.076736 0.349378 0.213116 0.212998C0.349497 0.0766176 0.534468 0 0.727339 0C0.901872 0.00218166 1.06913 0.072722 1.19276 0.19635Z' fill='black'/></svg>`;
let allCanvasDataflandscape = [];

//Canvas

const canvas = new fabric.Canvas("canvas", {
  selection: false, // Disable multiple selection
});

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "#E44459";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.borderColor = "#000";
canvas.clear();

var set1Objects = [[], []];

const convertImages = (query, callback) => {
  const images = document.querySelectorAll(query);

  images.forEach((image) => {
    fetch(image.getAttribute("data-src"))
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const svg = parser
          .parseFromString(data, "image/svg+xml")
          .querySelector("svg");

        if (image.id) svg.id = image.id;
        if (image.className) svg.classList = image.classList;

        image.parentNode.replaceChild(svg, image);
      })
      .then(callback)
      .catch((error) => console.error(error));
  });
};

//convertImages('.svg_item img');
$(document).ready(function () {
  var sel_qty_ready = $(".qty_selected_row.sel_qty option:selected").val();
  $("li.file_qty span").text(sel_qty_ready);
  var active_variant_handle = $(".loop-all.selection_active").attr(
    "custom_product"
  );
  var active_variant_handle_size = $(".loop-all.selection_active").attr("id");
  if (active_variant_handle_size != "qty-classic") {
    $("li.file_w_option").hide();
  } else {
    $("li.file_w_option").show();
  }

  /**********default show size***********/
  var qty_attr = $(
    ".tattoo_popup.popup_selection .loop-all.selection_active"
  ).attr("id");
  if (
    qty_attr == "qty-gliter" ||
    qty_attr == "qty-metalic" ||
    qty_attr == "qty-glow"
  ) {
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").addClass(
      "not-show"
    );
  } else {
    $("div#shopify-section-tattoo_popup .loop-all").show();
    $("div#shopify-section-tattoo_popup .loop-all").removeClass("not-show");
  }
  /**********default show size end***********/

  $(".variants_div .variants_data").removeClass("matched");
  if (active_variant_handle) {
    $(".variants_div .variants_data[custom_product='" + active_variant_handle + "']").addClass("matched");
  }
  $(".product-option.image_field").each(function () {
    var url = $(this).find("dd").text();
    $(this).find("dd").hide();
    $(this).append(
      "<img   height='' width='' loading='lazy' src='" + url + "'>"
    );
  });
});

var get_sym = $("form.form_syn").attr("sym");

$(".center_close_btn").click(function () {
  $(".drower_search span.btn_close").click();
});

if ($(window).width() < 749) {
  var fb = $(".canvas-container .div_custom_front_back");
  $(".tool_content").append(fb);
  var save_btn = $(".bottom_save_btns");
  $(".tool_content").append(save_btn);

  $("span.tatto_speci").click(function () {
    $(".mob_new_nav  .tatoo_nav.small-hide >ul").toggle();
    $(".tool_content").hide();
    $(".sub-menu-drop").removeClass("active");
  });
  $(".toolkit").click(function () {
    $(".mob_new_nav .tool_content").toggle();
    $(".tatoo_nav.small-hide >ul").hide();
    $(".sub-menu-drop").removeClass("active");
  });

  $(document).on(
    "click",
    ".main-secrion, .mob_new_nav .tatoo_nav.small-hide ul li",
    function () {
      $(".tatoo_nav.small-hide >ul, .tool_content").hide();
    }
  );
}

var sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  variableWidth: true,
  variableHeight: true,
  prevArrow:
    "<button type='button' class='slick-prev pull-left'><svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='16.5' cy='16.5' r='16.5' transform='matrix(-1 0 0 1 33 0)' fill='white'/><g clip-path='url(#clip0_212_116)'><path d='M7.39662 17.6682H22.8559L21.4717 19.0261V21.0517L25.6035 16.7845L21.4717 12.5172V14.5436L22.8559 15.9007H7.39662V17.6682Z' fill='black' /></g><defs><clipPath id='clip0_212_116'><rect width='18.2069' height='8.53448' fill='white' transform='matrix(-1 0 0 1 25.6035 12.5172)'/></clipPath></defs></svg></button>",
  nextArrow:
    "<button type='button' class='slick-next pull-right'><svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='16.5' cy='16.5' r='16.5' transform='matrix(-1 0 0 1 33 0)' fill='white'/><g clip-path='url(#clip0_212_116)'><path d='M7.39662 17.6682H22.8559L21.4717 19.0261V21.0517L25.6035 16.7845L21.4717 12.5172V14.5436L22.8559 15.9007H7.39662V17.6682Z' fill='black' /></g><defs><clipPath id='clip0_212_116'><rect width='18.2069' height='8.53448' fill='white' transform='matrix(-1 0 0 1 25.6035 12.5172)'/></clipPath></defs></svg></button>",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};



$(".tatoo_nav ul").hide();
$(".my_editor").hide();
$(".thumbs_for").hide();
$(".thumbs_for:first-child").hide();
$(".open_content").hide();
$(".tattoo_popup .inner_Content").slick(sliderSettings);
$(".edits_pop button:first-child").addClass("active");
$(".pop_iner span:first-child").addClass("active");
$("div#shopify-section-quntity-popup").hide();
$("div#shopify-section-tattoo_popup_option").hide();
$("div#shopify-section-tattoo_popup_notes").hide();
$(".loop-all[obj_height='450']").addClass("active");
$(".loop-all[obj_height='450']").addClass("active-new");
$(".drop_down").hide();

$(".slid_des li:first-child").addClass("active");
$(".slid_des_content .tab-content").hide();
$(".slid_des_content .tab-content:first").show();
var white_data = $(
  ".tattoo_popup.popup_option .inner_Content_row .loop-all.white_option_active .loop-data span"
).text();
$(".white_option_selected").attr("value", white_data);
var title_product = $("form.form_syn").attr("data_title");
$(".last-cart_page_inner .cmn.right .cmn_right_iner h2").text(title_product);
var qty_val = $(".sel_qty").val();
$(".count_update").text(qty_val);
$(".quantity_selected").val(qty_val);
$("li.file_qty span").text(qty_val);

/*********Quantitu Dropdown Change **************/
$(".qty_selected_row").change(function () {
  var qty_val = $(this).find("option:selected").val();
  $(".count_update").text(qty_val);
  $(".quantity_selected").val(qty_val);
  $("li.file_qty span").text(qty_val);
  var selected_qty = $(".quantity_selected").val();
  localStorage.setItem("PageLoadQuantity", selected_qty);

////////****************update price start******************
  var custom_varinat_size = $(
    "div#shopify-section-tattoo_popup .loop-all.active-new .loop"
  ).attr("size_varinats");
  var varinat_id = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("id");
  var varinat_price = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("price");
  var varinat_title = $(".variants_data.matched").attr("custom_product_title");
  $("form.form_syn").attr("data_price_product", varinat_price);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $("form.form_syn").attr("size_selected", custom_varinat_size);
  $("form.form_syn").attr("data_title", varinat_title);

  $("form.form_syn .custom_varinat_id").attr("value", varinat_id);

  var form_qty = $(".sel_qty option:selected").val();
  var varinat_price_money = varinat_price;
  $("form.form_syn .actual_price").val(varinat_price_money);
  $(".loop-all-draft_first").removeClass("mm");
  $(".loop-all-draft_first[data-id='" + varinat_id + "']").each(function () {
    $(this).addClass("mm");
    var data_qty = parseInt($(this).attr("data-qty"));

    if (form_qty == data_qty) {
      varinat_price_money = $(this).attr("data-price");
    }
  });
  var varinat_price_money_qty = varinat_price_money;

  $("form.form_syn .price_selected").val(varinat_price_money);
  $("form.form_syn").attr("data_price_product", varinat_price_money);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $(".header-right span.tatto_price").text(get_sym + varinat_price_money_qty);
  var form_qty_update = $(".quantity_selected").val();
  $(".sel_qty_data .insert_data").text(form_qty_update);
  $(".cmn_right_iner span.price").text(get_sym + varinat_price_money_qty);

  //////////update price end*******************

  var qty_data = $("select.sel_qty option:selected").val();
  $(".quantity_selected").attr("value", qty_data);
  $(".selected_sizes_data .sel_qty_data .insert_data").text(qty_data);
  makevariablefor_atc();
});



/*********************On Product Name Click***START******************/
$("div#shopify-section-tattoo_popup_selection .loop").click(function () {  
  $("div#shopify-section-tattoo_popup").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_selection").removeClass("hide_div");
  var qty_attr = $(this).closest(".loop-all").attr("id");
      var opval = $(this).closest(".loop-all").attr("opval");
  if(opval == 'ophide'){
    $('#shopify-section-tattoo_popup .inner_Content .loop-all .loop[size_varinats="1.5 x 1.5"]').closest('.loop-all').hide();
  }else{
    $('#shopify-section-tattoo_popup .inner_Content .loop-all .loop[size_varinats="1.5 x 1.5"]').closest('.loop-all').show(); 
  }

 const $targets = $('#shopify-section-tattoo_popup .inner_Content .loop-all')
  .find('.loop[size_varinats="1.5 x 2.0"], .loop[size_varinats="1.5 x 3.0"]')
  .closest('.loop-all');

if (['qty-metalic', 'qty-gliter', 'qty-glow'].includes(qty_attr)) {
  $targets.hide();
} else {
  $targets.show();
}


  if (qty_attr == "qty-semi-permanent") {
    $("span.edit_item.edit_color").hide();
  } else {
    $("span.edit_item.edit_color").show();
  }
 
  $(".qty_selected_row").hide();
  $('.qty_selected_row[id="' + qty_attr + '"]').show();
  $(".qty_selected_row").removeClass("sel_qty");
  $('.qty_selected_row[id="' + qty_attr + '"]').addClass("sel_qty");

  var custom_variant_size = $(
    "div#shopify-section-tattoo_popup .loop-all.active-new .loop"
  ).attr("size_varinats");
  var variant_id = $(
    ".variants_data.matched span[size='" + custom_variant_size + "']"
  ).attr("id");
   

  ///////var varinat_price=$(".variants_data.matched span[size='"+custom_variant_size+"']").attr('price');

  var selc_val = $('.qty_selected_row[id="' + qty_attr + '"]')
    .find("option:selected")
    .val();
  $("li.file_qty span").text(selc_val);
  $("input.quantity_selected").attr("value", selc_val);
  $("div#shopify-section-tattoo_popup_selection .loop").removeClass("active");
  $(this).addClass("active");

  $("div#shopify-section-tattoo_popup_selection .loop-all").removeClass(
    "selection_active"
  );
  $(this).closest(".loop-all").addClass("selection_active");
  var selectione_data = $(
    ".tattoo_popup.popup_selection .tattoo_popup_inner .selection_active .loop-data span"
  ).text();
  $(".tatoo_finsih_selected").attr("value", selectione_data);
  $(".selected_sizes_data .sel_tattoo_finish_data .insert_data").text(
    selectione_data
  );
  $(".maintitle_prd").text(selectione_data);
  $(".tatoo_nav li.file_tgy").text("Technology Selection: " + selectione_data);
  var active_size = $(
    "div#shopify-section-tattoo_popup_selection .loop-all.selection_active"
  ).attr("id");

  var class_selection = $(this)
    .closest(".loop-all")
    .hasClass("selection_active");

  if (class_selection == true) {
    var active_variant_handle = $(this)
      .closest(".loop-all")
      .attr("custom_product");
    $(".variants_div .variants_data").removeClass("matched");
    if (active_variant_handle) {
      $(".variants_div .variants_data[custom_product='" + active_variant_handle + "']").addClass("matched");
      localStorage.setItem("PageLoadTechnology", active_variant_handle);
    }
  }

  var active_size = $(
    "div#shopify-section-tattoo_popup_selection .loop-all.selection_active"
  ).attr("id");


  console.log('active_size', active_size);


  if (active_size != "qty-classic") {
    $("li.file_w_option").hide();
    $("span.selection_btn.option").hide();
    var input = $("input.white_option_selected");
    var currentName = input.attr("name");
    var newName = "_" + currentName;
    input.attr("name", newName);
  } else {
    $("li.file_w_option").show();
    $("span.selection_btn.option").show();
    var input = $("input.white_option_selected");
    var currentName = input.attr("name");
    var newName = currentName.replace("_", ""); // Remove underscore
    input.attr("name", newName);
  }
  localStorage.setItem("PageLoadId", active_size);
  makevariablefor_atc();
  if ($nopopup == false) {
    $("div#shopify-section-tattoo_popup_selection").fadeOut();
    $("div#shopify-section-tattoo_popup_back").hide();
  }
  if ($("div#shopify-section-tattoo_popup_selection").hasClass("pop_actice")) {
    
  } else {
    if ($nopopup == false) {
      $("div#shopify-section-tattoo_popup").fadeIn();
    }
  }
  updateqty_html();
});
/*********************On Product Name Click***END******************/

/*********************On Size Click***START******************/


$("div#shopify-section-tattoo_popup .loop-all .loop").click(function () {
 
  $("div#shopify-section-tattoo_popup_selection").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_back").removeClass("hide_div");

  var custom_varinat_size = $(this).attr("size_varinats");
  var varinat_id = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("id");
  var varinat_price = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("price");

  var varinat_title = $(".variants_data.matched").attr("custom_product_title");
  $("form.form_syn").attr("data_price_product", varinat_price);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $("form.form_syn").attr("size_selected", custom_varinat_size);
  $("form.form_syn").attr("data_title", varinat_title);

  $("form.form_syn .custom_varinat_id").attr("value", varinat_id);

  var form_qty = $(".sel_qty option:selected").val();
  var varinat_price_money = varinat_price;
  $("form.form_syn .actual_price").val(varinat_price_money);
  $(".loop-all-draft_first").removeClass("mm");
  $(".loop-all-draft_first[data-id='" + varinat_id + "']").each(function () {
    $(this).addClass("mm");
    var data_qty = parseInt($(this).attr("data-qty"));

    if (form_qty >= data_qty) {
      varinat_price_money = $(this).attr("data-price");
    }
  });
  //alert(varinat_price_money);
  var varinat_price_money_qty = varinat_price_money;

  $("form.form_syn .price_selected").val(varinat_price_money);
  $("form.form_syn").attr("data_price_product", varinat_price_money);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $(".header-right span.tatto_price").text(get_sym + varinat_price_money_qty);
  var form_qty_update = $(".quantity_selected").val();
  $(".sel_qty_data .insert_data").text(form_qty_update);
  $(".cmn_right_iner span.price").text(get_sym + varinat_price_money_qty);

  $("div#shopify-section-tattoo_popup .loop-all .loop").removeClass("active");
  $(this).addClass("active");
  var active_size = $(
    "div#shopify-section-tattoo_popup_selection .loop-all.selection_active"
  ).attr("id");

  $("div#shopify-section-tattoo_popup .loop-all").removeClass("active-new");
  $(this).closest(".loop-all").addClass("active-new");
  var size_data = $(".active-new .loop-data span").text();
  $(".size_selected").attr("value", size_data);
  $(".selected_sizes_data .sel_sizes_data .insert_data").text(size_data);
  var height_data = $(this).attr("height_data");
  var width_data = $(this).attr("width_data");
  const obj_height = $(this).attr("obj_height");  
  var newWidth = width_data; 
  var newHeight = height_data;
   
  
if(newWidth == newHeight){
var newWidth = 600; 
  var newHeight = 600;
  }else if(newHeight == '384'){
   var newWidth = 300; 
  var newHeight = 600;
  
}else if(newWidth == '384' && newHeight == '576' ){
var newWidth = 400; 
  var newHeight = 600;
  
}else if(newWidth == '144' && newHeight == '192'){
   var newWidth = 300; 
  var newHeight = 370;
}else if(newWidth == '192' && newHeight == '288'){
   var newWidth = 300; 
  var newHeight = 430;
}else if(newWidth <= newHeight){
   var newWidth = 300; 
  var newHeight = 500;
}else if(newWidth => newHeight){
  var newWidth = 600; 
  var newHeight = 400;
}

  resizeCanvas(newWidth, newHeight, obj_height);
  var class_exsist_text = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new"
  )
    .find(".loop-data span")
    .text();
  $("li.file_size.size span").text(class_exsist_text);

  $(".swatch-container").hide();
  $(".swatch-container").removeClass("tshow");
  $(".thumbnails_drower .thumbs_for").hide();
  $(".cstm_slidespar .slide_items").hide();

  var preview_class = "";

  if (class_exsist_text == "1.5 x 1.5 inches") {
    preview_class = "cmsize_1_5_1_5";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Arm Band
    $(".armband_thumbs").show();
    $(".armband_slider").show();
    $(".btn_prv_armband").show().addClass("tshow");
    //Face
    $(".face_slider").show();
    $(".face_thumbs").show();
    $(".btn_prv_face").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "1.5 in x 2 inches") {
    preview_class = "cmsize_1_5_2";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Arm Band
    $(".armband_thumbs").show();
    $(".armband_slider").show();
    $(".btn_prv_armband").show().addClass("tshow");
    //Face
    $(".face_slider").show();
    $(".face_thumbs").show();
    $(".btn_prv_face").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "1.5 in x 3 inches") {
    preview_class = "cmsize_1_5_3";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Arm Band
    $(".armband_thumbs").show();
    $(".armband_slider").show();
    $(".btn_prv_armband").show().addClass("tshow");
    //Face
    $(".face_slider").show();
    $(".face_thumbs").show();
    $(".btn_prv_face").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "2 x 2 inches") {
    preview_class = "cmsize_2_2";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Arm Band
    $(".armband_thumbs").show();
    $(".armband_slider").show();
    $(".btn_prv_armband").show().addClass("tshow");
    //Face
    $(".face_slider").show();
    $(".face_thumbs").show();
    $(".btn_prv_face").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "2 in x 3 inches") {
    preview_class = "cmsize_2_3";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Arm Band
    $(".armband_thumbs").show();
    $(".armband_slider").show();
    $(".btn_prv_armband").show().addClass("tshow");
    //Face
    $(".face_slider").show();
    $(".face_thumbs").show();
    $(".btn_prv_face").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "3 x 3 inches") {
    preview_class = "cmsize_3_3";
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
  } else if (class_exsist_text == "2 in x 4 inches") {
    preview_class = "cmsize_2_4";
    // Custom
    $(".cstm_slider").show();
    $(".custom_thumbs").show();
    $(".btn_prv_cstm_img").show().addClass("tshow");
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
    // Sleeves
    $(".sleeves_slider").show();
    $(".sleeves_thumbs").show();
    $(".btn_prv_sleeves").show().addClass("tshow");
    // Tiny
    $(".tiny_slider").show();
    $(".tiny_thumbs").show();
    $(".btn_prv_tiny").show().addClass("tshow");
  } else if (class_exsist_text == "4 x 4 inches") {
    preview_class = "cmsize_4_4";
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
  } else if (class_exsist_text == "4 in x 6 inches") {
    preview_class = "cmsize_4_6";
    // Back
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
  } else if (class_exsist_text == "6 x 6 inches") {
    // Back
    preview_class = "cmsize_6_6";
    $(".lower_slider").show();
    $(".lower_thumbs").show();
    $(".btn_prv_lower").show().addClass("tshow");
  }
  $(".cstm_slides_sticker").removeClass(function (index, className) {
    // This splits the class list into an array and filters out those starting with 'cmsize_'
    return (className.match(/\bcmsize_\S+/g) || []).join(" ");
  });
  $(".cstm_slides_sticker").addClass(preview_class);

  var back_has_active = $(".cmn.back").hasClass("active");
  if (back_has_active == true) {
    if (mySvgObject) {
      canvas.renderAll();
    }
  }
  var size_varinats = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new .loop"
  ).attr("size_varinats");
  localStorage.setItem("PageLoadSize", size_varinats);
  addclass_aaccdingto_size_variants(size_varinats);
  if ($(window).width() < 1720) {
    var canvasContainerWidth = $(".canvas-container").width();
    if ($(".canvas-container").hasClass("canvas_width_tablet")) {
      var newHeight = canvasContainerWidth + 100;
      $(".canvas-container").css("height", newHeight + "px");
    } else {
      $(".canvas-container").height(canvasContainerWidth);
    }
  }

  /**********default show size***********/
  var qty_attr = $(
    ".tattoo_popup.popup_selection .loop-all.selection_active"
  ).attr("id");
  if (
    qty_attr == "qty-gliter" ||
    qty_attr == "qty-metalic" ||
    qty_attr == "qty-glow"
  ) {
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:not(.not-show)").each(
      function (index) {
        var currentElement = $(this); // Get the current element in the loop
        if (index == 0) {
          var currentElementitem = currentElement.find(".loop");
        }
      }
    );
  } else {
    $("div#shopify-section-tattoo_popup .loop-all").show();
    $("div#shopify-section-tattoo_popup .loop-all").removeClass("not-show");
  }
  /**********default show size end***********/

  resizeCanvasv2();
  makevariablefor_atc();

  $("div#shopify-section-tattoo_popup").fadeOut(); // Hide Current popup
  if ($("#shopify-section-tattoo_popup").hasClass("pop_actice")) {
  } else {
    if ($nopopup == false) {
   //   $("div#shopify-section-tattoo_popup_back").fadeIn(); // Show Next popup

$(document).ready(function() {
    var select = $('.qty_box_custom select.qty_selected_row.sel_qty');
    var options = select.find('option').toArray(); // Convert to an array for sorting
    
    options.sort(function(a, b) {
        return parseInt($(a).val()) - parseInt($(b).val());
    });

    select.empty().append(options); // Append sorted options
    select.val($(options[0]).val()).trigger('change'); // Select the first option
});

      
      $("div#shopify-section-quntity-popup").fadeIn();
    }
  }
  updateqty_html();
});






/*********************On Size Click***END******************/


/*********************On Product Options Click***START******************/
$("div#shopify-section-tattoo_popup_option .loop").click(function () {
 
  $("div#shopify-section-tattoo_popup_option").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_back").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_selection").removeClass("hide_div");
  $("div#shopify-section-quntity-popup").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_option .loop").removeClass("active");
  $(this).addClass("active");
  $("div#shopify-section-tattoo_popup_option .loop-all").removeClass(
    "white_option_active"
  );
  $(this).closest(".loop-all").addClass("white_option_active");
  var white_data = $(
    ".tattoo_popup.popup_option .inner_Content_row .loop-all.white_option_active .loop-data span"
  ).text();

  $(".white_option_selected").attr("value", white_data);

  var white_data2 = $(this).next(".loop-data").find("span").text();
  $(".file_w_option span").text(white_data2);
  localStorage.setItem("PageLoadOption", white_data);
  $("div#shopify-section-tattoo_popup_option").fadeOut();
  if ($("div#shopify-section-tattoo_popup_option").hasClass("pop_actice")) {
  } else {
    if ($nopopup == false) {
    //  $("div#shopify-section-quntity-popup").fadeIn();
    }
  }
});
/*********************On Product Options Click***START******************/

/*********************On Back Options Click***START******************/
$("div#shopify-section-tattoo_popup_back .cstm-btn").click(function () {
  $("span.cstm-btn.active").removeClass("active");
  $(this).addClass("active");
  $("div#shopify-section-tattoo_popup_back").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup").removeClass("hide_div");
  $("div#shopify-section-tattoo_popup_selection").removeClass("hide_div");
  var cstm_btn = $(this).attr("data-text");
  if (cstm_btn == "No") {
    $(".div_custom_front_back .cmn").removeClass("active");
    $(".canvasmainbody .div_custom_front_back .cmn.back").hide();
    $(".div_custom_front_back .front.cmn").addClass("active");
    var imageData = canvas.toDataURL("image/png");

    // Store the image data in localStorage
    localStorage.setItem("canvasImageData", imageData);

    var storedImageData = localStorage.getItem("canvasImageData");
    $(".front_tatt").remove();
    $("body").append(
      "<div class='front_tatt' style='display:none;'><img src=" +
        storedImageData +
        "   height='' width='' loading='lazy'></div>"
    );

    storeCurrentSet();

    // Toggle between sets
    currentSetIndex = 1 - currentSetIndex;

    // Restore the current set of objects
    restoreStoredData();
    //  $('.canvasmainbody .div_custom_front_back .cmn.back').hide();
    // var storedImageData = localStorage.getItem('canvasImageData');
    // $(".div_custom_front_back .front").trigger("click");
  } else {
    $(".canvasmainbody .div_custom_front_back .cmn.back").show();
  }
  var active_size = $(
    "div#shopify-section-tattoo_popup_selection .loop-all.selection_active"
  ).attr("id");

  $("div#shopify-section-tattoo_popup_back").fadeOut();
  if ($("div#shopify-section-tattoo_popup_back").hasClass("pop_actice")) {
  } else {
    if ($nopopup == false) {
      if (active_size == "qty-classic") {
        $("div#shopify-section-tattoo_popup_option").fadeIn();
      } else {
          $("div#shopify-section-tattoo_popup_back").removeClass("hide_div");
      //  $("div#shopify-section-quntity-popup").fadeIn();
      }
    }
  }
});
/*********************On Back Options Click***END******************/

/*********************On Quantity Popup Click Next***START******************/
$("span.qty_nxt").click(function () {
 // $(this).closest(".tattoo_popup_inner").find(".close").click();

  var custom_varinat_size = $(
    "div#shopify-section-tattoo_popup .loop-all.active-new .loop"
  ).attr("size_varinats");
  var varinat_id = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("id");
  var varinat_price = $(
    ".variants_data.matched span[size='" + custom_varinat_size + "']"
  ).attr("price");
  var varinat_title = $(".variants_data.matched").attr("custom_product_title");
  $("form.form_syn").attr("data_price_product", varinat_price);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $("form.form_syn").attr("size_selected", custom_varinat_size);
  $("form.form_syn").attr("data_title", varinat_title);

  $("form.form_syn .custom_varinat_id").attr("value", varinat_id);

  var form_qty = $(".sel_qty option:selected").val();

  var varinat_price_money = varinat_price;
  $("form.form_syn .actual_price").val(varinat_price_money);
  $(".loop-all-draft_first").removeClass("mm");
  $(".loop-all-draft_first[data-id='" + varinat_id + "']").each(function () {
    $(this).addClass("mm");
    var data_qty = parseInt($(this).attr("data-qty"));

    if (form_qty == data_qty) {
      varinat_price_money = $(this).attr("data-price");
    }
  });

 
  //alert(varinat_price_money);
  var varinat_price_money_qty = varinat_price_money;

  $("form.form_syn .price_selected").val(varinat_price_money);
  $("form.form_syn").attr("data_price_product", varinat_price_money);
  $("form.form_syn").attr(
    "data_price_product_with_symbol",
    varinat_price_money
  );
  $(".header-right span.tatto_price").text(get_sym + varinat_price_money_qty);
  var form_qty_update = $(".quantity_selected").val();
  $(".sel_qty_data .insert_data").text(form_qty_update);
  $(".cmn_right_iner span.price").text(get_sym + varinat_price_money_qty);

  //$('.inner_Content .loop-all.active-new .loop').click();

  var qty_val = $(".sel_qty").val();
  $(".count_update").text(qty_val);
  makevariablefor_atc();
  
  if ($nopopup == false) {
 if(Number(form_qty) < 100){
$('.tatoo_nav li.file_w_option').hide();
}else{
  $('.tatoo_nav li.file_w_option').show();
}
     if (form_qty == '1' || form_qty == '2' || form_qty == '5' || form_qty == '10' || form_qty == '25' || form_qty == '50') {
    
       $('.white_option_selected').remove();
         $(".div_custom_front_back .cmn").removeClass("active");
    $(".canvasmainbody .div_custom_front_back .cmn.back").hide();
    $(".div_custom_front_back .front.cmn").addClass("active");
    var imageData = canvas.toDataURL("image/png");

    // Store the image data in localStorage
    localStorage.setItem("canvasImageData", imageData);

    var storedImageData = localStorage.getItem("canvasImageData");
    $(".front_tatt").remove();
    $("body").append(
      "<div class='front_tatt' style='display:none;'><img src=" +
        storedImageData +
        "   height='' width='' loading='lazy'></div>"
    );

    storeCurrentSet();

    // Toggle between sets
    currentSetIndex = 1 - currentSetIndex;

    // Restore the current set of objects
    restoreStoredData();
    //  $('.canvasmainbody .div_custom_front_back .cmn.back').hide();
    // var storedImageData = localStorage.getItem('canvasImageData');
    // $(".div_custom_front_back .front").trigger("click");
 $(this).closest(".tattoo_popup_inner").find(".close").click();
} else {
  
 if ($('.form_syn .white_option_selected').length === 0) {
  $('.form_syn').append('<input type="hidden" name="properties[White Option:]" class="white_option_selected">');
}
        $("div#shopify-section-quntity-popup").fadeOut();
        $("div#shopify-section-tattoo_popup_back")
          .removeClass("hide_div")
          .fadeIn();
}
   // $("div#shopify-section-tattoo_popup_selection").fadeOut();
  }
});
/*********************On Quantity Popup Click Next***END******************/

$(".close, .remove").click(function () {
  $("div#shopify-section-tattoo_popup_selection").fadeOut();
  $("div#shopify-section-tattoo_popup").fadeOut();
  $("div#shopify-section-quntity-popup").fadeOut();
  $("div#shopify-section-tattoo_popup_option").fadeOut();
  $("div#shopify-section-tattoo_popup_notes").fadeOut();
  $("div#shopify-section-tattoo_popup_back").fadeOut();
  $(".tattoo_popup.popup_preview").fadeOut();
  $(".cart-popup").fadeOut();
});

$(".cartnote_field").on("keyup", function () {
  var nots = $(this).val();
  $(".nots_selected").attr("value", nots);
  makevariablefor_atc();
});

$("li.file_size").click(function () {
  if ($nopopup == false) {
    $("div#shopify-section-tattoo_popup").fadeIn();
  }
  $(".tattoo_popup .inner_Content")[0].slick.refresh();
  $("div#shopify-section-tattoo_popup").addClass("pop_actice");

  var qty_attr = $(
    ".tattoo_popup.popup_selection .loop-all.selection_active"
  ).attr("id");
  if (
    qty_attr == "qty-gliter" ||
    qty_attr == "qty-metalic" ||
    qty_attr == "qty-glow"
  ) {
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").hide();
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").addClass(
      "not-show"
    );
    $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").addClass(
      "not-show"
    );
  } else {
    $("div#shopify-section-tattoo_popup .loop-all").show();
    $("div#shopify-section-tattoo_popup .loop-all").removeClass("not-show");
  }
});

$("li.file_qty").click(function () {
  if ($nopopup == false) {
    $("div#shopify-section-quntity-popup").fadeIn();
  }
  $("div#shopify-section-quntity-popup").addClass("pop_actice");
});

$("li.file_tgy").click(function () {
  if ($nopopup == false) {
    $("div#shopify-section-tattoo_popup_selection").fadeIn();
  }
  $("div#shopify-section-tattoo_popup_selection").addClass("pop_actice");
});

$("li.file_w_option").click(function () {
  if ($nopopup == false) {
    $("div#shopify-section-tattoo_popup_option").fadeIn();
  }
  $("div#shopify-section-tattoo_popup_option").addClass("pop_actice");
});

$("li.file__note").click(function () {
  if ($nopopup == false) {
    $("div#shopify-section-tattoo_popup_notes").fadeIn();
  }
  $("div#shopify-section-tattoo_popup_notes").addClass("pop_actice");
});

$(".side-loop").click(function () {
  $(".tab-content").hide();
 $("#filter-search").val("");
   $("#tabs-nav li").show();
  //$(".canvas-container").removeClass('for-margin');
  $(".drower_search").removeClass("remove_search");
  $("span.edit_item.edit_bgremove").hide();

  
  var id = $(this).attr("id");
  $(".card").closest(".body_iner_left").addClass("active");
  $(".card").closest(".left_dwroor").addClass("active");
  $(".body_iner_right").addClass("active");
  $(".side-loop").removeClass("active");
  $(this).addClass("active");
  $(".slid_des li:first-child").addClass("active");
  $(".open_content").hide();
  $(".open_content").removeClass('active');
  $(".open_content[id='" + id + "']").fadeIn();
  $(".open_content[id='" + id + "']").addClass('active');
  if ($(".side-loop").hasClass("active")) {
    $(".tatoo_nav ul").fadeIn();
    $(".my_editor").hide();
  }
  $(".main-secrion .canvas-container").removeClass("height_adjust");
  $(".static_contenet_back").remove();
  $(".main-secrion .canvas-container").removeClass("for-margin");

  if ($(".cmn.back").hasClass("active")) {
  } else {
    var this_id = $(this).attr("id");
    //$('.front.cmn').attr('id', '');
  }

  if ($(window).width() < 749) {
    $(".tatoo_nav.small-hide >ul").hide();
  }
  showtoolbardynamic();

  if (!$svgloaded) {
    $svgloaded = true;
    convertImages(".svg_item span");
  }
});

$("div#shopify-section-login_for_save_tattoo span.close").click(function () {
  $("div#shopify-section-login_for_save_tattoo").fadeOut();
  $("div#shopify-section-login_for_save_tattoo").addClass("removepop");
});

$(".sidebar div#upload").click(function () {
  $(".drower_search").addClass("remove_search");
  // $("span.edit_item.edit_bgremove").show();
  // $('.front.cmn').trigger('click');
  //$(".loop-all").removeClass('active-new');
  updateHeight();
});


$("div#text").click(function () {
  $(".drower_search").removeClass("remove_search");
  $("span.edit_item.edit_bgremove").hide();
});

$("div#template").click(function () {
  $(".drower_search").removeClass("remove_search");
  $("span.edit_item.edit_bgremove").hide();
});

$(".btn_close").click(function () {
  // $(".card").removeClass("active");
  $(".card").closest(".body_iner_left").removeClass("active");
  $(".card").closest(".left_dwroor").removeClass("active");
  $(".body_iner_right").removeClass("active");
  $(".side-loop").removeClass("active");
  $(".tatoo_nav ul").fadeOut();
  $(".my_editor").fadeOut();
 $("#filter-search").val("");
   $("#tabs-nav li").show();
 $(".tab-content").hide();
  
  $(".main-secrion .canvas-container").removeClass("for-margin");
});

$(".slid_des li").click(function () {
  $('.open_content').removeClass("active");
  $(".slid_des_content").removeClass("for-scroll");
  $(".slid_des li").removeClass("active");
  $(this).addClass("active");
  $(".slid_des_content .tab-content").hide();
  var activeTab = $(this).find("a").attr("href");
  $(activeTab).fadeIn();
  $("#live-search input[type='text']").val($(this).text());
  $(".slid_des li").hide();
  $(this).parents('.tabs').find('.slid_des_content span.content-back-arrow').show();
  return false;
});

$(document).on(
  "click",
  ".edit_bold, .edit_italic, .edit_underline, .edit_color, .edit_font-family",
  function () {
    $(".edits_pop.dropdown").hide();
  }
);

$(document).on("click", ".edit_drow button, .edit_erase button", function () {
  $(this).siblings(".edits_pop").toggle();
  $(this).removeClass("active");
  $(".edit_item").toggleClass("active");
  $(".drop_down").hide();
  $("span.edit_item.edit_front_back").removeClass("arrows");
});
$(document).on("click", ".edit_item", function () {
  if ($(this).hasClass("edit_front_back")) {
    $(".drop_down").toggle();
    $("span.edit_item.edit_front_back").addClass("arrows");
  } else {
    $(".drop_down").hide();
  }
});

$(document).on(
  "click",
  ".tatoo_nav li:not(:first-child), .tatto_body",
  function () {
    $(".sub-menu-drop").removeClass("active");
  }
);

$(
  ".edit_drow button, .edit_erase button, .edit_font button, .edit_bold button, .edit_italic button, .edit_underline button, .edit_align > button, .edit_spacing button"
).click(function () {
  $(this).toggleClass("active");
});

$(document).on("click", ".edits_pop button", function () {
  $(".edits_pop button").removeClass("active");
  $(this).addClass("active");
});

$(".edit_item_pop button").click(function () {
  $(".edits_pop").not($(this).siblings(".edits_pop")).hide(); // Hide all .edits_pop except the sibling of the clicked button
  $(this).siblings(".edits_pop").toggle(); // Toggle the specific .edits_pop sibling
});

$(".pop_iner span").click(function () {
  $(".pop_iner span").removeClass("active");
  $(this).addClass("active");
});
$(".control-Done, .cont-cancel").click(function () {
  $(this).parents(".edit_item").find("button").trigger("click");
});
$(document).on("click", "canvas.upper-canvas", function () {
  $(".edits_pop.dropdown").hide();
});

$(document).on(
  "click",
  ".uploades_imgs_data .updateImg, .uploades_imgs_data_back .updateImg",
  function () {
    $(".uploades_imgs_data .updateImg").removeClass("active");
    $(".uploades_imgs_data_back .updateImg").removeClass("active");
    $(this).addClass("active");
    $(".my_editor#design").fadeIn();
    $(".my_editor#text").hide();
  }
);

$(document).on(
  "click",
  ".uploades_imgs_data .updateImg span, .uploades_imgs_data_back .updateImg span",
  function () {
    $(this).parent().remove();
  }
);

$(
  ".cstm_slider, .armband_slider, .face_slider, .sleeves_slider, .tiny_slider, .lower_slider"
).slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  infinite: false,
  asNavFor:
    ".custom_thumbs, .armband_thumbs, .face_thumbs, .sleeves_thumbs, .tiny_thumbs, .lower_thumbs",
  prevArrow:
    "<button type='button' class='slick-prev pull-left'><svg width='78' height='78' viewBox='0 0 78 78' fill='none' xmlns='http://www.w3.org/2000/svg'><g filter='url(#filter0_d_567_1328)'><path d='M41.8417 30.4728L33.3154 38.9991L41.8417 30.4728ZM33.3154 38.9991L41.8417 47.5254L33.3154 38.9991Z' fill='#E44459'/><circle cx='27' cy='27' r='27' transform='matrix(1 0 0 -1 12 66)' fill='#E44459'/></g><path d='M42.7982 46.7506L35.6253 38.9992L42.7982 31.2478C42.9266 31.1093 42.9985 30.9234 42.9985 30.7298C42.9985 30.5362 42.9266 30.3503 42.7982 30.2118C42.7358 30.1447 42.6614 30.0915 42.5792 30.0551C42.4971 30.0187 42.4089 30 42.3197 30C42.2306 30 42.1424 30.0187 42.0602 30.0551C41.9781 30.0915 41.9036 30.1447 41.8412 30.2118L34.209 38.4579C34.075 38.6028 34 38.797 34 38.9992C34 39.2014 34.075 39.3957 34.209 39.5405L41.8398 47.7866C41.9022 47.8541 41.9768 47.9078 42.0593 47.9445C42.1417 47.9811 42.2303 48 42.3197 48C42.4092 48 42.4978 47.9811 42.5802 47.9445C42.6626 47.9078 42.7373 47.8541 42.7997 47.7866C42.9281 47.6481 43 47.4622 43 47.2686C43 47.075 42.9266 46.8891 42.7982 46.7506Z' fill='#31303B' stroke='#fff' stroke-width='2'/><defs><filter id='filter0_d_567_1328' x='0' y='0' width='78' height='78' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'><feFlood flood-opacity='0' result='BackgroundImageFix'/><feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/><feOffset/><feGaussianBlur stdDeviation='6'/><feComposite in2='hardAlpha' operator='out'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/><feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_567_1328'/><feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_567_1328' result='shape'/></filter></defs></svg></button>",
  nextArrow:
    "<button type='button' class='slick-next pull-right'><svg width='78' height='78' viewBox='0 0 78 78' fill='none' xmlns='http://www.w3.org/2000/svg'><g filter='url(#filter0_d_567_1626)'><path d='M36.1583 47.5272L44.6846 39.0009L36.1583 47.5272ZM44.6846 39.0009L36.1583 30.4746L44.6846 39.0009Z' fill='#E44459'/><circle cx='27' cy='27' r='27' transform='matrix(-1 0 0 1 66 12)' fill='#E44459'/></g><path d='M35.2018 31.2494L42.3747 39.0008L35.2018 46.7522C35.0734 46.8907 35.0015 47.0766 35.0015 47.2702C35.0015 47.4638 35.0734 47.6497 35.2018 47.7882C35.2642 47.8553 35.3386 47.9085 35.4208 47.9449C35.5029 47.9813 35.5911 48 35.6803 48C35.7694 48 35.8576 47.9813 35.9398 47.9449C36.0219 47.9085 36.0964 47.8553 36.1588 47.7882L43.791 39.5421C43.925 39.3972 44 39.203 44 39.0008C44 38.7986 43.925 38.6043 43.791 38.4595L36.1602 30.2134C36.0978 30.1459 36.0232 30.0922 35.9407 30.0555C35.8583 30.0189 35.7697 30 35.6803 30C35.5908 30 35.5022 30.0189 35.4198 30.0555C35.3374 30.0922 35.2627 30.1459 35.2003 30.2134C35.0719 30.3519 35 30.5378 35 30.7314C35 30.925 35.0734 31.1109 35.2018 31.2494Z' fill='#31303B' stroke='#fff' stroke-width='2'/><defs><filter id='filter0_d_567_1626' x='0' y='0' width='78' height='78' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'><feFlood flood-opacity='0' result='BackgroundImageFix'/><feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/><feOffset/><feGaussianBlur stdDeviation='6'/><feComposite in2='hardAlpha' operator='out'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/><feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_567_1626'/><feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_567_1626' result='shape'/></filter></defs></svg></button>",
});

$(
  ".custom_thumbs, .armband_thumbs, .face_thumbs, .sleeves_thumbs, .tiny_thumbs, .lower_thumbs"
).slick({
  slidesToShow: 3,
  infinite: false,
  slidesToScroll: 1,
  asNavFor:
    ".cstm_slider, .armband_slider, .face_slider, .sleeves_slider, .tiny_slider, .lower_slider",
  focusOnSelect: true,
  arrows: false,
});

$(document).on("click", ".sel_sizes_data .insert_data", function (event) {
  event.preventDefault();
  if ($nopopup == false) {
    $("#shopify-section-tattoo_popup").fadeIn();
  }
  $(".inner_Content")[0].slick.refresh();
  $("#shopify-section-tattoo_popup").addClass("pop_actice");

var vlhd = $('.sel_tattoo_finish_data .insert_data').text();
  if(vlhd === 'Glitter' || vlhd === 'Metallic' || vlhd === 'Glow-in-the-Dark'){
     $('#shopify-section-tattoo_popup .inner_Content .loop-all .loop[size_varinats="1.5 x 1.5"]').closest('.loop-all').hide();
  }else{
    $('#shopify-section-tattoo_popup .inner_Content .loop-all .loop[size_varinats="1.5 x 1.5"]').closest('.loop-all').show(); 
  }
  
});

$(document).on("click", ".sel_qty_data .insert_data", function (event) {
  event.preventDefault();
  if ($nopopup == false) {
    $("#shopify-section-quntity-popup").fadeIn();
  }
  $("#shopify-section-quntity-popup").addClass("pop_actice");
});

$(document).on(
  "click",
  ".sel_tattoo_finish_data .insert_data",
  function (event) {
    event.preventDefault();
    if ($nopopup == false) {
      $("#shopify-section-tattoo_popup_selection").fadeIn();
    }
    $("#shopify-section-tattoo_popup_selection").addClass("pop_actice");
  }
);

$(".swatch-container").click(function () {
  var tab_id = $(this).attr("id");
  $(".cstm_slides .slide_items").hide();
  $(".cstm_slides .slide_items[id='" + tab_id + "']").fadeIn();
  $(".swatch-container").removeClass("active");
  $(this).addClass("active");
  $(".thumbs_for").hide();
  $(".thumbs_for[id='" + tab_id + "']").fadeIn();
  $(".cstm_slides .slide_items[id='" + tab_id + "']")[0].slick.refresh();
  $(".thumbs_for[id='" + tab_id + "']")[0].slick.refresh();
});

$(".tatoo_nav li").click(function () {
  var id = $(this).attr("id");
  $(".sub-menu-drop[id='" + id + "']").toggleClass("active");
  $(".main-secrion .canvas-container").removeClass("height_adjust");
  $(".static_contenet_back").remove();
});

$(".add_to_cart, .slider_add_to_cart").click(function () {
  $(".tattoo_popup.popup_preview").fadeOut();
  $(".tearms_txt").addClass("active");
  // var base64Image = canvas.toDataURL("image/png");
  var $activesize = $(
    "div#shopify-section-tattoo_popup .loop-all .loop.active"
  );
  var height_data = $activesize.attr("height_data");
  var width_data = $activesize.attr("width_data");
  var converted_width = $activesize.attr("converted_width");
  var converted_height = $activesize.attr("converted_height");
  var base64Image = getResizedImage(canvas, converted_width, converted_height);
  if ($(".inenr_tearm input").is(":checked")) {
    $(".tearms_txt").removeClass("active");
    setTimeout(function () {
      var class_back_active = $(".front.cmn").hasClass("active");

      if (class_back_active) {
        $(".last-cart_page_inner .cmn.left .base_img").remove();
        $(".last-cart_page_inner .cmn.left").append(
          "<img   loading='lazy' class='base_img' height='" +
            height_data +
            "' width='" +
            width_data +
            "' src='" +
            base64Image +
            "'>"
        );

        // Check if the canvas has objects
        if (canvas.getObjects().length > 0) {
          $(".cart-popup-empty").fadeOut();
          $(".last-cart_page").fadeIn();
          makevariablefor_atc();
        } else {
          $(".cart-popup-empty").fadeIn();
          $(".last-cart_page").fadeOut();
        }
      } else {
        alert("Front selection required for cart addition.");
      }
    }, 300);
  }
});

$(document).on("click", ".sign-login", function () {
  var clss_exsit = $(this).hasClass("login-success");
  if (clss_exsit) {
    $(".login-form-tattoo").fadeOut();
    $(".login-form-tattoo").removeClass("active");
    alert("Already Login");
  } else {
    var size_varinats = $(
      "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new .loop"
    ).attr("size_varinats");

    if (size_varinats == "6.0 x 6.0") {
      saveCanvas6x6();
      loadCanvas6x6();
    } else if (size_varinats == "4.0 x 6.0") {
      saveCanvas4x6();
      loadCanvas4x6();
    } else if (
      size_varinats == "1.5 x 2.0" ||
      size_varinats == "1.5 x 3.0" ||
      size_varinats == "2.0 x 3.0" ||
      size_varinats == "2.0 x 4.0"
    ) {
      saveCanvasLands();
      loadCanvasLands();
    } else if (
      size_varinats == "1.5 x 1.5" ||
      size_varinats == "2.0 x 2.0" ||
      size_varinats == "3.0 x 3.0" ||
      size_varinats == "4.0 x 4.0"
    ) {
      saveCanvasPotraits();
      loadCanvasPotraits();
    }
  }

  // saveCanvasStateLoad();
});

$(".cart-popup-empty .last-cart_page_flx span.close").click(function () {
  $(".cart-popup-empty").fadeOut();
});
$(".close_shopping_cart").click(function () {
  $(".cart-popup").fadeOut();
});
$(".close_login_form").click(function () {
  $(".login-form-tattoo").fadeOut();
  $(".login-form-tattoo").removeClass("active");
});

$(document).on("click", "div#instructions", function () {
  $(".left_dwroor, .body_iner_left, .body_iner_right").removeClass("active");
  $("#shopify-section-instruction-popup").fadeIn();
  $(".main-secrion .canvas-container").removeClass("for-margin");
});
$(document).on("click", ".instructions_popup_inner span.close", function () {  
  $("#shopify-section-instruction-popup").fadeOut();
  $("div#instructions").removeClass("active");
});

function closeProductionTimePopup() {
  $("#production-time-modal").fadeOut();
}

function getProductionTimePageUrl() {
  var config = window.productionTimeModalConfig || {};
  var $content = $("#production-time-modal-content");
  var pageUrl = config.pageUrl || $content.data("pageUrl") || "/pages/production-time";
  if (typeof Shopify !== "undefined" && Shopify.routes && Shopify.routes.root) {
    var root = Shopify.routes.root;
    if (root !== "/" && pageUrl.indexOf(root) !== 0) {
      pageUrl = root.replace(/\/$/, "") + pageUrl;
    }
  }
  return pageUrl;
}

function extractProductionTimeSectionFromPage(html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  var selectors = [
    ".shopify-section.section-main-page",
    ".shopify-section.shopify-section--main-page",
    "section.shopify-section[id*='__main']",
  ];

  for (var i = 0; i < selectors.length; i++) {
    var section = doc.querySelector(selectors[i]);
    if (section) {
      return section.outerHTML;
    }
  }

  return "";
}

function wrapProductionTimeTables($container) {
  $container.find(".rte table").each(function () {
    var $table = $(this);
    if (!$table.closest(".responsive-table").length) {
      $table.wrap('<div class="responsive-table"></div>');
    }
  });
}

function setProductionTimeModalTitle($container) {
  var $heading = $container.find(".b-main-title, .h1, h1").first();
  if ($heading.length) {
    var titleId = "production-time-modal-title";
    if (!$heading.attr("id")) {
      $heading.attr("id", titleId);
    }
    $("#production-time-modal").attr("aria-labelledby", $heading.attr("id"));
  }
}

function fetchProductionTimeSectionHtml() {
  var pageUrl = getProductionTimePageUrl();
  var sectionKey = (window.productionTimeModalConfig && window.productionTimeModalConfig.sectionKey) || "main";
  var cacheBuster = window.Shopify && Shopify.designMode ? "&_=" + Date.now() : "";

  return fetch(pageUrl + "?sections=" + sectionKey + cacheBuster)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("sections request failed");
      }
      return response.json();
    })
    .then(function (data) {
      if (data && data[sectionKey]) {
        return data[sectionKey];
      }
      throw new Error("section html missing");
    })
    .catch(function () {
      return fetch(pageUrl + "?section_id=" + sectionKey + cacheBuster).then(function (response) {
        if (!response.ok) {
          throw new Error("section_id request failed");
        }
        return response.text();
      });
    })
    .catch(function () {
      return fetch(pageUrl + cacheBuster).then(function (response) {
        if (!response.ok) {
          throw new Error("page request failed");
        }
        return response.text();
      }).then(extractProductionTimeSectionFromPage);
    });
}

function openProductionTimePopup() {
  if (!$("#production-time-modal").parent().is("body")) {
    $("#production-time-modal").appendTo("body");
  }

  var $modal = $("#production-time-modal");
  var $content = $("#production-time-modal-content");

  $modal.fadeIn();
  $content.html('<p class="production-time-modal__loading" aria-live="polite">Loading production times…</p>');
  $("#production-time-modal .production-time-modal__close").trigger("focus");

  fetchProductionTimeSectionHtml()
    .then(function (html) {
      if (!html || !html.trim()) {
        throw new Error("empty section html");
      }
      $content.html(html);
      wrapProductionTimeTables($content);
      setProductionTimeModalTitle($content);
    })
    .catch(function () {
      $content.html(
        '<p class="production-time-modal__loading">Unable to load production times. Please try again.</p>'
      );
    });
}

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.closest("#open-production-time-popup")) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openProductionTimePopup();
  },
  true
);

$(document).on("click", "#production-time-modal .production-time-modal__dialog", function (event) {
  event.stopPropagation();
});

$(document).on("click", "#production-time-modal .production-time-modal__close", function (event) {
  event.preventDefault();
  event.stopPropagation();
  closeProductionTimePopup();
});

$(document).on("click", "#production-time-modal", function (event) {
  if ($(event.target).is("#production-time-modal")) {
    closeProductionTimePopup();
  }
});

$(document).on("keydown", function (event) {
  if (event.key === "Escape" && $("#production-time-modal").is(":visible")) {
    closeProductionTimePopup();
  }
});

$(".without_login").click(function () {
  $(".instructions_popup_inner .close").click();
});
$(".with_login").click(function () {
  $(".instructions_popup_inner .close").click();
  $("li.sign-login").click();
});

$(document).on("click", ".imgs_div .imgs", function () {
  
  var class_exsist = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all"
  ).hasClass("active-new");

  var svgEl = $(this).find("svg")[0];
  if (!svgEl || svgEl.innerHTML.trim() === "") {
    convertImages(".svg_item span");
    setTimeout(() => {
      refreshClickSvg($(this));
    }, 1000);
  } else {
    refreshClickSvg($(this));
  }
});

// Text Click Start
//var fontFamilySelect = document.getElementById("font-family-select");
var isEditingText = false;

$(document).on("click", ".fonts_load span", function () {
  var class_exsist = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all"
  ).hasClass("active-new");
  $(".main-secrion .canvas-container").addClass("for-margin");
  $(".my_editor#design").hide();
  $(".my_editor#text").fadeIn();
  var selectedFont = $(this).attr("value");

  var activeObject = canvas.getActiveObject();

  if (activeObject && activeObject.type === "i-text") {
    activeObject.set("fontFamily", selectedFont);
    canvas.requestRenderAll();
  } else {
    if (class_exsist == true) {
      var canvas_object_height = $(
        "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new"
      ).attr("obj_height");
      var text = new fabric.IText(selectedFont, {
        left: 30,
        top: 100,
        fontFamily: selectedFont,
        fontSize: 18,
        fill: "black",
        erasable: false,
      });
    } else {
      var text = new fabric.IText(selectedFont, {
        left: 300,
        top: 340,
        fontFamily: selectedFont,
        fontSize: 24,
        fill: "black",
        erasable: false,
      });
    }

    text.setControlsVisibility({
      mt: false, 
      mb: false, 
      ml: false, 
      mr: false, 
      mtr: true, 
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    set1Objects.push(text.toJSON()); // Save image data
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("imageInput");
document.getElementById('imageInput').addEventListener('change', function () {
  $('.up_loder').show();

  const file = this.files[0];
  if (!file) {
    $('.up_loder').hide();
    return;
  }

  // Directly upload image without DPI check
  uploadToFabric(file);

  $('.up_loder').hide();
});

  $('.tattoo_popup_dpi .dpi_mg .btn_outr span').click(function(){
    $(".tattoo_popup_dpi").fadeOut();
    $("#shopify-section-instruction-popup").fadeIn();
  });

  $('.tattoo_popup_dpi .close_out').click(function(){
    $(".tattoo_popup_dpi").fadeOut();
  });


  /* ---------------- FABRIC IMAGE UPLOAD ---------------- */
  function uploadToFabric(file) {

    $(".main-secrion .canvas-container").addClass("for-margin");

    const reader = new FileReader();

    reader.onload = function (event) {

      const imageUrl = event.target.result;
      const imageUrl2 = event.target.result;
      const containerWidth = 180;
      const containerHeight = 180;

      fabric.Image.fromURL(imageUrl, function (fabricImg) {

        const aspectRatio = fabricImg.width / fabricImg.height;

        if (aspectRatio > containerWidth / containerHeight) {
          fabricImg.scaleToWidth(containerWidth);
        } else {
          fabricImg.scaleToHeight(containerHeight);
        }

        if ($(".loop-all.selection_active").attr("id") === "qty-semi-permanent") {
          fabricImg.filters.push(new fabric.Image.filters.Grayscale());
          fabricImg.applyFilters();
        }

          fabricImg.applyFilters();

       var imageDataURL = fabricImg.toDataURL("png");
       var btn_back = $(".cmn.back").hasClass("active");
       var uniqueaddress = new Date().getTime(); // Unique timestamp
       var image__uniqaddress = "UploadedImg_" + uniqueaddress;

       if (btn_back == true) {
         $(".uploades_imgs_data_back").append(
           "<div class='updateImg '  data-id='" +
             image__uniqaddress +
             "'><span class='close'>" +
             $vrsvg +
             "</span><img class='clickable_img' src='" +
             imageDataURL +
             "'></div>"
         );
       } else {
         $(".uploades_imgs_data").append(
           "<div class='updateImg'   data-id='" +
             image__uniqaddress +
             "'><span class='close'>" +
             $vrsvg +
             "</span><img data_img='"+imageUrl2+"' class='clickable_img' src='" +
             imageDataURL +
             "'></div>"
         );
       }

        fabricImg.set({
          left: canvas.width / 3,
          top: canvas.height / 3.3,
          hasBorders: false,
          id: image__uniqaddress
        });

        fabricImg.setControlsVisibility({
          mt: true,
          mb: true,
          ml: true,
          mr: true,
          mtr: true
        });

        canvas.add(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.requestRenderAll();

        set1Objects.push(fabricImg.toJSON());
        showtoolbardynamic();
        resetInput();
      });
    };

    reader.readAsDataURL(file);
  }

  function resetInput() {
    input.value = "";
  }

});





$(document).on("click", ".btn_bg_click", function () {
  const activeObject = canvas.getActiveObject();
  $("span.edit_item.edit_bgremove").show();

  // Get the bounding box of the active object
  const boundingBox = activeObject.getBoundingRect();

  // Create a temporary canvas
  const tempCanvas = new fabric.Canvas();

  // Set the dimensions of the temporary canvas
  tempCanvas.setDimensions({
    width: boundingBox.width,
    height: boundingBox.height,
  });

  // Clone the active object to avoid modifying the original object
  const clonedObject = fabric.util.object.clone(activeObject);

  // Adjust the position of the cloned object based on the bounding box
  clonedObject.set({
    left: activeObject.left - boundingBox.left,
    top: activeObject.top - boundingBox.top,
  });

  // Add the cloned object to the temporary canvas
  tempCanvas.add(clonedObject);

  // Get the image data URL from the temporary canvas
  const imageDataURL = tempCanvas.toDataURL({
    format: "png",
    multiplier: 4, // optional multiplier for higher resolution
    quality: 1, // optional quality setting (0 to 1)
  });

  // Convert data URL to binary data
  const binaryData = atob(imageDataURL.split(",")[1]);

  // Convert binary data to ArrayBuffer
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: "image/png" });

  // Now you can use the blob as needed
  //console.log("binary" + imageDataURL);

  if (activeObject) {
    const activeObjectId = activeObject.id;
    //console.log(activeObjectId);
    if (
      typeof activeObjectId === "string" &&
      activeObjectId.trim().length > 0 &&
      activeObjectId.includes("UploadedImg_")
    ) {
      //const file = activeObject;
      var formData = new FormData();
      formData.append("file", blob, "canvas_image.png");

      $(".app-data").remove();
      $.ajax({
        url: "/apps/tattoo/upload.php",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (res) {
          $("body").append(
            "<div class='app-data' style='display:none;'>" + res + "</div>"
          );

          var bg_img = $(".base_url_final").attr("src");
          if (bg_img) {
            setTimeout(function () {
              $(".bg_done_img img").attr("src", bg_img);
            }, 200);
          }

          const containerWidth = 180; // Set your desired container width
          const containerHeight = 180; // Set your desired container height

          // Add the image to the canvas with object-fit: contain simulation
          fabric.Image.fromURL(bg_img, function (fabricImg) {
            const imgWidth = fabricImg.width;
            const imgHeight = fabricImg.height;
            const aspectRatio = imgWidth / imgHeight;

            if (aspectRatio > containerWidth / containerHeight) {
              fabricImg.scaleToWidth(containerWidth);
            } else {
              fabricImg.scaleToHeight(containerHeight);
            }

            var gray_var = $(".loop-all.selection_active").attr("id");
            if (gray_var == "qty-semi-permanent") {
              fabricImg.filters.push(new fabric.Image.filters.Grayscale());
            }

            fabricImg.applyFilters();
            var imageDataURL = fabricImg.toDataURL("png");
            if (imageDataURL.startsWith("data:image/png;base64,")) {
              var btn_back = $(".cmn.back").hasClass("active");
              if (btn_back == true) {
                $(
                  ".uploades_imgs_data_back [data-id='" + activeObjectId + "']"
                ).html(
                  "<span class='close'>" +
                    $vrsvg +
                    "</span><img class='clickable_img' src='" +
                    imageDataURL +
                    "'>"
                );
              } else {
                $(
                  ".uploades_imgs_data [data-id='" + activeObjectId + "']"
                ).html(
                  "<span class='close'>" +
                    $vrsvg +
                    "</span><img class='clickable_img' src='" +
                    imageDataURL +
                    "'>"
                );
              }
            }
            var class_exsist = $(
              "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all"
            ).hasClass("active-new");

            if (class_exsist == true) {
              var canvas_object_height = $(
                "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new"
              ).attr("obj_height");
              fabricImg
                .scaleToHeight(canvas.height - canvas_object_height)
                .set({
                  left: canvas.width / 3,
                  top: canvas.height / 3.3,
                  src: imageDataURL,
                })
                .setCoords();
            }
            canvas.add(fabricImg);
            canvas.setActiveObject(fabricImg);
            canvas.requestRenderAll();
            set1Objects.push(fabricImg.toJSON()); // Save image data
          });
          var has_credits = $(".error_credits").hasClass("error_credit_done");

          if (has_credits == true) {
            alert("Api Credits Finished");
          } else {
            var objects = canvas.getObjects();
            var obj = objects.find((obj) => obj.id === activeObjectId);

            if (obj) {
              // Remove the object from the canvas
              canvas.remove(obj);
              canvas.renderAll();
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  }
});
$(document).on("click", ".removebg", function () {
  var base64String = $(".bg_img_final").attr("src");
  fabric.Image.fromURL(base64String, function (img) {
    // Set image properties if needed
    img.set({
      left: 10,
      top: 10,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    // Add the image to the canvas
    canvas.add(img);

    // Render the canvas
    canvas.renderAll();
  });
});
$(document).on("click", ".updateImg img", function () {
  var clickedImageUrl = $(this).attr("data_img");
  var updateImg = $(this).closest(".updateImg");
  // Check if an object with the same URL exists on the canvas
  const existingObject = matchAndSelectObject(clickedImageUrl);

  if (existingObject) {
    // If a match is found, select the object
    canvas.setActiveObject(existingObject);
  } else {
    // If no match is found, add the image to the canvas
    addImageToCanvas(clickedImageUrl, updateImg.attr("data-id"));
  }

  canvas.requestRenderAll();
});

$(
  ".uploades_imgs_data .updateImg .close, .uploades_imgs_data_back .updateImg .close"
).click(function () {
  var close_div = $(this).closest(".updateImg").remove();
});

// File Upload End

// Button click event to delete selected image

document.getElementById("deleteButton").addEventListener("click", () => {
  const selectedObjects = canvas.getActiveObjects();

  // Iterate through selected objects and remove them from the canvas
  selectedObjects.forEach((object) => {
    canvas.remove(object);
  });
  $(".upload_input_wrap input").val("");
  // Clear the selection
  canvas.discardActiveObject();
  canvas.renderAll();
});

// Button click event to delete selected text

document.getElementById("deleteButtontext").addEventListener("click", () => {
  const selectedObjects = canvas.getActiveObjects();

  // Iterate through selected objects and remove them from the canvas
  selectedObjects.forEach((object) => {
    canvas.remove(object);
  });

  // Clear the selection
  canvas.discardActiveObject();
  canvas.renderAll();
});

// Button click event to duplicate selected image
document.getElementById("duplicateButton").addEventListener("click", () => {
  const selectedObject = canvas.getActiveObject().toObject();

  if (selectedObject) {
    fabric.util.enlivenObjects([selectedObject], function (objects) {
      objects.forEach(function (o) {
        o.set("top", o.top + 20);
        o.set("left", o.left + 20);
        if (canvas.getActiveObject().type == "image") {
          var uniqueaddress = new Date().getTime(); // Unique timestamp
          var image__uniqaddress = "UploadedImg_" + uniqueaddress;
          o.id = image__uniqaddress;
        }
        canvas.add(o);
      });
      canvas.renderAll();
    });
  }
});

// Button click event to flip the selected SVG object horizontally
document
  .getElementById("flipHorizontalButton")
  .addEventListener("click", () => {
    const selectedObject = canvas.getActiveObject();

    if (selectedObject) {
      selectedObject.flipX = !selectedObject.flipX;
      canvas.renderAll();
    }
  });

// Button click event to flip the selected SVG object vertically
document.getElementById("flipVerticalButton").addEventListener("click", () => {
  const selectedObject = canvas.getActiveObject();

  if (selectedObject) {
    selectedObject.flipY = !selectedObject.flipY;
    canvas.renderAll();
  }
});

// Function to save the current canvas state
const undoStack = [];
const redoStack = [];

// Button click event to undo the last action
document.getElementById("undoButton").addEventListener("click", () => {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop()); // Move current state to redo stack
    const prevState = undoStack[undoStack.length - 1];
    canvas.loadFromJSON(prevState, () => {
      canvas.renderAll();
    });
  }
});

// Button click event to redo the last undone action
document.getElementById("redoButton").addEventListener("click", () => {
  if (redoStack.length > 0) {
    const nextState = redoStack.pop();
    undoStack.push(nextState); // Move next state to undo stack
    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
    });
  }
});
// Listen for object selection and save canvas state when an object is selected
canvas.on("selection:created", saveCanvasState);
canvas.on("selection:updated", saveCanvasState);
canvas.on("selection:cleared", saveCanvasState);

let isDrawingMode = false;
let lineThickness = 1; // Default line thickness

// Button click event to toggle drawing mode
document.getElementById("drawButton").addEventListener("click", () => {
  isDrawingMode = !isDrawingMode;

  if (isDrawingMode) {
    // Enable drawing mode
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = $("input#color-input").val();
  } else {
    // Disable drawing mode
    canvas.isDrawingMode = false;
    canvas.freeDrawingBrush = null;
  }
  $(".edit_item button").removeClass("active");
});

// Listen for changes in line thickness select box
$(document).on("click", "#lineThicknessSelect span", function () {
  var thikval = $(this).attr("value");
  lineThickness = parseInt(thikval);
  canvas.freeDrawingBrush.width = lineThickness;
});

let isErasingMode = false;
let eraserSize = 1; // Default eraser size

// Button click event to toggle erasing mode
document.getElementById("eraseButton").addEventListener("click", () => {
  isErasingMode = !isErasingMode;

  if (isErasingMode) {
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.isDrawingMode = true;
  } else {
    // Disable erasing mode
    canvas.isDrawingMode = false;
    canvas.freeDrawingBrush = null;
  }
  $(".edit_item button").removeClass("active");
});

$(document).on("click", "#eraserSizeSelect span", function () {
  var thikval = $(this).attr("value");
  eraserSize = parseInt(thikval);

  // Update brush line width for erasing
  canvas.freeDrawingBrush.width = eraserSize;
});

// Update font size as user adjusts the range input
document.getElementById("fontSizeRange").addEventListener("input", () => {
  const fontSizeOutput = document.getElementById("fontSizeOutput");
  const selectedObject = canvas.getActiveObject();
  if (selectedObject instanceof fabric.Text) {
    const fontSize = parseInt(event.target.value);
    fontSizeOutput.textContent = fontSize;
    selectedObject.set("fontSize", fontSize);
    canvas.renderAll();
  }
});

// Toggle active class for style buttons

// Toggle font weight (bold) on button click
document.getElementById("boldButton").addEventListener("click", () => {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject instanceof fabric.Text) {
    const currentFontWeight = selectedObject.get("fontWeight");
    selectedObject.set(
      "fontWeight",
      currentFontWeight === "bold" ? "normal" : "bold"
    );
    canvas.renderAll();
  }
});

// Toggle italic style on button click
document.getElementById("italicButton").addEventListener("click", () => {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject instanceof fabric.Text) {
    const currentFontStyle = selectedObject.get("fontStyle");
    selectedObject.set(
      "fontStyle",
      currentFontStyle === "italic" ? "normal" : "italic"
    );
    canvas.renderAll();
  }
});

// Toggle underline style on button click
document.getElementById("underlineButton").addEventListener("click", () => {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject instanceof fabric.Text) {
    const currentUnderline = selectedObject.get("underline");
    selectedObject.set("underline", !currentUnderline);
    canvas.renderAll();
  }
});

// Toggle text alignment on button click
document.getElementById("alignLeftButton").addEventListener("click", () => {
  setTextAlignment("left");
});

document.getElementById("alignCenterButton").addEventListener("click", () => {
  setTextAlignment("center");
});

document.getElementById("alignRightButton").addEventListener("click", () => {
  setTextAlignment("right");
});

// Update letter spacing for the selected text object
document.getElementById("letterSpacingRange").addEventListener("input", () => {
  const letterSpacingOutput = document.getElementById("letterSpacingOutput");
  const selectedObject = canvas.getActiveObject();

  if (selectedObject instanceof fabric.Text) {
    const letterSpacingValue = parseFloat(event.target.value);
    letterSpacingOutput.textContent = letterSpacingValue.toFixed(1);
    selectedObject.set("charSpacing", letterSpacingValue);
    canvas.renderAll();
  }
});

// Update line height for the selected text object
document.getElementById("lineHeightRange").addEventListener("input", () => {
  const lineHeightOutput = document.getElementById("lineHeightOutput");
  const selectedObject = canvas.getActiveObject();

  if (selectedObject instanceof fabric.Text) {
    const lineHeightValue = parseFloat(event.target.value);
    lineHeightOutput.textContent = lineHeightValue.toFixed(1);
    selectedObject.set("lineHeight", lineHeightValue);
    canvas.renderAll();
  }
});

const colorInput = document.getElementById("color-input");
const selectedColor = document.getElementById("color-value");

// Update the selected object's fill color when the input changes
colorInput.addEventListener("input", function () {
  const selectedHexColor = colorInput.value;
  setTextFillColor(selectedHexColor);
  if (canvas.getActiveObject() && canvas.getActiveObject().type === "path") {
    canvas.getActiveObject().set({ fill: selectedHexColor });
    canvas.renderAll();
    selectedColor.textContent = selectedHexColor;
  } else if (
    canvas.getActiveObject() &&
    canvas.getActiveObject().type === "group"
  ) {
    canvas
      .getActiveObject()
      .getObjects()
      .forEach(function (obj) {
        obj.set({ fill: selectedHexColor });
      });
    canvas.renderAll();
    selectedColor.textContent = selectedHexColor;
  }
});

const colorInputText = document.getElementById("color-input-text");
const selectedColorText = document.getElementById("color-value-text");

// Update the selected text object's fill color when the input changes
colorInputText.addEventListener("input", function () {
  const selectedHexColor = colorInputText.value;
  setTextFillColorText(selectedHexColor);
  if (canvas.getActiveObject()) {
    canvas.getActiveObject().set({ fill: selectedHexColor });
    canvas.renderAll();
    selectedColorText.textContent = selectedHexColor;
  }
});

$(document).on("change", ".edit_font-family select", function () {
  var fonts_val = $(this).find("option:selected").attr("value");
  if (isTextAdded == true) {
  } else {
    addText(fonts_val);
  }

  selectedText.set({ fontFamily: fonts_val });
  canvas.renderAll();
});

const bringToFrontBtn = document.getElementById("bringToFront");
const sendToBackBtn = document.getElementById("sendToBack");
const bringForwardBtn = document.getElementById("bringForward");
const sendBackwardBtn = document.getElementById("sendBackward");
// Event listeners for the buttons
bringToFrontBtn.addEventListener("click", function () {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject) {
    canvas.bringToFront(selectedObject);
  }
});

sendToBackBtn.addEventListener("click", function () {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject) {
    canvas.sendToBack(selectedObject);
  }
});

bringForwardBtn.addEventListener("click", function () {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject) {
    canvas.bringForward(selectedObject);
  }
});

sendBackwardBtn.addEventListener("click", function () {
  const selectedObject = canvas.getActiveObject();
  if (selectedObject) {
    canvas.sendBackwards(selectedObject);
  }
});

$(document).on("change", ".edit_font-family select", function () {
  var fonts_val = $(this).find("option:selected").attr("value");
  if (isTextAdded == true) {
  } else {
    addText(fonts_val);
  }

  selectedText.set({ fontFamily: fonts_val });
  canvas.renderAll();
});

// Button click event to convert base64 to PNG
$(document).on(
  "click",
  ".mob_new_nav .preview,.header_tattoo  .preview",
  function () {
    setTimeout(function () {
      var class_back_active = $(".front.cmn").hasClass("active");

      if (class_back_active == true) {
        refreshTattooPosition();
        $(
          ".cstm_slider, .armband_slider, .face_slider, .sleeves_slider, .tiny_thumbs, .lower_thumbs"
        )[0].slick.refresh();
        $(
          ".custom_thumbs, .armband_thumbs, .face_thumbs, .sleeves_thumbs, .tiny_thumbs, .lower_thumbs"
        )[0].slick.refresh();

        $(".popup_preview").fadeIn();
        $(".swatch-container.tshow")[0].click();
        var $activesize = $(
          "div#shopify-section-tattoo_popup .loop-all .loop.active"
        );

        var tatto_height = $activesize.attr("data-tatto_height");
        var tatto_width = $activesize.attr("data-tatto_width");
        
        $(".cstm_slides.cstm_slides_sticker").css({
          "height": tatto_height + "%",
          "width": tatto_width + "%"
        });


        
        var height_data = $activesize.attr("height_data");
        var width_data = $activesize.attr("width_data");
        var converted_width = $activesize.attr("converted_width");
        var converted_height = $activesize.attr("converted_height");
        var base64Image = getResizedImage(
          canvas,
          converted_width,
          converted_height
        );
        $(".last-cart_page_inner .cmn.left .base_img").remove();
        $(".cstm_slides_sticker .canvas_img_slider").remove();
        $(".cstm_slides_sticker").append(
          "<img class='canvas_img_slider'   height='' width='' loading='lazy' src='" +
            base64Image +
            "'>"
        );
        $(".last-cart_page_inner .cmn.left").append(
          "<img class='base_img'  loading='lazy' height='" +
            height_data +
            "' width='" +
            width_data +
            "' src='" +
            base64Image +
            "'>"
        );
      } else {
        alert("Only view front design");
      }
    }, 200);
  }
);

$(".last-cart_page span.close").click(function () {
  $(".last-cart_page").fadeOut();
});

$("span.close_preview").click(function () {
  $(".tattoo_popup.popup_preview").fadeOut();
});

$(".tattoo_popup_inner, .login-form-tattoo_container").click(function (e) {
  if (
    $(e.target).closest(
      "#open-production-time-popup, #production-time-modal, .production-time-modal__dialog"
    ).length
  ) {
    return;
  }
  e.stopPropagation();
});

$(".tattoo_popup:not(.cstm_qty_pop)").click(function (e) {
  if (
    $(e.target).closest(
      "#open-production-time-popup, #production-time-modal, .production-time-modal__dialog"
    ).length
  ) {
    return;
  }
  $(this).parent("div").fadeOut();
});

$(".login-form-tattoo").click(function () {
  $(this).fadeOut();
  $(this).removeClass("active");
});

$(".hamburger").on("click", function () {
  $("div#shopify-section-custom-hamburger").toggleClass("active");
  $(".hamburger").toggleClass("open-menu");
  $(".tattoo-custom-drawer").toggleClass("open-drawer");
  $(".wrapper").toggleClass("open-wrapper");
});

$(document).on("click", "span.add_product_to_cart", function () {
  $(this).addClass("active");

   makevariablefor_atc();
  console.log('formdata', $formdata);
  
  $.ajax({
    url: "/apps/tattoo/api_fnnew_metafield.php",
    type: "POST",
    data: $formdata,
    processData: false,
    contentType: false,
    dataType: "json",
  }).done(function (respond) {
   console.log('product_create Done');
    if (respond.variant_id) {
      var cartItem = {};

      // Add quantity and variant_id
      cartItem.quantity = 1;
      cartItem.id = respond.variant_id;

      // Check if properties array is not empty
      if (respond.properties && respond.properties.length > 0) {
        // Add properties

        var properties = {};
        properties["Quantity"] = respond.quantity;
        respond.properties.forEach((item) => {
          properties[item.name] = item.value;
        });

        cartItem.properties = properties;
      }
      // Create a new form and set it to display none
      var $form = $("<form>", {
        style: "display:none;",
        method: "POST",
        action: "/cart/add",
      });

      // Add hidden input for quantity
      $form.append(
        $("<input>", {
          type: "hidden",
          name: "quantity",
          value: cartItem.quantity,
        })
      );

      // Add hidden input for variant ID
      $form.append(
        $("<input>", {
          type: "hidden",
          name: "id",
          value: cartItem.id,
        })
      );

      // If properties exist, add hidden inputs for each property
   if (cartItem.properties) {
  for (var key in cartItem.properties) {
    if (cartItem.properties.hasOwnProperty(key)) {

      var value = cartItem.properties[key];

      
      if (value === null || value === "" || value === undefined) {
        continue;
      }

      $form.append(
        $("<input>", {
          type: "hidden",
          name: "properties[" + key + "]",
          value: value,
        })
      );
    }
  }
}

      // Append the form to the body
      $("body").append($form);

      setTimeout(function () {
       $form.submit(); 
 

      }, 500);
    } else {
      $("span.add_product_to_cart").removeClass("active");
      alert("Error adding product to cart.");
    }
  });
});

$(document).on("click", ".checkout_redirect", function () {
  window.location.href = "/cart";
});

// Event listener for the "Clear Canvas" button
document.getElementById("clearButton").addEventListener("click", clearCanvas);

// Search Functionality
$("#filter-search").keyup(function () {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(),
    count = 0;
  var filter_l = $(this).val().length;
  if (filter_l == 0) {
    $(".slid_des_content").removeClass("for-scroll");
  }
  if ($(this).val() == "") {
    $("div#tabs-content .tab-content").hide();
    setTimeout(function () {
      //$("#tabs-nav li:first-child").click();
      $("div#font-family div").show();
    }, 100);

    $("#no-count").text("");
    $("#tabs-nav li").show();
    
  } else {
      $("#tabs-nav li").hide();

    // Loop through the comment list
    $("div#tabs-content .tab-content, div#font-family div").each(function () {
      // If the list item does not contain the text phrase fade it out

      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();

        // Show the list item if the phrase matches and increase the count by 1
      } else {
        $(this).show();
        $(".slid_des_content").addClass("for-scroll");

        count++;
      }
    });

    // Update the count
    var numberItems = count;
    $("#filter-count").text("Number of Comments = " + count);
    if (count < 1) {
      $("#no-count").text("No result");
    } else {
      $("#no-count").text("");
    }
  }
});

canvas.on("mouse:up", function (options) {
  if ($(window).width() < 749) {
    $(".tatoo_nav.small-hide >ul, .tool_content").hide();
  }
  if (options.target) {
    if (options.target.type === "i-text") {
      $("span.edit_item.edit_color").show();
      $("span.edit_item.edit_bgremove").hide();
      if ($(".canvas-container").hasClass("for-margin")) {
      } else {
        $(".main-secrion .canvas-container").addClass("for-margin");
      }

      // Handle the click event for a text object
      $(".my_editor.for_text").show();

      $(".my_editor.for_img").hide();
      // Open the text section or perform a text-related action
    } else if (options.target.type === "path") {
      $("span.edit_item.edit_color").show();
      $("span.edit_item.edit_bgremove").hide();
      if ($(".canvas-container").hasClass("for-margin")) {
      } else {
        $(".main-secrion .canvas-container").addClass("for-margin");
      }

      // Handle the click event for an SVG object
      $(".my_editor.for_img").show();
      $(".my_editor.for_text").hide();
      // Open the SVG section or perform an SVG-related action
    } else if (options.target.type === "image") {
      $("span.edit_item.edit_bgremove").show();
      $("span.edit_item.edit_color").hide();
      if ($(".canvas-container").hasClass("for-margin")) {
      } else {
        $(".main-secrion .canvas-container").addClass("for-margin");
      }

      // Handle the click event for an SVG object
      $(".my_editor.for_img").show();
      $(".my_editor.for_text").hide();
      // Open the SVG section or perform an SVG-related action
    }
  }
  $(".drop_down").hide();
  $("span.edit_item.edit_front_back").removeClass("arrows");
  $(".sub-menu-drop").removeClass("active");
});
$("div#font-family span, #font-family-select option").each(function () {
  var fontFamily = $(this).attr("value");
  $(this).css("font-family", fontFamily);
});
$("button#flipVerticalButton, button#flipHorizontalButton").click(function () {
  $(this).toggleClass("active");
});

// Function to save canvas data to local storage 6x6inches
const canvasDataDiv = document.getElementById("canvasDataContainer");
let allCanvasDataf = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to save canvas data to local storage 4x6inches

const canvasDataDivSmall = document.getElementById("canvasDataContainerSmall");
let allCanvasDatafSmall = [];

// Function to save canvas data to local storage landscape

const canvasDataDivlandscape = document.getElementById(
  "canvasDataContainerlandscap"
);

// Function to save canvas data to local storage potrait

const canvasDataDivpotrait = document.getElementById(
  "canvasDataContainerPotrait"
);
let allCanvasDatafpotrait = [];

loadCanvasNext6x6();
loadCanvasNext4x6();
loadCanvasNextLands();
loadCanvasNextPotraits();
setTimeout(function () {
  loadCanvasNextNext6x6();
  loadCanvasNextNext4x6();
  loadCanvasNextNextLands();
  loadCanvasNextNextPotraits();
}, 300);

var clss_exist_saved = $(".save_after_login").hasClass("saved");
if (clss_exist_saved == true) {
  // Add an event listener to the "Save" button
  $(document).on("click", ".save_after_login", function () {
    if (canvas.getObjects().length > 0) {
      var size_varinats = $(
        "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new .loop"
      ).attr("size_varinats");
      if (size_varinats == "6.0 x 6.0") {
        saveCanvas6x6();
        loadCanvas6x6();
      } else if (size_varinats == "4.0 x 6.0") {
        saveCanvas4x6();
        loadCanvas4x6();
      } else if (
        size_varinats == "1.5 x 2.0" ||
        size_varinats == "1.5 x 3.0" ||
        size_varinats == "2.0 x 3.0" ||
        size_varinats == "2.0 x 4.0"
      ) {
        saveCanvasLands();
        loadCanvasLands();
      } else if (
        size_varinats == "1.5 x 1.5" ||
        size_varinats == "2.0 x 2.0" ||
        size_varinats == "3.0 x 3.0" ||
        size_varinats == "4.0 x 4.0"
      ) {
        saveCanvasPotraits();
        loadCanvasPotraits();
      }

      $(".popup_previous_data").addClass("active");
    } else {
      alert("Canvas is blank");
    }
  });
}
$(".designs_tatoo_designs span").click(function () {
  var ids = $(this).attr("data-id");
  $(".designs_tatoo_designs span").removeClass("active_layout");
  $(this).addClass("active_layout");
  $(".popup_previous_data .designs_tatoo .cmn").hide();
  $(".popup_previous_data .designs_tatoo .cmn[data-id=" + ids + "]").show();
});

$(document).on("click", ".popup_previous_data.active .loop-svg", function () {
  canvas.clear();
  var active_canvas_save = $(".designs_tatoo_designs .active_layout").attr(
    "data-canvas-size"
  );
  $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .loop-all"
  ).removeClass("active-new");
  $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .loop-all .loop[size_varinats='" +
      active_canvas_save +
      "']"
  )
    .closest(".loop-all")
    .addClass("active-new");
  $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .loop-all.active-new .loop"
  ).click();
  $("div#shopify-section-tattoo_popup_selection").hide();

  var svgEl = $(this).find("svg")[0];
  var serializer = new XMLSerializer();
  var svgStr = serializer.serializeToString(svgEl);

  var path = fabric.loadSVGFromString(svgStr, function (objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);

    canvas.add(obj);
    canvas.setActiveObject(obj);
    $(".btn_disgard").click();
    canvas.renderAll();
  });

  $(".popup_previous_data").fadeOut();
  $(".popup_previous_data").removeClass("active");
});

$(document).on("click", ".add-cart-save", function () {
  $(".header-right span.add_to_cart").click();
});
$(".popup_previous_data span.crose_design").click(function () {
  $(".popup_previous_data").removeClass("active");
  $(".popup_previous_data").fadeOut();
  var get_size = localStorage.getItem("PageLoadSize");
  if (get_size == "6.0 x 6.0") {
    $(".data-chk").removeClass("active_layout");
    $(".large_design").addClass("active_layout");
    var active_clas = $(".data-chk.active_layout").attr("data-id");
    $(".designs_tatoo .cmn").hide();
    $('.designs_tatoo .cmn[data-id="' + active_clas + '"]').show();
  } else if (get_size == "4.0 x 6.0") {
    $(".data-chk").removeClass("active_layout");
    $(".small_design").addClass("active_layout");
    var active_clas = $(".data-chk.active_layout").attr("data-id");
    $(".designs_tatoo .cmn").hide();
    $('.designs_tatoo .cmn[data-id="' + active_clas + '"]').show();
  } else if (
    get_size == "1.5 x 2.0" ||
    get_size == "1.5 x 3.0" ||
    get_size == "2.0 x 3.0" ||
    get_size == "2.0 x 4.0"
  ) {
    $(".data-chk").removeClass("active_layout");
    $(".lands_design ").addClass("active_layout");
    var active_clas = $(".data-chk.active_layout").attr("data-id");
    $(".designs_tatoo .cmn").hide();
    $('.designs_tatoo .cmn[data-id="' + active_clas + '"]').show();
  } else if (
    size_varinats == "1.5 x 1.5" ||
    size_varinats == "2.0 x 2.0" ||
    size_varinats == "3.0 x 3.0" ||
    size_varinats == "4.0 x 4.0"
  ) {
    $(".data-chk").removeClass("active_layout");
    $(".potrait_design ").addClass("active_layout");
    var active_clas = $(".data-chk.active_layout").attr("data-id");
    $(".designs_tatoo .cmn").hide();
    $('.designs_tatoo .cmn[data-id="' + active_clas + '"]').show();
  }
});

$(document).on(
  "click",
  "div#shopify-section-tatoo_design_left_sidebar .sidebar_Content_row div#tatoosaved",
  function () {
    var clss_exsit = $(".save_after_login").hasClass("saved");
    if (clss_exsit) {
      $("div#design").click();
      $(".popup_previous_data").addClass("active");
    }
  }
);

// Call the function for each tab when needed (e.g., on scroll or button click)
$(document).ready(function () {
  var designtabs = $(
    "#shopify-section-slide_drower .slid_des_content [id^=tab]"
  ); // Select all tabs

  designtabs.each(function () {
    var tabIndex = $(this).attr("id").replace("tab", ""); // Get tab index from the id

    // Example trigger: load more images when the user scrolls near the bottom of the page
    $(window).scroll(function () {
      if (
        $(window).scrollTop() + $(window).height() >=
        $(document).height() - 100
      ) {
        loadMoreImages(tabIndex); // Load more images for the current tab
      }
    });
    loadMoreImages(tabIndex);
    // Optionally, add manual load more buttons if required
    $("#loadMoreButton" + tabIndex).on("click", function () {
      loadMoreImages(tabIndex);
    });
  });
});

// Load More Images End
var dynamic_loads_fonts = $(".dynamic_loads_fonts").attr("data_fonts");
var imagesPerPage5 = 50; // Number of images to load per request
function loadMoreText() {
  isLoading = true;
  // Simulate an AJAX request (replace this with your actual server request)
  setTimeout(function () {
    for (var i = 1; i <= imagesPerPage5; i++) {
      var dataget1 = $(".fonts_load.static_fonts div:first-child").html();
      var valget1 = $(".fonts_load.static_fonts div:first-child").text();
      if (valget1) {
        var $imageSet = $(
          '<div class="fnt_item" value="' +
            valget1 +
            '" ></div>'
        );
        $imageSet.append(dataget1);
        $(".dynamic_loads_fonts").append($imageSet);
        $(".fonts_load.static_fonts div:first-child").remove();
      }
    }

    isLoading = false;
  }, 1000); // Simulating a delay for demonstration purposes
}

$(".dynamic_loads_fonts").scroll(function () {
  var sidebarContent = $(".dynamic_loads_fonts");
  if (
    sidebarContent.scrollTop() + sidebarContent.innerHeight() >=
      sidebarContent[0].scrollHeight - 100 &&
    !isLoading
  ) {
    loadMoreText();
  }
});
loadMoreText();

$(".custom_login_submit button").click(function () {
  var email_val =
    $(".customer-form input#input-main-login--customeremail").val() != "";
  var pswd_val =
    $(".customer-form input#input-main-login--customerpassword").val() != "";

  if (email_val == true && pswd_val == true) {
    $(".login-form-tattoo.active .login-form-tattoo_container button").trigger(
      "click"
    );
  }
});

if ($(window).width() < 749) {
  $(document).on(
    "click",
    ".svg_item, div#font-family span, .updateImg",
    function () {
      $("span.btn_close").click();
      $(".my_editor").css("transition", "none");
    }
  );
  $(document).on("click", ".svg_item", function () {
    $(".my_editor.for_img").fadeIn();
  });
  $(document).on("click", "div#font-family span", function () {
    $(".my_editor.for_text").fadeIn();
  });
}

var currentSetIndex = 0;

$(document).on("click", ".div_custom_front_back .back", function () {
  setTimeout(function () {
    var canvasObjects = canvas.getObjects();

    var $imageContainer = $(".uploades_imgs_data_back");
    var $images = $imageContainer.find("img.clickable_img");

    for (var i = 0; i < canvasObjects.length; i++) {
      if (canvasObjects[i].type === "image") {
        // Compare images based on source URL
        var imageUrl = canvasObjects[i].src;
        $images.eq(i).attr("src", imageUrl);
      }
    }
  }, 300);

  // clearCanvas();
  $(".uploades_imgs_data_back").css("display", "flex");
  $(".uploades_imgs_data").hide();
  var imageData = canvas.toDataURL("image/png");

  // Store the image data in localStorage
  localStorage.setItem("canvasImageData", imageData);

  var storedImageData = localStorage.getItem("canvasImageData");
  $(".front_tatt").remove();
  $("body").append(
    "<div class='front_tatt' style='display:none;'><img   height='' width='' loading='lazy' src=" +
      storedImageData +
      "></div>"
  );

  storeCurrentSet();

  // Toggle between sets
  currentSetIndex = 1 - currentSetIndex;

  // Restore the current set of objects
  restoreStoredData();

  $(".div_custom_front_back .front").removeClass("active");
  $(this).addClass("active");
  $(".static_contenet_back").remove();
  var canvas_cls = $(".canvas-container").hasClass("for-margin");
  if (canvas_cls == true) {
    $(".static_contenet_back").addClass("for-margin-bottom");
  } else {
    $(".static_contenet_back").removeClass("for-margin-bottom");
  }
});

$(document).on("click", ".div_custom_front_back .front", function () {
  setTimeout(function () {
    var canvasObjects = canvas.getObjects();

    var $imageContainer = $(".uploades_imgs_data");
    var $images = $imageContainer.find("img.clickable_img");

    for (var i = 0; i < canvasObjects.length; i++) {
      if (canvasObjects[i].type === "image") {
        // Compare images based on source URL
        var imageUrl = canvasObjects[i].src;
        $images.eq(i).attr("src", imageUrl);
      }
    }
  }, 300);
  $(".uploades_imgs_data_back").hide();
  $(".uploades_imgs_data").css("display", "flex");

  var $activesize = $(
    "div#shopify-section-tattoo_popup .loop-all .loop.active"
  );
  var height_data = $activesize.attr("height_data");
  var width_data = $activesize.attr("width_data");
  var converted_width = $activesize.attr("converted_width");
  var converted_height = $activesize.attr("converted_height");
  var imageData = getResizedImage(canvas, converted_width, converted_height);

  localStorage.setItem("canvasImageData1", imageData);

  $(".back_tatt").remove();
  $("body").append(
    "<div class='back_tatt' style='display:none;'><img   height='' width='' loading='lazy' data-elm=" +
      canvas.getObjects().length +
      " src=" +
      imageData +
      "></div>"
  );
  storeCurrentSet();

  // Toggle between sets
  currentSetIndex = 1 - currentSetIndex;

  // Restore the current set of objects
  restoreStoredData();

  $(".canvas-container").removeClass("height_adjust");
  $(".back_tatoo").removeAttr("value");
  $(".static_contenet_back").remove();
  $(".div_custom_front_back .back").removeClass("active");
  $(this).addClass("active");
});

// Add a click event listener to the trigger image
$(".template_back .imgs").on("click", function () {
  var class_exsist = $(
    "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all"
  ).hasClass("active-new");

  var svgEl = $(this).find("svg")[0];
  var serializer = new XMLSerializer();
  var svgStr = serializer.serializeToString(svgEl);

  var path = fabric.loadSVGFromString(svgStr, function (objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);
    if (class_exsist == true) {
      var canvas_object_height = $(
        "div#shopify-section-tattoo_popup .tattoo_popup_inner .inner_Content .loop-all.active-new"
      ).attr("obj_height");

      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 8.1, top: canvas.height / 3.3 })
        .setCoords();
    } else {
      var canvas_object_height = 200;
      obj
        .scaleToHeight(canvas.height - canvas_object_height)
        .set({ left: canvas.width / 8.1, top: canvas.height / 3.3 })
        .setCoords();
    }
    canvas.add(obj).renderAll();
    canvas.setActiveObject(obj);

    set1Objects.push(obj.toJSON()); // Save image data
    set2Objects.push(obj.toJSON()); // Save image data
  });
  $(".my_editor#design").fadeIn();
  $(".my_editor#text").fadeOut();
  $(".main-secrion .canvas-container").addClass("for-margin");
});

$(".inenr_tearm input").click(function () {
  if ($(this).is(":checked")) {
    $(".tearms_txt").removeClass("active");
    setTimeout(function () {
      var class_back_active = $(".front.cmn").hasClass("active");

      if (class_back_active == true) {
        //     var base64Image = canvas.toDataURL("png");
        var $activesize = $(
          "div#shopify-section-tattoo_popup .loop-all .loop.active"
        );
        var height_data = $activesize.attr("height_data");
        var width_data = $activesize.attr("width_data");
        var converted_width = $activesize.attr("converted_width");
        var converted_height = $activesize.attr("converted_height");
        var base64Image = getResizedImage(
          canvas,
          converted_width,
          converted_height
        );

        $(".last-cart_page_inner .cmn.left .base_img").remove();
        $(".last-cart_page_inner .cmn.left").append(
          "<img  loading='lazy'class='base_img' height='" +
            height_data +
            "' width='" +
            width_data +
            "' src='" +
            base64Image +
            "'>"
        );
        // Check if the canvas has objects
        if (canvas.getObjects().length > 0) {
          $(".cart-popup-empty").fadeOut();
          $(".last-cart_page").fadeIn();
          makevariablefor_atc();
        } else {
          $(".cart-popup-empty").fadeIn();
          $(".last-cart_page").fadeOut();
        }
      } else {
        alert("Front selection required for cart addition.");
      }
    }, 300);
  } else {
    alert("Checkbox Is not checked");
  }
});
$(".tearms_txt .inenr_tearm .close_div, .tearms_txt").click(function () {
  $(".tearms_txt").removeClass("active");
  // $('.front.cmn').trigger('click');
});

$(".inenr_tearm").click(function (e) {
  e.stopPropagation();
});

/***************************************************/
/************* by default selections  ***START***********/
/***************************************************/
var canvasData = localStorage.getItem("canvasData");
var canvasDataSmall = localStorage.getItem("canvasDataSmall");
var canvasDatalandscape = localStorage.getItem("canvasDatalandscape");
var canvasDatapotrait = localStorage.getItem("canvasDatapotrait");
var savedsize = localStorage.getItem("PageLoadSize");
var PageLoadTechnology = localStorage.getItem("PageLoadTechnology");
var PageLoadOption = localStorage.getItem("PageLoadOption");
var PageLoadQuantity = localStorage.getItem("PageLoadQuantity");
var PageLoadQuantityId = localStorage.getItem("PageLoadId");
var defaultsel = false;
$nopopup = true;

if (savedsize !== null) {
  var $thsfirstsize = $(
    "div#shopify-section-tattoo_popup .tattoo_popup .loop[size_varinats='" +
      savedsize +
      "']"
  );
} else {
  var $thsfirstsize = $(
    "div#shopify-section-tattoo_popup .loop-all:last .loop"
  );
}

var height_data = $thsfirstsize.attr("height_data");
var width_data = $thsfirstsize.attr("width_data");
const obj_height = $thsfirstsize.attr("obj_height");
var newWidth = width_data;
var newHeight = height_data;
resizeCanvas(newWidth, newHeight, obj_height);
addclass_aaccdingto_size_variants($thsfirstsize.attr("size_varinats"));



let sizeIndex = parseInt(getUrlParam('size'), 10);
let defaultSizeset = false;




$(window).on("load", function () {
  
if (!isNaN(sizeIndex)) {
  sizeIndex=sizeIndex-1;
    // Select all valid .loop-all elements (excluding .slick-cloned)
    let targetElement = $('#shopify-section-tattoo_popup .tattoo_popup .loop-all:not(.slick-cloned):eq('+sizeIndex+') .loop');


    if (targetElement.length != 0) {
      defaultSizeset=true;
     
        targetElement.trigger("click");
        // Perform any action on the target element here
    } 
} 
  if (
    savedsize !== null ||
    PageLoadTechnology !== null ||
    PageLoadOption !== null ||
    PageLoadQuantity !== null ||
    PageLoadQuantityId !== null
  ) {
    setTimeout(function () {
      /**********default show size***********/
      var qty_attr = $(
        ".tattoo_popup.popup_selection .loop-all.selection_active"
      ).attr("id");
      if (
        qty_attr == "qty-gliter" ||
        qty_attr == "qty-metalic" ||
        qty_attr == "qty-glow"
      ) {
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").hide();
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").hide();
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").hide();
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(2)").addClass(
          "not-show"
        );
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(1)").addClass(
          "not-show"
        );
        $("div#shopify-section-tattoo_popup .loop-all:nth-child(3)").addClass(
          "not-show"
        );
      } else {
        $("div#shopify-section-tattoo_popup .loop-all").show();
        $("div#shopify-section-tattoo_popup .loop-all").removeClass("not-show");
      }
      /**********default show size***********/
    }, 400);

    setTimeout(function () {
      if (typeof savedsize !== "undefined" && savedsize !== null && !defaultSizeset) {
        $(
          "div#shopify-section-tattoo_popup .tattoo_popup .loop[size_varinats='" +
            savedsize +
            "']"
        ).click();
        //alert(1);
      } else {
       
        if (!defaultSizeset) {
           //alert(2);
          $(
            "div#shopify-section-tattoo_popup .tattoo_popup .loop-all:not(.slick-cloned):eq(0) .loop"
          ).click();
        }
      }

      var data_loop = $("div#shopify-section-tattoo_popup .loop-all").hasClass(
        "active-new"
      );

      if (data_loop == true && !defaultSizeset) {
      // alert(3);
        $(
          "div#shopify-section-tattoo_popup .loop-all.active-new .loop"
        ).click();
      }

      if (
        typeof PageLoadTechnology !== "undefined" &&
        PageLoadTechnology !== null
      ) {
        $(
          "div#shopify-section-tattoo_popup_selection .inner_Content_row .loop-all[custom_product='" +
            PageLoadTechnology +
            "'] .loop"
        ).click();
      } else {
        $(
          "div#shopify-section-tattoo_popup_selection .inner_Content_row .loop-all:eq(0) .loop"
        ).click();
      }

      if (typeof PageLoadOption !== "undefined" && PageLoadOption !== null) {
        $(
          "div#shopify-section-tattoo_popup_option .tattoo_popup.popup_option .loop-all[option_data='" +
            PageLoadOption +
            "'] .loop"
        ).click();
      } else {
        $(
          "div#shopify-section-tattoo_popup_option .tattoo_popup.popup_option .loop-all:eq(0) .loop"
        ).click();
      }

      $(
        ".loop-all.selection_active[id='" + PageLoadQuantityId + "'] .loop"
      ).click();
    }, 100);
  } else {
    if (!defaultSizeset) {
     // alert(4);
        $("div#shopify-section-tattoo_popup .loop-all:not(.slick-cloned):last .loop").click();
    }
  }
  setTimeout(function () {
    $("div#shopify-section-tattoo_popup").hide();
    $("div#shopify-section-tattoo_popup_selection")
      .removeClass("hide_div")
      .fadeIn();
    $("div#shopify-section-quntity-popup").hide();
    $("div#shopify-section-tattoo_popup_option").hide();
    $("div#shopify-section-tattoo_popup_back").hide();
    $nopopup = false;
  }, 400);
});
/***************************************************/
/************* by default selections  ***END***********/
/***************************************************/

$(document).on("click", "span.edit_item.edit_bringToFront", function () {
  $(".drop_down").hide();
  $(".edit_bringToFront").removeClass("active");
  $(this).addClass("active");
});

$(".btn_disgard").click(function () {
  var activeObject = canvas.getActiveObject();
  if (activeObject.type == "group") {
    var items = activeObject._objects;
    activeObject._restoreObjectsState();
    canvas.remove(activeObject);
    for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size() - 1).hasControls = true;
    }

    canvas.renderAll();
  }
});
$(document).on("click", "#tabs-content span.content-back-arrow", function () {
  $(this).parents('#tabs-content').find('.tab-content').hide();
  $(this).parents('.tabs').find('ul.slid_des li').show();
  $(this).hide();
});
$(document).ready(function () {
  // Make the .movable divs draggable and resizable within their parent .container
  $(".cstm_slides_sticker").draggable({
    containment: "parent",
  });

  setInterval(function () {
    $(
      "*[draggable!=true], .custom_thumbs .slick-track, .armband_slider .slick-track, .face_slider .slick-track, .sleeves_slider .slick-track, .tiny_slider .slick-track, .lower_slider .slick-track"
    ).unbind("dragstart");
  }, 500);

  $(".checkout_redirect_ctm").on("click", function () {
    var checkoutElement = document.querySelector('[name="checkout"]');

    // Check if the element is found
    if (checkoutElement) {
      // Trigger a click event on the element
      checkoutElement.click();
    }
  });
});

$(document).ready(function () {
  const $dropZone_tatto = $("#dropZone_tatto");
  const $imageInput = $("#imageInput");

  $dropZone_tatto.on("dragover", function (event) {
    event.preventDefault();
    $dropZone_tatto.addClass("dragover");
  });

  $dropZone_tatto.on("dragleave", function () {
    $dropZone_tatto.removeClass("dragover");
  });

  $dropZone_tatto.on("drop", function (event) {
    event.preventDefault();
    $dropZone_tatto.removeClass("dragover");

    const files = event.originalEvent.dataTransfer.files;
    if (files.length) {
      $imageInput[0].files = files;
      $imageInput.trigger("change");
    }
  });

  $(".backbtn").on("click", function (e) {
    e.preventDefault();
    var backpopup = "#" + $(this).attr("data-back_nowhite");
    if (
      $(".loop-all.selection_active").attr("custom_product") ==
      "copy-of-classic-custom-tattoo"
    ) {
      backpopup = "#" + $(this).attr("data-back");
    }

    $(this).closest(".shopify-section").hide();
    $(backpopup).show();
  });
  refreshTattooPosition();
});

window.onload = function () {
  document.querySelectorAll("img").forEach(function (img) {
    // Get the src attribute of the image
    let src = img.getAttribute("src");

    // Extract the image file name from the src
    let imageName = src.split("/").pop().split(".").shift();

    // Check if the alt attribute is missing or blank
    if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
      // Set the alt attribute to the image name
      img.setAttribute("alt", imageName);
    }
  });
};


// -----------bar_hide_click---------
$(document).on('click', 'span.bar_hide', function () {
    $('div#shopify-section-tatoo_design_left_sidebar').hide();
    $('.open_drwar_bt').show();
});

$(document).on('click', '.open_drwar_bt', function () {
    $('div#shopify-section-tatoo_design_left_sidebar').show();
    $('.open_drwar_bt').hide();
});