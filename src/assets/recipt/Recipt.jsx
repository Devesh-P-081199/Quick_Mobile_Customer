import React, { useContext, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./receipt.css";
import { UserContext } from "../../../src/Context/contextAPI";

const Receipt = ({ data }) => {
    const receiptRef = useRef(null);
    const {
        user, // Current user data
    } = useContext(UserContext);
    const [isDownloading, setIsDownloading] = useState(false);
    console.log(data)
    const handleDownloadPdf = async () => {
        const element = receiptRef.current;
        if (!element) return;

        setIsDownloading(true);

        try {
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });

            const imgData = canvas.toDataURL("image/png");

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF("p", "mm", [imgWidth, Math.max(imgHeight + 20, pageHeight)]);

            pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
            pdf.save("quickmobile-receipt.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const [visble, setvisble] = useState(true)
    return (
        <div className="app-container">
            <button className="download-btn" onClick={handleDownloadPdf} disabled={isDownloading}>
                {isDownloading ? "Generating..." : "Download PDF"}
            </button>

            {visble == true && <div ref={receiptRef} className="canvas-container hidden-receipt-wrapper">
                <div className="receipt-page">
                    {/* Main Title */}
                    <div className="text-center mb-4">
                        <h2 className="title-main">Sell Recipt</h2>
                    </div>

                    {/* Header Section */}
                    <div className="header-row">
                        <div className="header-left">
                            <h1 className="company-brand">Quick Mobile</h1>
                            <p className="company-sub">Quickmobile llp.</p>
                        </div>
                        <div className="header-right">
                            <p className="date-text">12 sept 2025</p>
                            <p className="receipt-no">receipt no: 64658989</p>
                        </div>
                    </div>

                    {/* Seller & Buyer Details */}
                    <div className="details-container">
                        <div className="detail-box box-left">
                            <h4 className="box-title">Seller detail</h4>
                            <div className="box-content">
                                <p><strong>Order Id.</strong> {data.orderId}</p>
                                <p>Name:{user.name}</p>
                                <p>Phone no. {user.phone}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        </div>

                        <div className="detail-box box-right">
                            <h4 className="box-title">Buyer details</h4>
                            <div className="box-content">
                                <p>Name: Najem Madhani</p>
                                <p>Partner id: AX9373</p>
                                <p>City: Mumbai</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Table: Device & Price */}
                    <div className="main-table">

                        {/* Left: Device Info */}
                        <div className="device-col">
                            <div className="device-content" style={{ textAlign: "left" }}>
                                <p className="device-label"><strong>Device: {`${data.deviceEvaluationId.deviceName} (${data.deviceEvaluationId.deviceVariant})`}</strong></p>
                                <p className="device-imei">Imei no.3578805675398456</p>
                                <p className="device-condition">Condition: Good / used / Damage</p>
                            </div>
                        </div>

                        {/* Right: Price Info */}
                        <div className="pricing-col">
                            {/* Top empty/price area */}
                            <div className="price-top-section">
                                <span className="top-price-val">22477</span>
                            </div>

                            {/* Bottom aligned rows */}
                            <div className="price-bottom-section">
                                <div className="price-row">
                                    <span>pickup charge</span>
                                    <span className="text-green">free</span>
                                </div>
                                <div className="price-row">
                                    <span>platform fees</span>
                                    <span className="text-green">free</span>
                                </div>
                                <div className="price-row">
                                    <span>coupon</span>
                                    <span>--</span>
                                </div>
                                <div className="price-row total-row">
                                    <span>Total paid</span>
                                    <span>22577</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amount in Words */}
                    <div className="amount-text">
                        Twenty two thousand five hundred and seventy seven
                    </div>

                    {/* Payment Detail */}
                    <div className="payment-box">
                        <h4 className="box-title underline">payment detail</h4>
                        <div className="payment-grid">
                            <div className="pay-left">
                                <p>Mode of payment: UPI / Bank a/c</p>
                                <p>Paid to: 7400205373@upihjk / xxxxxxxxxx356</p>
                            </div>
                            <div className="pay-right">
                                <p>Transaction id: 36754744899746</p>
                                <p>Date and time: 10/02/26 10:35 am</p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="notes-section">
                        <h3>Notes.</h3>
                        <ul>
                            <li>Once the sale is completed and payment is made, the transaction is final and cannot be reversed.</li>
                            <li>The Seller will have no further rights or claims over the device.</li>
                            <li>The Buyer and/or Quick Mobile may freely resell, refurbish, recycle, or dispose of the device.</li>
                            <li>Any legal or illegal activity related to the device before the sale shall remain the sole responsibility of the Seller.</li>
                            <li>By selling device seller accepted terms&conditions of quick moble</li>
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="footer-line">
                        <hr />
                        <p>This is a system-generated Recipet No signature and Stamp required.</p>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Receipt;