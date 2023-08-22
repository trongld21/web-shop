import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { firestore } from "../../firebase";
import Link from "next/link";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(firestore, "products", id));
        if (productDoc.exists()) {
          setProduct({ id, ...productDoc.data() });
        } else {
          console.log("Sản phẩm không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Mua hàng thành công!");
    router.push('/');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl text-center w-full capitalize text-blue-800 font-semibold py-4">
          Chọn sản phẩm thành công
        </h1>
        <div className="p-8">
          <div className="flex lg:flex-nowrap flex-wrap justify-center gap-4">
            <div className="flex justify-center items-center">
              <img src={product?.imageUrl} className="" alt="Product" />
            </div>
            <div className="flex-col flex gap-4">
              <h3 className="text-xl font-semibold">{product?.name}</h3>
              <p className="whitespace-pre-line">
                <span className="font-semibold">Điểm nổi bật:</span>
                <br />
                {product?.description}
              </p>
              <div className="">
                <span className="text-[#e16262] font-semibold">
                  Giá: {product.price}đ
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center items-center lg:border-dashed lg:border-gray-600 lg:border rounded-lg py-8">
            <h1 className="text-base capitalize font-medium">Vui lòng điền thông tin thanh toán bên dưới</h1>
            <form className="space-y-4 max-w-lg w-full" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block font-semibold">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block font-semibold">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-semibold">
                  Địa chỉ nhận hàng
                </label>
                <textarea
                  id="address"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block font-semibold">
                  Phương thức thanh toán
                </label>
                <div className="flex space-x-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="cod">COD</label>
                  <input
                    type="radio"
                    id="transfer"
                    name="paymentMethod"
                    value="transfer"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="transfer">Chuyển khoản</label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#e16262] text-white py-2 px-4 rounded hover:bg-white hover:border-[#e16262] border hover:text-[#e16262]"
              >
                Thanh toán
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
