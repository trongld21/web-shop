import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(firestore, "categories"));
      const categoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const getCategoryNameById = (categoryId, categories) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  return (
    <>
      <Header />
      <main className="container mx-auto p-8">
        <div className="py-4 relative">
          <img
            src="/assets/images/image_1.jpeg"
            alt="main image"
            className="rounded-lg"
          />
          <div className="rounded-lg absolute top-0 bg-[rgba(255,255,255,0.7)] w-full h-full">
            <img src="/assets/images/2.png" alt="main image" />
          </div>
        </div>
        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Dịch vụ Sửa Chữa và Bảo Trì
            </h2>
            <p className="text-gray-700">
              Chúng tôi cung cấp dịch vụ sửa chữa và bảo trì cho các sản phẩm
              điện máy của bạn. Bất kể sản phẩm của bạn có vấn đề gì, chúng tôi
              có đội ngũ kỹ thuật viên chuyên nghiệp và kinh nghiệm để giải
              quyết mọi vấn đề.
            </p>
            <a href="#" className="text-blue-600 mt-4 inline-block">
              Mua sắm ngay
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Dịch vụ Tư Vấn Mua Sắm</h2>
            <p className="text-gray-700">
              Việc mua sắm các sản phẩm điện máy có thể là một quyết định quan
              trọng và phức tạp. Chúng tôi hiểu rằng việc lựa chọn sản phẩm phù
              hợp với nhu cầu và ngân sách của bạn không phải lúc nào cũng dễ
              dàng.
            </p>
            <a href="#" className="text-blue-600 mt-4 inline-block">
              Mua sắm ngay
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Dịch vụ Giao Hàng và Lắp Đặt
            </h2>
            <p className="text-gray-700">
              Chúng tôi hiểu rằng việc nhận được sản phẩm một cách an toàn và
              đảm bảo là một phần quan trọng trong quá trình mua sắm. Đó là lý
              do tại sao chúng tôi cung cấp dịch vụ giao hàng và lắp đặt tận nơi
              cho các sản phẩm điện máy của bạn.
            </p>
            <a href="#" className="text-blue-600 mt-4 inline-block">
              Mua sắm ngay
            </a>
          </div>
        </section>
        <section className="carousel mt-4" aria-label="Gallery">
          <ol className="carousel__viewport">
            <li id="carousel__slide1" tabindex="0" className="carousel__slide">
              <div className="carousel__snapper">
                <img
                  src="/assets/images/image_2.jpeg"
                  alt="img"
                  className="w-full h-full"
                />
                <a href="#carousel__slide4" className="carousel__prev">
                  Go to last slide
                </a>
                <a href="#carousel__slide2" className="carousel__next">
                  Go to next slide
                </a>
              </div>
            </li>
            <li id="carousel__slide2" tabindex="0" className="carousel__slide">
              <div className="carousel__snapper">
                <img
                  src="/assets/images/image_1.jpeg"
                  alt="img"
                  className="w-full h-full"
                />
              </div>
              <a href="#carousel__slide1" className="carousel__prev">
                Go to previous slide
              </a>
              <a href="#carousel__slide3" className="carousel__next">
                Go to next slide
              </a>
            </li>
            <li id="carousel__slide3" tabindex="0" className="carousel__slide">
              <div className="carousel__snapper">
                <img
                  src="/assets/images/image_3.jpeg"
                  alt="img"
                  className="w-full h-full"
                />
              </div>
              <a href="#carousel__slide2" className="carousel__prev">
                Go to previous slide
              </a>
              <a href="#carousel__slide4" className="carousel__next">
                Go to next slide
              </a>
            </li>
            <li id="carousel__slide4" tabindex="0" className="carousel__slide">
              <div className="carousel__snapper">
                <img
                  src="/assets/images/image_4.png"
                  alt="img"
                  className="w-full h-full"
                />
              </div>
              <a href="#carousel__slide3" className="carousel__prev">
                Go to previous slide
              </a>
              <a href="#carousel__slide1" className="carousel__next">
                Go to first slide
              </a>
            </li>
          </ol>
          <aside className="carousel__navigation">
            <ol className="carousel__navigation-list">
              <li className="carousel__navigation-item">
                <a href="#carousel__slide1" className="carousel__navigation-button">
                  Go to slide 1
                </a>
              </li>
              <li className="carousel__navigation-item">
                <a href="#carousel__slide2" className="carousel__navigation-button">
                  Go to slide 2
                </a>
              </li>
              <li className="carousel__navigation-item">
                <a href="#carousel__slide3" className="carousel__navigation-button">
                  Go to slide 3
                </a>
              </li>
              <li className="carousel__navigation-item">
                <a href="#carousel__slide4" className="carousel__navigation-button">
                  Go to slide 4
                </a>
              </li>
            </ol>
          </aside>
        </section>
        <section className="w-full h-36 absolute left-0 right-0 custom-section-hotline">
          <div className="w-full text-center py-8 bg-[rgba(0,0,0,0.5)] ">
            <p className="text-sm text-white capitalize py-3">Liên hệ tư vấn</p>
            <h1 className="text-3xl text-white font-semibold">
              Hotline: 0933817090
            </h1>
          </div>
        </section>
        <section className="mt-48" id="order">
          <div className="flex justify-between items-center mb-4 flex-wrap">
            <h1 className="text-2xl font-semibold uppercase ">Sản phẩm</h1>
            <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2 rounded-md">
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-2">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex card lg:flex-nowrap flex-wrap">
                <div className="card_left flex justify-center items-center">
                  <img src={product?.imageUrl} className="w-full" />
                </div>
                <div className="card_right">
                  <span>
                    {getCategoryNameById(product.category, categories)}
                  </span>
                  <h3>{product?.name}</h3>
                  <p className="whitespace-pre-line">{product?.description}</p>
                  <div className="card_footer">
                    <span className="price">{product.price}đ</span>
                    <Link href={`/mua_hang/${product.id}`} className="btn">
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
