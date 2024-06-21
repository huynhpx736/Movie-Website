// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentResult = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const responseCode = searchParams.get('vnp_ResponseCode');

//   return (
  
//     <div className="payment-result">
//       {responseCode === '00' ? (
//         <div className="success">
//           <h1>Thanh toán thành công</h1>
//           <p>Cảm ơn bạn đã mua phim. Chúc bạn xem phim vui vẻ!</p>
//         </div>
//       ) : (
//         <div className="failure">
//           <h1>Thanh toán thất bại</h1>
//           <p>Xin lỗi, thanh toán của bạn đã thất bại. Vui lòng thử lại sau.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentResult;



// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PaymentResult = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const vnp_Amount = searchParams.get('vnp_Amount');
//   const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
//   const vnp_TxnRef = searchParams.get('vnp_TxnRef');
//   const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     const fetchPaymentResult = async () => {
//       try {
//         const response = await axios.get(`/api/payment/vnpay/return`, {
//           params: {
//             vnp_Amount,
//             vnp_ResponseCode,
//             vnp_TxnRef,
//             vnp_OrderInfo
//           },
//           responseType: 'text' // Để axios nhận dữ liệu dưới dạng văn bản
//         });

//         setHtmlContent(response.data);
//       } catch (error) {
//         setHtmlContent('<h1>Đã xảy ra lỗi, vui lòng thử lại sau.</h1>');
//       }
//     };

//     fetchPaymentResult();
//   }, [vnp_Amount, vnp_ResponseCode, vnp_TxnRef, vnp_OrderInfo]);

//   return (
//     <div className="payment-result" dangerouslySetInnerHTML={{ __html: htmlContent }} />
//   );
// };

// export default PaymentResult;

import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const responseCode = searchParams.get('vnp_ResponseCode');
  const amount = searchParams.get('vnp_Amount');
  const txnRef = searchParams.get('vnp_TxnRef');
  const orderInfo = searchParams.get('vnp_OrderInfo');

  return (
    <div className="payment-result">
      {responseCode === '00' ? (
        <div className="success">
          <h1>Thanh toán thành công</h1>
          <p>Cảm ơn bạn đã mua phim. Chúc bạn xem phim vui vẻ!</p>
          <p>Số tiền: {amount}</p>
          <p>Mã giao dịch: {txnRef}</p>
          <p>Thông tin đơn hàng: {orderInfo}</p>
        </div>
      ) : (
        <div className="failure">
          <h1>Thanh toán thất bại</h1>
          <p>Xin lỗi, thanh toán của bạn đã thất bại. Vui lòng thử lại sau.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
