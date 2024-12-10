document.addEventListener('DOMContentLoaded', function () {
  class ringadjuster extends HTMLElement {
    constructor() {
      super(),
        this.CreditCard(),
        this.generatelines(),
        this.convertToMM(),
        this.NavLinks();
    }
    generatelines() {
      for (let i = 0; i < 50; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", i * 8),
          line.setAttribute("y1", "0"),
          line.setAttribute("x2", i * 8),
          line.setAttribute("y2", "100%"),
          line.setAttribute("class", "slant_lines"),
          document
            .querySelector(".rign-adjuster__svg-vertical g")
            .appendChild(line);
      }
      for (let i = 0; i < 250; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0"),
          line.setAttribute("y1", i * 8),
          line.setAttribute("x2", "100%"),
          line.setAttribute("y2", i * 8),
          line.setAttribute("class", "horizontal_lines"),
          document
            .querySelector(".rign-adjuster__svg-horizontal g")
            .appendChild(line);
      }
    }
    convertToMM() {
      const range = this.querySelector(".ring-adjuster__range");
      let sizeFinalize = this.querySelector(".ring-adjuster__size-cs span");
      range.addEventListener("input", (e) => {
        let circle = this.querySelector(".rign-adjuster__circle"),
          circleValue = this.querySelector(".rign-adjuster__circle-value"),
          Calulatedinch = this.scaledHeight / 2.1 / 25.4,
          calculatedValues = e.target.value * 0.2645833333;
        (circle.style.width = Calulatedinch * calculatedValues + "px"),
          (circle.style.height = Calulatedinch * calculatedValues + "px"),
          (circleValue.textContent = calculatedValues.toFixed(2) + "mm");
        let minimumValue = 50,
          nearestLowerSize = null,
          ringSizes = {
            '5': "15.7mm",
            '6': "16.5mm",
            '7': "17.3mm",
            '8': "18.1mm",
            '9': "19mm",
            '10': "19.8mm",
            '11': "20.6mm",
            '12': "21.4mm",
          };
        for (let size in ringSizes) {
          const subtractedValue = parseFloat(ringSizes[size]) - calculatedValues.toFixed(2), absoluteResultValue = subtractedValue > 0 ? subtractedValue : subtractedValue * -1;
          absoluteResultValue < minimumValue && ((minimumValue = absoluteResultValue), (nearestLowerSize = size));
        }
        sizeFinalize.textContent = `${nearestLowerSize}`;
      });
    }
    CreditCard() {
      let cardRangeInput = this.querySelector(".calibration-card__range"),
        cardImage = this.querySelector(".calibration-card__ring-img"),
        CalbContainer = this.querySelector(".ring-adjuster__card-detect");
      cardRangeInput.addEventListener("input", (e) => {
        const value = e.target.value,
          scale =
            0.4 +
            ((1.2 - 0.4) / (cardRangeInput.max - cardRangeInput.min)) * value,
          right =
            -320 + (-190 / (cardRangeInput.max - cardRangeInput.min)) * value;
        (cardImage.style.transform = `scale(${scale})`),
          (cardImage.style.right = `${right}px`);
      }),
        this.querySelector(".calibration-card__btn").addEventListener(
          "click",
          () => {
            const rect = cardImage.getBoundingClientRect();
            this.scaledHeight = rect.height;
            let RingContainer = this.querySelector(".ring-adjuster");
            (CalbContainer.style.display = "none"),
              (RingContainer.style.display = "grid");
          }
        );
    }
    NavLinks() {
      let navbuttons = this.querySelector(".ring-adjuster__container-nav-back"),
        previousWindow = this.querySelector(".ring-adjuster__card-detect"),
        RingContainer = this.querySelector(".ring-adjuster"),
        mainShowButton = this.querySelector(".ring-adjuster__main-btn__show"),
        Goback = this.querySelector(".calibration-card__info-nav");
      this.querySelector(".ring-card__submit-btn").addEventListener(
        "click",
        () => {
          RingContainer.style.display = "none";
        }
      ),
        Goback.addEventListener("click", () => {
          previousWindow.style.display = "none";
        }),
        mainShowButton.addEventListener("click", () => {
          console.log('mainShowButton clicked');
          previousWindow.style.display = "grid";
        }),
        navbuttons.addEventListener("click", () => {
          (RingContainer.style.display = "none"),
            (previousWindow.style.display = "grid");
        });
    }
  }
  customElements.define("ring-adjuster", ringadjuster);
});