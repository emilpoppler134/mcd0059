(async() => showStartContent())();

/* Views */
async function showStartContent() {
  const response = await fetch("/cards/get", {method: "POST"});
  const { status, data } = await response.json();

  if (status === "ERROR") {
    
    return;
  }
  
  if (data.length > 0) {
    const card = data[0];
    const months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

    document.querySelector(".content").innerHTML = `
      <span class="card-title">Betalningsmetoder</span>
      <div class="card-list">
        <div class="card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="icon">
              <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"/>
            </svg>
          </div>
          <div class="card-information">
            <div class="flex-row">
              <span class="card-text card-name">${card.brand}</span>
              <span class="card-text card-4last">•••• ${card.last4}</span>
            </div>
            <span class="card-text card-exp">Utgår ${months[card.exp_month - 1]} ${card.exp_year}</span>
          </div>
          <div class="card-actions">
            <button class="card-action-button remove-card">
              <svg class="card-action-icon" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.002 4V3a1 1 0 0 1 1-1H6a2 2 0 1 1 4 0h4.005a1 1 0 0 1 1 1v1zM2.5 6h11l-.452 9.05a1 1 0 0 1-1 .95H3.952a1 1 0 0 1-.999-.95z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="app-payment">
        <div class="input-container">
          <input type="number" class="checkoutInput amount" placeholder="Belopp">
        </div>
        <div class="confirmPaymentContainer">
          <button class="SubmitButton SubmitButton--incomplete">
            <span class="SubmitButton-Text">Betala</span>
          </button>
        </div>
      </div>
    `;
    document.querySelector(".remove-card").addEventListener("click", handleRemoveCard);
    document.querySelector(".SubmitButton").addEventListener("click", handlePay);
  } else {
    document.querySelector(".content").innerHTML = `
      <span class="card-title">Betalningsmetoder</span>
      <button class="add-card">
        <svg aria-hidden="true" class="icon" height="12" width="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"></path>
        </svg>
        <span class="button-text">Lägg till kort</span>
      </button>
    `;
    document.querySelector(".add-card").addEventListener("click", showAddCardContent);
  }
}

function showAddCardContent() {
  document.querySelector(".content").innerHTML = `
    <div class="app-payment">
      <button class="back-button">Back</button>
      <div class="global-fields">
        <div class="payment-fields flex-wrap">
          <div class="flex-item flex-wrap">
            <span class="checkoutInputHeader">Lägg till ett kort</span>
            <div style="position: relative; width: 100%;">
              <input type="text" class="checkoutInput top-border-radius" name="cc_number" placeholder="1234 1234 1234 1234" value="" autocapitalize="none" autocomplete="cc-number" autocorrect="off" spellcheck="false" maxlength='19'>
              <div class="card-icons">
                <img src="/private/images/visa.svg" alt="Visa">
                <img src="/private/images/mastercard.svg" alt="Mastercard">
                <img src="/private/images/amex.svg" alt="Amex">
              </div>
            </div>
            <input type="text" class="checkoutInput width-50 bottom-left-border-radius" name="cc_exp" placeholder="MM / YY" value="" autocapitalize="none" autocomplete="cc-exp" autocorrect="off" spellcheck="false" maxlength='5'>
            <input type="text" class="checkoutInput width-50 bottom-right-border-radius" name="cc_csc" placeholder="CVC" value="" autocapitalize="none" autocomplete="cc-csc" autocorrect="off" spellcheck="false" maxlength='4'>
          </div>
          <span class="error-message"></span>
        </div>
      </div>
      <div class="confirmPaymentContainer">
        <button class="SubmitButton SubmitButton--incomplete">
          <span class="SubmitButton-Text">Lägg till</span>
        </button>
      </div>
    </div>
  `;
  document.querySelector(".back-button").addEventListener("click", showStartContent);
  document.querySelector(".SubmitButton").addEventListener("click", handleAddCard);
}

function showLoadingScreen() {
  document.querySelector(".loading-screen").style.display = "block";
}

function hideLoadingScreen() {
  document.querySelector(".loading-screen").style.display = "none";
}


/* api request functions */
async function handleAddCard() {
  showLoadingScreen();

  const cc_number = document.querySelector(".checkoutInput[name='cc_number']").value;
  const cc_exp = document.querySelector(".checkoutInput[name='cc_exp']").value;
  const cc_csc = document.querySelector(".checkoutInput[name='cc_csc']").value;

  const year = Math.round(new Date().getFullYear() / 1000) * 1000;
  const exp_month = cc_exp.split("/")[0];
  const exp_year = parseInt(year) + parseInt(cc_exp.split("/")[1]);

  const params = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      card: {
        number: cc_number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cc_csc
      }
    })
  };

  const response = await fetch("/cards/create", params);
  const { status, data } = await response.json();

  hideLoadingScreen();

  if (status === "ERROR") {
    document.querySelector(".error-message").style.display = "flex";
    document.querySelector(".error-message").innerText = data.raw.message;
    return;
  }

  showStartContent();
}

async function handleRemoveCard() {
  showLoadingScreen();

  const response = await fetch("/cards/remove", { method: "POST" });
  const { status, data } = await response.json();

  hideLoadingScreen();

  if (status === "ERROR") {
    document.querySelector(".error-message").style.display = "flex";
    document.querySelector(".error-message").innerText = data.raw.message;
    return;
  }

  showStartContent();
}

async function handlePay() {
  showLoadingScreen();

  const amount = document.querySelector(".amount").value;

  const params = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amount
    })
  };

  const response = await fetch("/charge", params);
  const { status, data } = await response.json();

  hideLoadingScreen();

  if (status === "ERROR") {
    document.querySelector(".error-message").style.display = "flex";
    document.querySelector(".error-message").innerText = data.raw.message;
    return;
  }

  console.log(status, data);
}