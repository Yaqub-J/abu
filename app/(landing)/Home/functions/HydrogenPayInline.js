// SOURCE
// <script src="https://js.hydrogenpay.com/inline.js" module></script>

// import outputs from '@/amplify_outputs.json';

/*
* NOTE:
*   ORIGINAL VERSION OF PAYMENT GATEWAY POPUP
*   UNFINISHED -- CURRENTLY UNNECESSARY
*   CODE IS SAVED IN CASE FUNCTIONALITY
*   IS TO BE IMPLEMENTED
*/

let paymentResponseData;

export default async function handlePgData(paymentData, token, onClose, onSuccess) {
  try {
    paymentResponseData = await handleInitiateApiData(paymentData, token);
  } catch (error) {
    console.error("Error initiating payment:", error);
    return "Error in initiating payment";
  }

  if (!paymentResponseData) {
    return "Error in initiating payment";
  }
  createModal(paymentResponseData, onClose);
  return paymentResponseData.transactionRef;
}

function createModal(paymentResponseData, onClose) {
  const modalContainer = document.createElement("div");
  modalContainer.id = "hydrogenPay_myModal";
  modalContainer.className = "modal";
  modalContainer.style = `
    display: none; 
    position: fixed; 
    z-index: 1; 
    padding-top: 1%;
    left: 0;
    top: 0;
    min-width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(0,0,0,0.4);
  `;

  const myModal = document.createElement("div");
  myModal.id = "hydrogenPay_modal";
  myModal.className = "modal-content";
  myModal.style = `
    background-color: transparent;
    text-align: center;
    align-items: center;
    margin: auto;
    padding: 10px;
    border-radius: 20px;
    max-width: 460px;
    height: 662px;
  `;

  const closeIcon = document.createElement("span");
  closeIcon.className = "close";
  closeIcon.innerHTML = "&times;";
  closeIcon.style = `
    color: #000;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  `;

  closeIcon.addEventListener("click", () =>
    closeModal(paymentResponseData, onClose)
  );

  myModal.appendChild(closeIcon);
  modalContainer.appendChild(myModal);
  document.body.appendChild(modalContainer);

  modalContainer.style.display = "block";
  handleCreateIframe(paymentResponseData.url);
}

async function closeModal(paymentResponseData, onClose) {
  const modalContainer = document.getElementById("hydrogenPay_myModal");
  if (modalContainer) {
    modalContainer.remove();
    onClose && onClose(paymentResponseData.transactionRef);
  }
}

async function handleInitiateApiData(paymentData, token) {
  let response = await fetch(
    "https://api.hydrogenpay.com/bepay/api/v1/Merchant/initiate-payment",
    // "https://qa-api.hydrogenpay.com/bepayment/api/v1/Merchant/initiate-payment",

    {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  return await data.data;
}

async function handlePaymentStatus(transactionRef, token) {
  let response = await fetch(
    "https://api.hydrogenpay.com/bepay/api/v1/Merchant/confirm-payment",
    // "https://qa-api.hydrogenpay.com/bepayment/api/v1/Merchant/confirm-payment",
    {
      method: "POST",
      body: JSON.stringify({ transactionRef, isSdk: true }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  return await data.data;
}

function handleCreateIframe(src) {
  var iframe = document.createElement("iframe");
  iframe.className = "pgIframe";
  iframe.style.cssText = `
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  @media (min-width: 621px) and (max-width: 820px) {
    width: 80%;
  }
  @media (min-width: 300px) and (max-width: 620px) {
    width: 1000%;
    height: 1000%;
  }
`;
  iframe.style.overflow = "hidden";
  iframe.style.border = "none";
  iframe.src = src;
  iframe.allow = "clipboard-read; clipboard-write";
  document.getElementById("hydrogenPay_modal").appendChild(iframe);
}

function applyModalStyle(widthPercentage) {
  const baseStyle =
    "background-color: #fefefe; text-align: center; align-items: center; margin: auto; padding: 10px; border-radius: 20px; height: 80%;";
  myModal.style = `${baseStyle} width: ${widthPercentage};`;
}