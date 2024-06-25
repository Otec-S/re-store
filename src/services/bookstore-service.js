export default class BookstoreService {
  data = [
    {
      id: 1,
      title: "Production-Ready Microservices",
      author: "Susan J. Fowler",
      price: 32,
      coverImage: "https://m.media-amazon.com/images/I/81D4AHNvMsL._SY522_.jpg",
    },
    {
      id: 2,
      title: "Release It!",
      author: "Michael T. Nygard",
      price: 45,
      coverImage:
        "https://m.media-amazon.com/images/I/81c+o9-DetL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      id: 3,
      title: "React Quickly",
      author: "Azat Mardan",
      price: 40,
      coverImage: "https://m.media-amazon.com/images/I/61ykP8pDFqL._SY522_.jpg",
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error("Something bad happened"));
        } else {
          resolve(this.data);
        }
      }, 700);
    });
  }
}
