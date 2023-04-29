// Start of Fetch data function
// This function gets the data

const loadData = async () => {
  let myPromise = await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = () => {
      if (req.status == 200 && req.readyState == 4) {
        let data = req.responseText;
        data = JSON.parse(data);
        resolve(data);
      } else {
        reject("Promise is rejected");
      }
    };
    req.open("GET", "https://fakestoreapi.com/products", true);
    req.send();
  });
  // displayData();
  return myPromise;
};
let retData = loadData();

// End of Fetch Data function

function viewMoreClickHandlerArg(element) {
  return function (event) {
    viewMoreClickHandler(element, event);
  };
}

function viewMoreClickHandler(element, event){
  // Check if the target element has the data-clickable attribute
  // console.log(event.target.getAttribute("data-clickable"));
  if (event.target.getAttribute("data-clickable") === "true") {
    // console.log(element);
    modalDisplay();

    let elementData = element.children;
    // console.log(elementData[1]);

    let mContentDiv = document.getElementById("modal_content_div_id");
    let mInnerDiv = document.createElement("div");
    mInnerDiv.classList.add("modal_inner_div");

    let cancelButton = document.createElement("button");
    cancelButton.innerHTML = "";
    cancelButton.setAttribute("data-clickable", true);
    cancelButton.classList.add("modal_cancel_button");

    let cancelIcon = document.createElement("i");
    cancelIcon.classList.add("bi");
    cancelIcon.classList.add("bi-x-lg");
    cancelIcon.classList.add("modal_cancel_icon");
    cancelIcon.setAttribute("data-clickable", true);
    cancelIcon.addEventListener("click", modalClose());
    cancelButton.appendChild(cancelIcon);

    mInnerDiv.appendChild(cancelButton);

    let innerSizeDiv = document.createElement("div");
    innerSizeDiv.classList.add("inner_size_div");
    mInnerDiv.appendChild(innerSizeDiv);

    let innerImageDiv = document.createElement("div");
    innerImageDiv.classList.add("inner_image_div");
    innerSizeDiv.appendChild(innerImageDiv);

    let innerImage = document.createElement("img");
    innerImage.src = elementData[0].querySelector(".productImage").src;
    innerImage.classList.add("inner_image");
    innerImageDiv.appendChild(innerImage);

    let productHeading = document.createElement("h2");
    productHeading.innerHTML =
      elementData[1].querySelector("#productTitle").innerHTML;
    productHeading.classList.add("modal_heading");
    innerSizeDiv.appendChild(productHeading);

    let productPrice = document.createElement("p");
    // console.log(elementData[1].querySelector("#productPrice"))
    productPrice.appendChild(elementData[1].querySelector("#productPrice"));
    productPrice.classList.add("modal_heading");
    innerSizeDiv.appendChild(productPrice);

    let productDesc = document.createElement("p");
    productDesc.appendChild(elementData[1].querySelector("#productDesc"));
    productDesc.classList.add("modal_heading");
    innerSizeDiv.appendChild(productDesc);

    let productCat = document.createElement("p");
    productCat.appendChild(elementData[1].querySelector("#productCat"));
    productCat.classList.add("modal_heading");
    innerSizeDiv.appendChild(productCat);

    let productRating = document.createElement("p");
    productRating.appendChild(elementData[1].querySelector("#productRating"));
    productRating.classList.add("modal_heading");
    innerSizeDiv.appendChild(productRating);

    let addToCart = document.createElement("button");
    addToCart.classList.add("add_to_cart_btn");
    // addToCart.classList.add("view_more_btn");
    addToCart.innerHTML = "Add to Cart";
    mInnerDiv.appendChild(addToCart);

    mContentDiv.appendChild(mInnerDiv);
  }
};

const modalDisplay = () => {
  let mBodyDiv = document.getElementById("outerContainer");
  let mbackcolor = document.getElementById("modal_background");
  let mContentDiv = document.getElementById("modal_content_div_id");
  if (mbackcolor.classList.contains("modal_back_color")) {
    mBodyDiv.classList.remove("modal_body_div_scroll");
    mbackcolor.classList.remove("modal_back_color");
    mContentDiv.classList.remove("modal_content_div");
    clearModal(mContentDiv);
  } else {
    mBodyDiv.className = "modal_body_div_scroll";
    mbackcolor.classList.add("modal_back_color");
    mContentDiv.classList.add("modal_content_div");
  }
};

function modalClose() {
  return function (event) {
    modalCloseHandler(event);
    // console.log("hello");
  };
}

const modalCloseHandler = (event) => {
  if (event.target.getAttribute("data-clickable") === "true") {
    modalDisplay();
    console.log("modalClosed");
    clearData();
    displayData();
  }
};

const clearModal = (element) => {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
};

// End of Display Element function

// Start of Clear Data function
// This function clears the data on the page

const clearData = () => {
  let child = outerContainer.lastElementChild;
  while (child) {
    outerContainer.removeChild(child);
    child = outerContainer.lastElementChild;
  }
};

// End of Clear Data function

// const nextPageDet = (element) => {
//   // console.log(element);
// };

let categoryWiseData = [];

function categoryBifurcation(category) {
  categoryWiseData = [];
  loadData().then((data) => {
    for (let i of data) {
      for (let j in i) {
        if (i[j] == category) {
          categoryWiseData.push(i);
        }
      }
    }
  });

  setTimeout(() => {
    localStorage.removeItem('categoryData')
    localStorage.setItem('categoryData', JSON.stringify(categoryWiseData));
  }, 2000);
}

const displayData = () => {
  setTimeout(() => {
    let b = JSON.parse(localStorage.getItem('categoryData'));
    for(let i of b){
      displayElement(i)
    }
  }, 3000);
};

const displayElement = (ele) => {
  let outerContainer = document.getElementById("outerContainer");
  let contentDiv = document.createElement("div");
  contentDiv.className = "contentContainer";
  let imageDiv = document.createElement("div");
  imageDiv.className = "imageContainer";
  let mainContainer = document.createElement("div");
  mainContainer.className = "mainContainer";
  for (let i in ele) {
    if (i == "title") {
      let h2 = document.createElement("h2");
      h2.setAttribute("id","productTitle");
      h2.className = "contentMargin";
      h2.innerHTML = ele[i];
      contentDiv.appendChild(h2);
    } else if (i == "description") {
      let p = document.createElement("p");
      p.className = "contentMargin";
      p.setAttribute("id","productDesc");
      p.innerHTML = ele[i];
      contentDiv.appendChild(p);
    }
    else if (i == "category") {
      let p = document.createElement("p");
      p.className = "contentMargin";
      p.setAttribute("id","productCat");
      p.innerHTML = ele[i];
      contentDiv.appendChild(p);
    }
    else if (i == "image") {
      let img = document.createElement("img");
      img.src = ele[i];
      img.className = "productImage";
      imageDiv.appendChild(img);
    } else if (i == "rating") {
      let p = document.createElement("p");
      p.className = "contentMargin";
      p.innerHTML = `Rating:- ${ele[i]["rate"]} Count:- ${ele[i]["count"]}`;
      p.setAttribute("id","productRating");
      contentDiv.appendChild(p);
    } else if (i == "price") {
      let p = document.createElement("p");
      p.className = "contentMargin";
      p.innerHTML = `<sup>$</sup>${ele[i]}`;
      p.setAttribute("id","productPrice");
      contentDiv.appendChild(p);
    }
    mainContainer.appendChild(imageDiv);
    mainContainer.appendChild(contentDiv);
  }
  let passElement = mainContainer;
  let viewMore = document.createElement("button");
  viewMore.innerHTML = "View More";
  viewMore.setAttribute("data-clickable", true);
  viewMore.addEventListener("click", viewMoreClickHandlerArg(passElement));
  viewMore.classList.add("view_more_btn");
  contentDiv.appendChild(viewMore);
  outerContainer.appendChild(mainContainer);
};
