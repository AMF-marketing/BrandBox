export interface Product {slug:string;name:string;group:string;description:string;kind:string;spec:string;price:number;priceFrom:boolean;images:string[];originalImages:string[]}
export const catalogGroups=['Автоматические печати','Карманные и ручные печати','Штампы','Расходники'] as const;
export const products:Product[]=[
  {
    "name": "MOUSE",
    "price": 2600,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-02.png"
    ],
    "slug": "mouse",
    "group": "Карманные и ручные печати",
    "description": "Карманная оснастка со встроенной подушкой.",
    "kind": "Карманная",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-07.png",
      "/products/product-02.png"
    ]
  },
  {
    "name": "COLOP",
    "price": 2500,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-01.png"
    ],
    "slug": "colop",
    "group": "Автоматические печати",
    "description": "Стационарная автоматическая оснастка.",
    "kind": "Автоматическая",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-01.png"
    ]
  },
  {
    "name": "TABLET",
    "price": 1600,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-03.png"
    ],
    "slug": "tablet",
    "group": "Карманные и ручные печати",
    "description": "Ручная печать. Штемпельная подушка приобретается отдельно.",
    "kind": "Ручная",
    "spec": "Отдельная подушка",
    "originalImages": [
      "/products/product-06.png",
      "/products/product-03.png"
    ]
  },
  {
    "name": "АВТОМАТ",
    "price": 1200,
    "priceFrom": true,
    "images": [
      "/products/studio-v3/product-16.png"
    ],
    "slug": "avtomat",
    "group": "Штампы",
    "description": "Штамп со встроенной штемпельной подушкой.",
    "kind": "Автоматическая",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-16.jpg"
    ]
  },
  {
    "name": "КАРИНА",
    "price": 2950,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-09.png"
    ],
    "slug": "karina",
    "group": "Карманные и ручные печати",
    "description": "Компактный металлический корпус для переноски.",
    "kind": "Карманная",
    "spec": "Металлический корпус",
    "originalImages": [
      "/products/product-09.jpeg"
    ]
  },
  {
    "name": "SHINY",
    "price": 2800,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-05.png"
    ],
    "slug": "shiny",
    "group": "Автоматические печати",
    "description": "Автоматическая оснастка для рабочего стола.",
    "kind": "Автоматическая",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-05.png"
    ]
  },
  {
    "name": "ФАКСИМИЛЕ",
    "price": 1400,
    "priceFrom": true,
    "images": [
      "/products/studio-v3/product-15.png"
    ],
    "slug": "faksimile",
    "group": "Штампы",
    "description": "Оттиск подписи на автоматической оснастке.",
    "kind": "Автоматическая",
    "spec": "По образцу подписи",
    "originalImages": [
      "/products/product-15.jpeg"
    ]
  },
  {
    "name": "TECHNO",
    "price": 3600,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-08.png"
    ],
    "slug": "techno",
    "group": "Карманные и ручные печати",
    "description": "Оснастка со встроенной штемпельной подушкой.",
    "kind": "Карманная",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-08.png"
    ]
  },
  {
    "name": "ПОДУШКА М2 100х70мм",
    "price": 1000,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-19.png"
    ],
    "slug": "podushka-m2",
    "group": "Расходники",
    "description": "Штемпельная подушка для ручных печатей и штампов.",
    "kind": "Штемпельная подушка",
    "spec": "100 × 70 мм",
    "originalImages": [
      "/products/product-19.jpg"
    ]
  },
  {
    "name": "IDEAL",
    "price": 2400,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-04.png"
    ],
    "slug": "ideal",
    "group": "Автоматические печати",
    "description": "Автоматическая оснастка для работы с документами.",
    "kind": "Автоматическая",
    "spec": "Встроенная подушка",
    "originalImages": [
      "/products/product-04.png"
    ]
  },
  {
    "name": "САБИНА",
    "price": 3050,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-10.png"
    ],
    "slug": "sabina",
    "group": "Карманные и ручные печати",
    "description": "Металлический корпус с деревянной ручкой.",
    "kind": "Ручная",
    "spec": "Деревянная ручка",
    "originalImages": [
      "/products/product-10.webp"
    ]
  },
  {
    "name": "КРАСКА 25МЛ",
    "price": 420,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-18.png"
    ],
    "slug": "kraska-25ml",
    "group": "Расходники",
    "description": "Штемпельная краска: синяя, фиолетовая, красная, зелёная или чёрная.",
    "kind": "Расходный материал",
    "spec": "25 мл",
    "originalImages": [
      "/products/product-18.webp"
    ]
  },
  {
    "name": "МАГНЕТИК",
    "price": 4800,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-14.png"
    ],
    "slug": "magnetik",
    "group": "Карманные и ручные печати",
    "description": "Печать в металлическом корпусе.",
    "kind": "Карманная",
    "spec": "Металлический корпус",
    "originalImages": [
      "/products/product-14.jpg"
    ]
  },
  {
    "name": "РУЧНОЙ",
    "price": 600,
    "priceFrom": true,
    "images": [
      "/products/studio-v3/product-17.png"
    ],
    "slug": "ruchnoy",
    "group": "Штампы",
    "description": "Штамп для использования с отдельной подушкой.",
    "kind": "Ручная",
    "spec": "Отдельная подушка",
    "originalImages": [
      "/products/product-17.webp"
    ]
  },
  {
    "name": "ДИСКО",
    "price": 3000,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-13.png"
    ],
    "slug": "disko",
    "group": "Карманные и ручные печати",
    "description": "Оснастка для печати в металлическом корпусе.",
    "kind": "Карманная",
    "spec": "Металлический корпус",
    "originalImages": [
      "/products/product-13.webp"
    ]
  },
  {
    "name": "ПОДУШКА М1 90х50мм",
    "price": 600,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-19.png"
    ],
    "slug": "podushka-m1",
    "group": "Расходники",
    "description": "Штемпельная подушка для ручных печатей и штампов.",
    "kind": "Штемпельная подушка",
    "spec": "90 × 50 мм",
    "originalImages": [
      "/products/product-19.jpg"
    ]
  },
  {
    "name": "КОМПАКТ",
    "price": 4100,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-12.png"
    ],
    "slug": "kompakt",
    "group": "Карманные и ручные печати",
    "description": "Металлический корпус и кожаный чехол.",
    "kind": "Карманная",
    "spec": "Чехол",
    "originalImages": [
      "/products/product-12.png"
    ]
  },
  {
    "name": "РАДИЙ",
    "price": 3150,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-11.png"
    ],
    "slug": "radiy",
    "group": "Карманные и ручные печати",
    "description": "Оснастка в металлическом корпусе.",
    "kind": "Ручная",
    "spec": "Металлический корпус",
    "originalImages": [
      "/products/product-11.webp"
    ]
  },
  {
    "name": "ПОДУШКА М3 160х90мм",
    "price": 1300,
    "priceFrom": false,
    "images": [
      "/products/studio-v3/product-19.png"
    ],
    "slug": "podushka-m3",
    "group": "Расходники",
    "description": "Штемпельная подушка для ручных печатей и штампов.",
    "kind": "Штемпельная подушка",
    "spec": "160 × 90 мм",
    "originalImages": [
      "/products/product-19.jpg"
    ]
  }
];
export function formatPrice(product:Pick<Product,'price'|'priceFrom'>):string{return (product.priceFrom?'от ':'')+new Intl.NumberFormat('ru-RU').format(product.price)+' ₽'}
export const legacyCategories:Record<string,{title:string;description:string;groups:string[]}>= {
'pechati-ip':{title:'Печати для ИП',description:'Выберите оснастку для печати индивидуального предпринимателя.',groups:['Автоматические печати','Карманные и ручные печати']},
'pechati-ooo':{title:'Печати для ООО',description:'Оснастки для печатей организаций.',groups:['Автоматические печати','Карманные и ручные печати']},
'pechati-vrachey':{title:'Печати для врачей',description:'Выберите оснастку. Текст и размер оттиска согласуются при заказе.',groups:['Автоматические печати','Карманные и ручные печати']},
'shtampy':{title:'Штампы',description:'Автоматические и ручные штампы, факсимиле.',groups:['Штампы']},
'osnastki':{title:'Оснастки и аксессуары',description:'Оснастки, краска и штемпельные подушки.',groups:['Автоматические печати','Карманные и ручные печати','Расходники']},
'individualnyy-maket':{title:'Индивидуальный макет',description:'Укажите текст, размеры и назначение оттиска. Стоимость согласуется отдельно.',groups:[]}
};
export const faqs=[['Какие данные нужны для заказа?','Укажите назначение печати и текст оттиска. Реквизиты и необходимые документы уточняются при согласовании.'],['Можно ли использовать готовый макет?','Макет можно использовать после проверки размера и качества. Загрузка файлов пока недоступна — опишите макет в комментарии.'],['Когда согласуется стоимость?','Стоимость, срок изготовления и макет согласуются до начала работ.'],['Как выбрать оснастку?','Автоматическая оснастка подходит для частого использования. Ручная печать требует отдельной подушки. Наличие конкретных моделей уточняется.'],['Есть ли доставка?','Возможность, стоимость и сроки доставки уточняются при согласовании заказа. Можно связаться с нами по телефону или электронной почте.'],['Как оплатить заказ?','Способ и порядок оплаты согласуем до начала изготовления. Оплата через сайт недоступна.'],['Можно ли заказать печать срочно?','Сообщите нужную дату при обращении. Возможность срочного изготовления печати или штампа уточняется после проверки макета и наличия оснастки.'],['Что такое факсимиле?','Факсимиле — оттиск, воспроизводящий образец подписи. Для изготовления согласуются размер, требования к образцу и тип оснастки.']];
export const origin=new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN||'https://brandbox.pages.dev').origin;
