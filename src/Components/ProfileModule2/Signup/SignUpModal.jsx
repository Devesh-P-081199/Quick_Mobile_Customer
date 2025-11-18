
import React, { useContext, useState } from "react";
import { MdClose, MdPhoneAndroid } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/contextAPI";
import api from "../../../Utils/api";

const SignUpModal = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

    const { setUser } =
      useContext(UserContext);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    } else {
      toast.error("Enter a valid 10-digit mobile number");
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/sell-module/user/signUp",
        {
          phone: mobile,
          verifyOtp: otp.join(""),
        }
      );

      // console.log(response.data);

      if (response.data) {
        alert(`${response?.data?.message}`);
        const token = response.data.token;
        Cookies.set("auth-token", JSON.stringify(token), {
          expires: 2,
          sameSite: "strict",
        });
        setUser(response.data?.user);
      }
      toast.success("Signed up successfully");
      onClose();
    } catch (err) {
      // console.log("Error Occured",err);

      toast.error("Error verifying OTP");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <MdClose />
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-4">
            Enter your mobile number to sign up.
          </p>
        </div>

        {/* Mobile Input */}
        <div className="flex items-center border rounded-md px-3 py-2 mb-4">
          <MdPhoneAndroid className="text-gray-500 mr-2" />
          <input
            type="text"
            maxLength="10"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* OTP Fields */}
        {otpSent && (
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={otpSent ? handleSubmit : handleSendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          {otpSent ? "Verify & Sign Up" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
