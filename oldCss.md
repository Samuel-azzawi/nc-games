body {
  background-image: url(./bluemoon.png);
  background-attachment: fixed;
}
.container {
  display: grid;
  grid-template-columns: auto 320px auto;
}
.reviews-container {
  display: grid;
  grid-template-columns: 1fr 320px 1fr;
}


.header {
  grid-column: 2;
}
.button-reviews {
  grid-column: 1;
  grid-row: 1;
  justify-self: left;
}
.categories-nav {
  grid-column: 1;
  grid-row: 1;
  margin-top: 80px;
  justify-self: left;
}
.reviews-categories-nav {
  grid-column: 3;
  grid-row: 2;
  justify-self: right;
}
.home-btn {
  grid-column: 1;
  grid-row: 1;
  justify-self: left;
}
.userLogin {
  grid-column: 3;
  grid-row: 1;
  justify-self: right;
}
.reset-review-btn {
  grid-column: 3;
  justify-self: right;
}
.review-card {
  grid-column:1/ span 3;
  grid-row: 3;
  
}

.item {
  font-style: oblique;
  font-size: larger;
  width: 40%;
  background-color: rgba(130, 253, 237, 0.733);
  padding: 5px;
  border: 2px solid rgb(193, 195, 191);
  border-radius: 20px;
  transition: all 0.8s ease-in-out;

}
.review-card :hover {
  background-color: #0051ff62;
  cursor: pointer;
  transition: all 0.8s ease-in-out;
  transform: translateY(-10px);
}
.item :hover {
  background-color: #00000000;
  transform: translateY(0px);
}

.avatar {
  width: 70px;
  border-radius: 50%;
  height: 70px;
}
.review_img {
  width: 50%;
  border-radius: 50px;
  height: 100%;
}
li {
  list-style-type: none;
}
.line {
  height: 1px;
  width: 100%;
  background-color: rgb(55, 57, 59);
}

.words {
  border-radius: 50px;
  max-width: 50%;
}

.dropbtn {
  padding: 7px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  width: 2in;
  color: #3498db;
}

button {
  align-items: center;
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #5468ff 100%
  );
  border: 0;
  border-radius: 50px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  height: 48px;
  justify-content: center;
  line-height: 1;
  padding-left: 16px;
  padding-right: 16px;
  touch-action: manipulation;
  font-size: 18px;
  font-style: italic;
}

button:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

button:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
