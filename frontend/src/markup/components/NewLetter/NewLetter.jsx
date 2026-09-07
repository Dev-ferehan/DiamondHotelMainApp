import React,{ useState } from "react";

function NewLetter() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("እባክዎን ስልክ ቁጥር ያስገቡ!");
      return;
    }

    // 1. ወደ Backend/API ለመላክ ሲፈለግ (ለወደፊቱ)
    console.log("የተላከው ስልክ ቁጥር:", phoneNumber);

    // 2. ለደንበኛው የስኬት መልእክት ማሳያ
    alert("እናመሰግናለን! በቅርብ ጊዜ ወደ " + phoneNumber + " እንደውላለን።");

    // Form-ኡን ባዶ ማድረግ
    setPhoneNumber("");
  };
  return (
    <>
      <div>
        {/* <!-- Call Back Request Start --> */}
        <div
          className="container newsletter mt-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="row justify-content-center">
            <div className="col-lg-10 border rounded p-1">
              <div className="border rounded text-center p-1">
                <div className="bg-white rounded text-center p-5">
                  <h4 className="mb-4">
                    Request A{" "}
                    <span className="text-primary text-uppercase">
                      Call Back
                    </span>
                  </h4>
                  <div
                    className="position-relative mx-auto"
                    style={{ maxWidth: "400px" }}
                  >
                    <input
                       value={phoneNumber}
                       onChange={e => setPhoneNumber(e.target.value)}
                      className="form-control w-100 py-3 ps-4 pe-5"
                      type="tel"
                      placeholder="Enter phone number"
                    />
                    <button
                      type="submit" 
                      onClick={handleSubmit}
                   
                      className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                    >
                      Call Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Call Back Request End --> */}
      </div>
    </>
  );
}

export default NewLetter;