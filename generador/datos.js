/* =========================================================
   CATÁLOGO SMESSENCE
   Fuente única de verdad del sitio. Al editar aquí y ejecutar
   "node generar.js" se reconstruyen fichas, secciones,
   packshots e índice de búsqueda.

   foto:   usa una imagen de imagenes/ (fotografía real)
   frasco: genera un packshot vectorial
   Si existe imagenes/productos/<id>.<ext>, esa foto manda
   sobre cualquiera de las dos.
   ========================================================= */

const PERFUMES = [
  {
    id: "212", nombre: "212 VIP Black", marca: "Carolina Herrera",
    genero: "m", tipo: "disenador", precio: 385000,
    familia: "Aromático fougère · Eau de Parfum",
    desc: [
      "La cara más nocturna de la línea 212. VIP Black abre con un contraste atrevido de absenta y anís que enseguida llama la atención, pensado para el hombre que marca el ritmo de la fiesta y no le pide permiso a nadie.",
      "El corazón aromático de lavanda se funde con un fondo de vainilla negra y almizcle que deja una estela envolvente, moderna y muy reconocible. Un imprescindible del armario nocturno."
    ],
    notas: { salida: "Absenta y anís", corazon: "Lavanda y acorde fougère de almizcle negro", fondo: "Vainilla negra y ámbar" },
    ocasion: "Fiestas, citas y planes de noche.",
    duracion: "Alta: 6 a 8 horas con estela moderada.",
    foto: "212.jpg"
  },
  {
    id: "asad", nombre: "Asad", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 145000,
    familia: "Ámbar amaderado especiado · Eau de Parfum",
    desc: [
      "Asad significa \"león\" en árabe, y la fragancia hace honor al nombre: pimienta negra, incienso y un toque de piña abren paso a un carácter fuerte y una presencia imponente desde el primer segundo.",
      "El corazón de café y tabaco se asienta sobre vainilla, ámbar y maderas ahumadas, creando una estela sofisticada que proyecta confianza y determinación durante todo el día."
    ],
    notas: { salida: "Pimienta negra, incienso y piña", corazon: "Café, tabaco y benjuí", fondo: "Vainilla, ámbar, pachulí y maderas ahumadas" },
    ocasion: "Noche, reuniones formales y momentos especiales.",
    duracion: "Muy alta: más de 8 horas con estela intensa.",
    foto: "asad.jpg"
  },
  {
    id: "clubdenuit", nombre: "Club de Nuit Intense Man", marca: "Armaf",
    genero: "m", tipo: "arabe", precio: 175000,
    familia: "Cítrico amaderado ahumado · Eau de Toilette",
    desc: [
      "Un clásico moderno de la perfumería árabe y uno de los perfumes con mejor relación calidad-precio del mundo. Abre con una explosión frutal de limón, piña, manzana y grosella negra que se siente fresca y lujosa a la vez.",
      "Su firma es el fondo ahumado de abedul sobre almizcle, ámbar gris y vainilla: elegante, potente y con una duración que sorprende a cualquiera que lo prueba por primera vez."
    ],
    notas: { salida: "Limón, piña, manzana, bergamota y grosella negra", corazon: "Abedul ahumado, rosa y jazmín", fondo: "Almizcle, ámbar gris y vainilla" },
    ocasion: "Uso diario, oficina y eventos: funciona en toda ocasión.",
    duracion: "Muy alta: 8 a 10 horas con proyección notable.",
    foto: "clubnuitintense.jpg"
  },
  {
    id: "incituselixir", nombre: "Invictus Victory Elixir", marca: "Rabanne",
    genero: "m", tipo: "disenador", precio: 520000,
    familia: "Ámbar especiado · Parfum Intense",
    desc: [
      "La versión más intensa del trofeo Invictus. El Elixir sube la apuesta con una salida vibrante de cardamomo y pimienta negra que anuncia una fragancia hecha para ganar.",
      "La lavanda del corazón se envuelve en un fondo denso de vainilla, benjuí y maderas ambaradas. Concentración parfum: pocas vaporizaciones bastan para dejar huella toda la noche."
    ],
    notas: { salida: "Cardamomo y pimienta negra", corazon: "Lavanda y geranio", fondo: "Vainilla, benjuí y maderas ambaradas" },
    ocasion: "Noche, clima fresco y ocasiones que exigen presencia.",
    duracion: "Extrema: 10+ horas, estela potente.",
    foto: "invictuselixir.jpg"
  },
  {
    id: "onemillion", nombre: "One Million", marca: "Rabanne",
    genero: "m", tipo: "disenador", precio: 425000,
    familia: "Cuero especiado · Eau de Toilette",
    desc: [
      "El lingote dorado que cambió la perfumería masculina moderna. One Million abre fresco y chispeante con pomelo, menta y mandarina roja, y enseguida revela su verdadero carácter: canela y especias sobre un fondo de cuero y ámbar.",
      "Provocador, dorado y absolutamente reconocible. Es el perfume del hombre que disfruta ser el centro de atención."
    ],
    notas: { salida: "Pomelo, menta y mandarina roja", corazon: "Canela, notas especiadas y rosa", fondo: "Cuero, ámbar, pachulí y maderas" },
    ocasion: "Fiestas, citas y salidas nocturnas.",
    duracion: "Alta: 6 a 8 horas.",
    foto: "onemillion.jpg"
  },
  {
    id: "amberoud", nombre: "Amber Oud Gold Edition", marca: "Al Haramain",
    genero: "m", tipo: "arabe", precio: 185000,
    familia: "Ámbar dulce oriental · Eau de Parfum",
    desc: [
      "Un abrazo dorado en formato perfume. Amber Oud Gold Edition abre con bergamota y frutas dulces que se derriten sobre un corazón cremoso de ámbar, en una de las composiciones dulces más queridas de la perfumería árabe.",
      "El fondo de vainilla, almizcle y maderas suaves lo hace tan cómodo como adictivo: dulce sin empalagar, lujoso sin esfuerzo. Unisex en la práctica, favorito en clima fresco."
    ],
    notas: { salida: "Bergamota y frutas dulces", corazon: "Ámbar cremoso y acorde goloso", fondo: "Vainilla, almizcle y maderas suaves" },
    ocasion: "Noches, planes en interiores y clima fresco.",
    duracion: "Muy alta: 8+ horas con estela dulce y cálida.",
    foto: "amberoud.jpg"
  },
  {
    id: "khamrah", nombre: "Khamrah", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 155000,
    familia: "Gourmand especiado · Eau de Parfum",
    desc: [
      "Khamrah es un festín especiado: canela y nuez moscada iluminadas por bergamota, sobre un corazón goloso de dátiles, praliné y tuberosa que recuerda a un postre árabe recién servido.",
      "Vainilla, haba tonka, benjuí y maderas cierran una fragancia cálida, envolvente y con un rendimiento sobresaliente. Unisex, comparte ADN con los grandes gourmand de lujo."
    ],
    notas: { salida: "Canela, nuez moscada y bergamota", corazon: "Dátiles, praliné y tuberosa", fondo: "Vainilla, haba tonka, benjuí, ámbar y maderas" },
    ocasion: "Noches frías, planes especiales y quien ama lo dulce.",
    duracion: "Muy alta: 8 a 12 horas.",
    foto: "khamrah.jpg"
  },
  {
    id: "diorsauvage", nombre: "Sauvage", marca: "Dior",
    genero: "m", tipo: "disenador", precio: 545000,
    familia: "Aromático fresco especiado · Eau de Toilette",
    desc: [
      "El masculino más vendido del mundo, inspirado en los grandes espacios abiertos. La bergamota de Calabria explota fresca y jugosa sobre un corazón vibrante de pimienta de Sichuan, lavanda y geranio.",
      "El ambroxan del fondo —mineral, adictivo, inconfundible— es la razón de su fama: una estela limpia y magnética que funciona igual de bien en la oficina que en una cita."
    ],
    notas: { salida: "Bergamota de Calabria y pimienta", corazon: "Pimienta de Sichuan, lavanda, geranio y elemi", fondo: "Ambroxan, cedro y labdanum" },
    ocasion: "Versátil total: día, oficina, noche y toda estación.",
    duracion: "Alta: 6 a 8 horas con excelente proyección.",
    foto: "diordsauvagetradicional.jpg"
  },
  {
    id: "creed", nombre: "Virgin Island Water", marca: "Creed",
    genero: "m", tipo: "nicho", precio: 1650000,
    familia: "Cítrico tropical · Eau de Parfum",
    desc: [
      "Unas vacaciones en el Caribe embotelladas por la casa Creed. Lima fresca, coco y bergamota recrean la brisa de las Islas Vírgenes, con un corazón floral de ylang-ylang y jazmín.",
      "El fondo de ron blanco y azúcar de caña sobre almizcle le da un final relajado y hedonista. Unisex, luminoso y perfecto para el calor: lujo en clave tropical."
    ],
    notas: { salida: "Lima, coco, bergamota y mandarina", corazon: "Ylang-ylang, jazmín y jengibre", fondo: "Ron blanco, azúcar de caña y almizcle" },
    ocasion: "Días soleados, vacaciones y clima cálido.",
    duracion: "Moderada: 5 a 7 horas, estela fresca y elegante.",
    foto: "creedvirginislanwater.jpg"
  },
  {
    id: "ultramale", nombre: "Ultra Male", marca: "Jean Paul Gaultier",
    genero: "m", tipo: "disenador", precio: 430000,
    familia: "Oriental fougère · Eau de Toilette Intense",
    desc: [
      "La versión más seductora del icónico marinero de Gaultier. Ultra Male abre con pera helada, menta y lavanda: un contraste frutal-fresco diseñado para atraer miradas de inmediato.",
      "Canela y clavo calientan el corazón antes de caer en un fondo de vainilla negra y ámbar. Es, para muchos, el perfume de conquista por excelencia de la última década."
    ],
    notas: { salida: "Pera helada, lavanda, menta y bergamota", corazon: "Canela, clavo y salvia", fondo: "Vainilla negra, ámbar y cedro" },
    ocasion: "Noche, citas y fiestas: hecho para seducir.",
    duracion: "Muy alta: 8+ horas con estela dulce potente.",
    foto: "jeanpaulgaultierultramale.jpg"
  },
  {
    id: "borninroma", nombre: "Uomo Born in Roma", marca: "Valentino",
    genero: "m", tipo: "disenador", precio: 415000,
    familia: "Amaderado especiado avainillado · Eau de Toilette",
    desc: [
      "La elegancia romana con actitud de calle. El frasco negro con tachuelas couture anticipa una fragancia moderna: jengibre y salvia en la salida, sobre un vetiver pulido y notas minerales.",
      "La vainilla bourbon del fondo, cremosa pero sobria, firma una estela urbana y sofisticada. Ideal para el hombre joven que viste bien sin aparentar esfuerzo."
    ],
    notas: { salida: "Jengibre y salvia", corazon: "Vetiver y notas minerales", fondo: "Vainilla bourbon y maderas" },
    ocasion: "Día a día con estilo, universidad, oficina y salidas.",
    duracion: "Alta: 6 a 8 horas.",
    foto: "romavaelntino.jpg"
  },
  {
    id: "cloudariana", nombre: "Cloud", marca: "Ariana Grande",
    genero: "f", tipo: "disenador", precio: 285000,
    familia: "Gourmand cremoso · Eau de Parfum",
    desc: [
      "Dormir sobre una nube de crema batida: así se siente Cloud. Lavanda, pera y bergamota abren paso a un corazón de coco, praliné y vainilla que se volvió fenómeno mundial.",
      "Su fondo de almizcles y maderas cremosas deja una piel dulce, acogedora y limpia. Es el gourmand cómodo por excelencia: adictivo sin resultar pesado."
    ],
    notas: { salida: "Lavanda, pera y bergamota", corazon: "Crema batida, coco, praliné y vainilla", fondo: "Almizcles y maderas cremosas" },
    ocasion: "Uso diario, estudio y planes casuales.",
    duracion: "Alta: 6 a 8 horas pegado a la piel.",
    foto: "cloudariana.jpg"
  },
  {
    id: "thankunext", nombre: "Thank U Next", marca: "Ariana Grande",
    genero: "f", tipo: "disenador", precio: 265000,
    familia: "Frutal gourmand · Eau de Parfum",
    desc: [
      "Dulce, descarado y con mucha personalidad, como la canción que lo inspiró. Pera blanca y frambuesa jugosa abren una composición golosa de coco cremoso y pétalos de rosa.",
      "El macarrón del fondo, sobre almizcle suave, deja una estela de postre francés juguetona y juvenil. Perfecto para quien quiere oler dulce y diferente."
    ],
    notas: { salida: "Pera blanca y frambuesa", corazon: "Coco cremoso y pétalos de rosa", fondo: "Macarrón y almizcle" },
    ocasion: "Día a día, universidad y salidas con amigas.",
    duracion: "Buena: 5 a 7 horas.",
    foto: "thankunext.jpg"
  },
  {
    id: "yara", nombre: "Yara", marca: "Lattafa",
    genero: "f", tipo: "arabe", precio: 150000,
    familia: "Floral gourmand · Eau de Parfum",
    desc: [
      "El fenómeno rosado de Lattafa. Yara envuelve desde el inicio con orquídea, heliotropo y mandarina, un comienzo empolvado y dulce que se siente como terciopelo.",
      "Su corazón goloso y afrutado desciende a un fondo cremoso de vainilla, almizcle y sándalo. Femenino, tierno y con un rendimiento que rivaliza con perfumes de diseñador."
    ],
    notas: { salida: "Orquídea, heliotropo y mandarina", corazon: "Acorde goloso afrutado y gardenia", fondo: "Vainilla, almizcle y sándalo" },
    ocasion: "Todos los días: dulce, cómodo y muy halagado.",
    duracion: "Muy alta: 8+ horas.",
    foto: "yara.jpg"
  },
  {
    id: "scandal", nombre: "Scandal", marca: "Jean Paul Gaultier",
    genero: "f", tipo: "disenador", precio: 470000,
    familia: "Chipre de miel · Eau de Parfum",
    desc: [
      "El escándalo más elegante de París. Naranja sanguina y mandarina iluminan una composición cuyo corazón es pura miel dorada, acompañada de gardenia y jazmín.",
      "Cera de abejas, caramelo y pachulí construyen un fondo sensual y sofisticado. Scandal demuestra que se puede ser dulce y tener carácter al mismo tiempo."
    ],
    notas: { salida: "Naranja sanguina y mandarina", corazon: "Miel, gardenia y jazmín", fondo: "Cera de abejas, caramelo y pachulí" },
    ocasion: "Oficina de día, cenas y eventos de noche.",
    duracion: "Alta: 7 a 9 horas.",
    foto: "scandaljeanpaul.jpg"
  },
  {
    id: "moschinotoy", nombre: "Toy 2", marca: "Moschino",
    genero: "f", tipo: "disenador", precio: 340000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "El osito transparente más famoso de la perfumería. Toy 2 abre chispeante con manzana verde, mandarina y magnolia, fresca como una mañana de primavera.",
      "Peonía, jazmín y rosa blanca en el corazón, con un fondo limpio de almizcle, sándalo y maderas ámbar. Juvenil, luminoso y tan coleccionable como su frasco."
    ],
    notas: { salida: "Manzana verde, mandarina y magnolia", corazon: "Peonía, jazmín y rosa blanca", fondo: "Almizcle, sándalo y maderas ámbar" },
    ocasion: "Día, oficina y primavera-verano.",
    duracion: "Buena: 5 a 7 horas.",
    foto: "moschinotoy2.jpg"
  },
  {
    id: "moschinofresh", nombre: "Pink Fresh Couture", marca: "Moschino",
    genero: "f", tipo: "disenador", precio: 295000,
    familia: "Floral frutal fresco · Eau de Toilette",
    desc: [
      "Alta costura con humor pop: el icónico frasco de \"limpiavidrios\" rosa esconde una fragancia fresca y despreocupada. Pomelo, mandarina y casis abren con energía cítrica.",
      "El corazón de peonía, rosa y lirio de los valles descansa sobre almizcle y madera de cachemira. Ligero, divertido y perfecto para el calor."
    ],
    notas: { salida: "Pomelo, mandarina y casis", corazon: "Peonía, rosa y lirio de los valles", fondo: "Almizcle, madera de cachemira y ámbar" },
    ocasion: "Días calurosos, plan diario y deporte.",
    duracion: "Moderada: 4 a 6 horas, ideal para retocar.",
    foto: "moschinofreshpink.jpg"
  },
  {
    id: "lavieest", nombre: "La Vie Est Belle", marca: "Lancôme",
    genero: "f", tipo: "disenador", precio: 590000,
    familia: "Iris gourmand · Eau de Parfum",
    desc: [
      "\"La vida es bella\": una declaración de felicidad convertida en perfume. Grosella negra y pera abren camino al corazón noble de iris, jazmín y flor de azahar.",
      "El fondo de praliné, vainilla y pachulí firma una de las estelas más reconocibles y halagadas de la perfumería femenina. Elegante, dulce y atemporal."
    ],
    notas: { salida: "Grosella negra y pera", corazon: "Iris, jazmín y flor de azahar", fondo: "Praliné, vainilla, haba tonka y pachulí" },
    ocasion: "Toda ocasión: del día a la gala.",
    duracion: "Muy alta: 8+ horas.",
    foto: "lavieestbelledelancome.jpg"
  },
  {
    id: "verygoodgirl", nombre: "Very Good Girl", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 520000,
    familia: "Frutal avainillado · Eau de Parfum",
    desc: [
      "El tacón rojo de Carolina Herrera: la energía de Good Girl en clave frutal. Frambuesa y grosella roja abren vibrantes, jugosas y llenas de actitud.",
      "La rosa y el lichi del corazón se funden con vainilla y vetiver en el fondo, dejando una estela chic con un punto rebelde. Para chicas buenas… con carácter."
    ],
    notas: { salida: "Frambuesa y grosella roja", corazon: "Rosa y lichi", fondo: "Vainilla y vetiver" },
    ocasion: "Citas, salidas nocturnas y días con actitud.",
    duracion: "Alta: 6 a 8 horas.",
    foto: "goodgirlverygoodgirlCH.jpg"
  },
  {
    id: "goodgirl", nombre: "Good Girl", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 545000,
    familia: "Floral oriental · Eau de Parfum",
    desc: [
      "El stiletto azul que se convirtió en icono. Good Girl juega con la dualidad: la luz de la almendra, el café y el azahar frente a la oscuridad del haba tonka y el cacao.",
      "Los nardos y el jazmín sambac le dan un corazón floral opulento. Es sofisticado, sensual y nocturno: \"es tan bueno ser mala\"."
    ],
    notas: { salida: "Almendra, café y limón", corazon: "Nardos, jazmín sambac y azahar", fondo: "Haba tonka, cacao, vainilla y sándalo" },
    ocasion: "Noche, eventos y ocasiones elegantes.",
    duracion: "Muy alta: 8+ horas.",
    foto: "goodgirlCH.jpg"
  },
  {
    id: "olympea", nombre: "Olympéa", marca: "Paco Rabanne",
    genero: "f", tipo: "disenador", precio: 495000,
    familia: "Oriental floral salado · Eau de Parfum",
    desc: [
      "La diosa moderna de Paco Rabanne. Olympéa rompió esquemas con su acorde de vainilla salada: un contraste dulce-salado que la hace inmediatamente reconocible.",
      "Mandarina verde y jazmín acuático dan frescura a la salida, mientras la madera de cachemira, el ámbar gris y el sándalo sostienen un fondo cálido y magnético."
    ],
    notas: { salida: "Mandarina verde, jazmín acuático y jengibre", corazon: "Vainilla salada", fondo: "Madera de cachemira, ámbar gris y sándalo" },
    ocasion: "Noche, cenas y ocasiones que piden presencia.",
    duracion: "Alta: 7 a 9 horas.",
    foto: "Olympeadepacorabanne.jpg"
  },
  {
    id: "goodgirlblush", nombre: "Good Girl Blush", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 530000,
    familia: "Floral avainillado · Eau de Parfum",
    desc: [
      "El tacón se viste de rosa. Blush es la versión más luminosa y romántica de Good Girl: peonía y mandarina abren un ramo fresco y empolvado que enamora al instante.",
      "El ylang-ylang y la rosa búlgara se posan sobre una vainilla cremosa y almizcles suaves. Femenina, delicada y perfecta para el día sin perder elegancia."
    ],
    notas: { salida: "Mandarina y peonía", corazon: "Ylang-ylang y rosa búlgara", fondo: "Vainilla cremosa y almizcle" },
    ocasion: "Día, oficina, brunch y primavera.",
    duracion: "Alta: 6 a 8 horas.",
    foto: "goodgirlblushCH.jpg"
  },
  {
    id: "coco", nombre: "Coco Mademoiselle", marca: "Chanel",
    genero: "f", tipo: "disenador", precio: 685000,
    familia: "Chipre floral · Eau de Parfum",
    desc: [
      "El espíritu libre de Gabrielle Chanel en un perfume. La chispa cítrica de naranja y bergamota da paso a un corazón de rosa, jazmín y lichi de elegancia inconfundible.",
      "El pachulí y el vetiver del fondo, suavizados con vainilla y almizcle blanco, firman una estela parisina, pulida y atemporal. Un imprescindible de colección."
    ],
    notas: { salida: "Naranja, mandarina y bergamota", corazon: "Rosa, jazmín y lichi", fondo: "Pachulí, vetiver, vainilla y almizcle blanco" },
    ocasion: "Toda ocasión que merezca elegancia.",
    duracion: "Muy alta: 8+ horas.",
    foto: "cocoMademoiselledechanel.jpg"
  },
  {
    id: "ansaab", nombre: "Ansaab", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 135000, destacado: true,
    familia: "Amaderado aromático · Eau de Parfum",
    desc: [
      "Ansaab traduce el linaje en fragancia: abre con un golpe verde de albahaca y bergamota que despeja el ambiente, sin perder un fondo serio.",
      "La lavanda y el geranio dan estructura clásica antes de caer en pachulí, ámbar y musgo. Elegancia sobria de oficina, con la potencia que caracteriza a Lattafa."
    ],
    notas: { salida: "Albahaca, bergamota y limón", corazon: "Lavanda, geranio y jazmín", fondo: "Pachulí, ámbar, musgo y vetiver" },
    ocasion: "Oficina, día a día y reuniones de trabajo.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#1D3A5C", vidrio2: "#0C1D30", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "fakhar-black", nombre: "Fakhar Black", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 140000,
    familia: "Aromático fougère · Eau de Parfum",
    desc: [
      "La respuesta árabe a los grandes fougère de diseñador. Fakhar Black arranca fresco con manzana y bergamota, limpio y muy vestible.",
      "El corazón de lavanda y nuez moscada aterriza en haba tonka, vainilla y maderas. Huele caro, rinde muchísimo y funciona todo el año."
    ],
    notas: { salida: "Manzana, bergamota y pimienta rosa", corazon: "Lavanda, nuez moscada y flor de azahar", fondo: "Haba tonka, vainilla, cedro y almizcle" },
    ocasion: "Versátil: oficina de día, salidas de noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#23272C", vidrio2: "#0D0F12", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "oud-for-glory", nombre: "Bade'e Al Oud Oud for Glory", marca: "Lattafa",
    genero: "u", tipo: "arabe", precio: 175000, destacado: true,
    familia: "Oud azafranado · Eau de Parfum",
    desc: [
      "El clon más celebrado de los grandes oud de nicho. Abre con un azafrán rojo intenso y nuez moscada que anuncia opulencia inmediata.",
      "El corazón de oud y pachulí se sostiene sobre cuero, ámbar y maderas. Estela enorme, profunda y adictiva: pocas vaporizaciones bastan."
    ],
    notas: { salida: "Azafrán, nuez moscada y notas especiadas", corazon: "Oud, pachulí y madera de gaiac", fondo: "Cuero, ámbar, almizcle y maderas" },
    ocasion: "Noche, clima frío y ocasiones de gala.",
    duracion: "Extrema: 10 a 14 horas.",
    frasco: { forma: "cofre", vidrio: "#1A1A1C", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "raghba", nombre: "Raghba", marca: "Lattafa",
    genero: "u", tipo: "arabe", precio: 115000,
    familia: "Vainilla ahumada oriental · Eau de Parfum",
    desc: [
      "Un clásico de culto: vainilla densa envuelta en incienso y madera de oud. Raghba huele a bakhoor recién encendido en una casa cálida.",
      "Dulce sin ser infantil, con un humo elegante que lo vuelve inconfundible. La relación calidad-precio que hizo famosa a Lattafa."
    ],
    notas: { salida: "Vainilla y notas dulces", corazon: "Incienso, oud y especias", fondo: "Sándalo, almizcle y ámbar" },
    ocasion: "Noches frías, planes en interiores.",
    duracion: "Muy alta: 8 a 12 horas.",
    frasco: { forma: "flacon", vidrio: "#6B4423", vidrio2: "#38210F", tapa: "oro", acento: "#D9C9AC" }
  },
  {
    id: "ana-abiyedh-rouge", nombre: "Ana Abiyedh Rouge", marca: "Lattafa",
    genero: "u", tipo: "arabe", precio: 135000,
    familia: "Amaderado especiado · Eau de Parfum",
    desc: [
      "Minimalista por fuera, complejo por dentro. Abre con azafrán y cardamomo sobre una base cremosa de sándalo blanco.",
      "El acorde de cuero suave y ámbar lo hace sofisticado y unisex, con un aire de perfumería de nicho que desmiente su precio."
    ],
    notas: { salida: "Azafrán, cardamomo y pimienta", corazon: "Sándalo blanco y rosa", fondo: "Cuero, ámbar y almizcle" },
    ocasion: "Uso diario elegante, oficina y cenas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#F5F1E8", vidrio2: "#DCD3C2", tapa: "rojo", acento: "#B23A3A" }
  },
  {
    id: "eclaire", nombre: "Eclaire", marca: "Lattafa",
    genero: "f", tipo: "arabe", precio: 150000,
    familia: "Gourmand frutal · Eau de Parfum",
    desc: [
      "Un postre de pastelería en frasco. Eclaire abre con frambuesa y bergamota jugosas que dan paso a un corazón cremoso de crema batida y flor de azahar.",
      "El fondo de vainilla, caramelo y almizcle deja una piel dulce y luminosa. Coqueto, moderno y muy halagado."
    ],
    notas: { salida: "Frambuesa, bergamota y grosella", corazon: "Crema batida, flor de azahar y jazmín", fondo: "Vainilla, caramelo, haba tonka y almizcle" },
    ocasion: "Día, universidad y salidas informales.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "flacon", vidrio: "#F4C2D0", vidrio2: "#D98BA6", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "yara-moi", nombre: "Yara Moi", marca: "Lattafa",
    genero: "f", tipo: "arabe", precio: 150000,
    familia: "Floral gourmand · Eau de Parfum",
    desc: [
      "La hermana más floral de la familia Yara. Moi abre con pera y bergamota frescas antes de abrirse en un corazón de jazmín y flor de naranjo.",
      "La vainilla y el almizcle del fondo mantienen la firma cremosa de la casa, pero con un acabado más aireado y primaveral."
    ],
    notas: { salida: "Pera, bergamota y frutas rojas", corazon: "Jazmín, flor de naranjo y heliotropo", fondo: "Vainilla, almizcle y maderas suaves" },
    ocasion: "Día, primavera y uso frecuente.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "gota", vidrio: "#C9B6E4", vidrio2: "#9A7FC4", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "yara-tous", nombre: "Yara Tous", marca: "Lattafa",
    genero: "f", tipo: "arabe", precio: 150000,
    familia: "Frutal cremoso · Eau de Parfum",
    desc: [
      "La versión tropical de Yara: piña y coco abren radiantes sobre un corazón de gardenia y frutas blancas.",
      "El fondo de vainilla y sándalo aporta la cremosidad característica de la línea. Vacaciones en la piel, todo el año."
    ],
    notas: { salida: "Piña, coco y mandarina", corazon: "Gardenia, jazmín y frutas blancas", fondo: "Vainilla, sándalo y almizcle" },
    ocasion: "Clima cálido, playa y días soleados.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "gota", vidrio: "#8ED3D3", vidrio2: "#4A9FA8", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "ramz-gold", nombre: "Ramz Gold", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 140000,
    familia: "Amaderado ambarado · Eau de Parfum",
    desc: [
      "Oro puro en presentación y en aroma. Ramz Gold abre cítrico y especiado, con un jengibre chispeante que lo mantiene fresco.",
      "El corazón de lavanda y madera de gaiac cae en ámbar, tonka y cedro. Refinado, cálido y perfecto para vestir formal."
    ],
    notas: { salida: "Bergamota, jengibre y pimienta", corazon: "Lavanda, madera de gaiac y salvia", fondo: "Ámbar, haba tonka, cedro y almizcle" },
    ocasion: "Eventos formales, cenas y noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "torre", vidrio: "#D4AF62", vidrio2: "#96702C", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "qaed-al-fursan", nombre: "Qaed Al Fursan", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 145000,
    familia: "Frutal amaderado · Eau de Parfum",
    desc: [
      "\"El líder de los caballeros\" abre con una piña y una manzana brillantes, muy en la línea de los grandes frutales de lujo.",
      "El corazón de rosa y abedul ahumado sobre almizcle y ámbar gris le da un acabado señorial. Uno de los mejores rendimientos del catálogo."
    ],
    notas: { salida: "Piña, manzana, bergamota y limón", corazon: "Rosa, jazmín y abedul ahumado", fondo: "Almizcle, ámbar gris, vainilla y pachulí" },
    ocasion: "Toda ocasión: oficina, eventos y noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#243B6B", vidrio2: "#111F3E", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "club-nuit-woman", nombre: "Club de Nuit Woman", marca: "Armaf",
    genero: "f", tipo: "arabe", precio: 165000,
    familia: "Chipre frutal · Eau de Parfum",
    desc: [
      "La contraparte femenina del icónico Club de Nuit. Abre con piña, grosella negra y bergamota, chispeante y elegante.",
      "Rosa y jazmín construyen el corazón, mientras el pachulí y el almizcle blanco firman un fondo chipre limpio y sofisticado."
    ],
    notas: { salida: "Piña, grosella negra y bergamota", corazon: "Rosa, jazmín y lirio de los valles", fondo: "Pachulí, almizcle blanco y ámbar" },
    ocasion: "Oficina, cenas y uso diario elegante.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#FAF7F1", vidrio2: "#DED5C4", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "afnan-9pm", nombre: "9PM", marca: "Afnan",
    genero: "m", tipo: "arabe", precio: 185000, destacado: true,
    familia: "Ámbar dulce · Eau de Parfum",
    desc: [
      "El perfume que conquistó las noches con una relación calidad-precio insuperable. Abre con manzana y lavanda, dulce y muy invitador.",
      "Canela y vainilla calientan el corazón antes de un fondo de haba tonka y ámbar. Comparado sin descanso con perfumes cuatro veces más caros."
    ],
    notas: { salida: "Manzana, lavanda y bergamota", corazon: "Canela, azafrán y vainilla", fondo: "Haba tonka, ámbar, benjuí y almizcle" },
    ocasion: "Noche, citas y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#1B1B1F", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "supremacy-intense", nombre: "Supremacy Not Only Intense", marca: "Afnan",
    genero: "m", tipo: "arabe", precio: 195000,
    familia: "Amaderado especiado · Extrait de Parfum",
    desc: [
      "Concentración extrait y actitud de vestíbulo de hotel de lujo. Abre con pimienta y bergamota, seco y punzante.",
      "El corazón amaderado de vetiver y gaiac se asienta en ámbar y almizcle. Serio, masculino y con una proyección que llena habitaciones."
    ],
    notas: { salida: "Pimienta negra, bergamota y cardamomo", corazon: "Vetiver, madera de gaiac y lavanda", fondo: "Ámbar, almizcle, cedro y pachulí" },
    ocasion: "Noche, eventos y clima frío.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "torre", vidrio: "#8E1F26", vidrio2: "#4A0D12", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "amber-oud-rouge", nombre: "Amber Oud Rouge Edition", marca: "Al Haramain",
    genero: "u", tipo: "arabe", precio: 190000,
    familia: "Ámbar frutal oud · Eau de Parfum",
    desc: [
      "La edición más golosa de la aclamada línea Amber Oud. Frutas rojas y bergamota abren jugosas y brillantes.",
      "El ámbar cremoso del corazón se funde con oud, vainilla y almizcle en un fondo denso y envolvente. Unisex y de rendimiento descomunal."
    ],
    notas: { salida: "Frutas rojas, bergamota y manzana", corazon: "Ámbar cremoso y acorde goloso", fondo: "Oud, vainilla, almizcle y maderas" },
    ocasion: "Noche, clima fresco y planes especiales.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "cofre", vidrio: "#A32232", vidrio2: "#5C0E19", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "hawas", nombre: "Hawas for Him", marca: "Rasasi",
    genero: "m", tipo: "arabe", precio: 225000, destacado: true,
    familia: "Fresco acuático afrutado · Eau de Parfum",
    desc: [
      "El fresco árabe más elogiado, comparado sin descanso con Aventus. Abre con manzana, canela y bergamota vibrantes.",
      "Notas acuáticas y jazmín construyen un corazón limpio, y el fondo de ámbar gris, almizcle y maderas lo hace magnético en clima cálido."
    ],
    notas: { salida: "Manzana, canela, bergamota y limón", corazon: "Notas acuáticas, jazmín y flor de azahar", fondo: "Ámbar gris, almizcle, cedro y vainilla" },
    ocasion: "Día, verano, oficina y deporte social.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#2E6FA8", vidrio2: "#123B63", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "la-yuqawam", nombre: "La Yuqawam", marca: "Rasasi",
    genero: "m", tipo: "arabe", precio: 265000,
    familia: "Cuero frutal · Eau de Parfum",
    desc: [
      "\"Irresistible\" en árabe, y el nombre no exagera. Piña y frutas maduras abren sobre un cuero pulido de gran calidad.",
      "El fondo de ámbar, pachulí y maderas nobles lo convierte en un perfume de firma para hombres que buscan algo distinto y señorial."
    ],
    notas: { salida: "Piña, frutas maduras y bergamota", corazon: "Cuero, rosa y azafrán", fondo: "Ámbar, pachulí, sándalo y almizcle" },
    ocasion: "Noche, eventos y ocasiones especiales.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "urna", vidrio: "#7A4B2A", vidrio2: "#3F2413", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "jean-lowe-immortal", nombre: "Jean Lowe Immortal", marca: "Maison Alhambra",
    genero: "m", tipo: "arabe", precio: 130000,
    familia: "Amaderado avainillado · Eau de Parfum",
    desc: [
      "Frasco mate impecable y un aroma que juega en la liga de los grandes elixires de diseñador. Abre con cardamomo y pimienta.",
      "La lavanda del corazón se hunde en vainilla, regaliz y maderas ambaradas. Dulce, oscuro y muy nocturno."
    ],
    notas: { salida: "Cardamomo, pimienta y bergamota", corazon: "Lavanda, regaliz y geranio", fondo: "Vainilla, ámbar, benjuí y maderas" },
    ocasion: "Noche, clima frío y citas.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#2A2E33", vidrio2: "#141619", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "kismet", nombre: "Kismet", marca: "Maison Alhambra",
    genero: "f", tipo: "arabe", precio: 125000,
    familia: "Floral dulce · Eau de Parfum",
    desc: [
      "Delicado y romántico, Kismet abre con pera y bergamota sobre un corazón de peonía y rosa empolvada.",
      "El fondo de vainilla, almizcle y maderas blancas lo mantiene suave y cercano: un perfume de piel para todos los días."
    ],
    notas: { salida: "Pera, bergamota y mandarina", corazon: "Peonía, rosa y jazmín", fondo: "Vainilla, almizcle y maderas blancas" },
    ocasion: "Día, oficina y uso frecuente.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "flacon", vidrio: "#F2CBD6", vidrio2: "#D194AB", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "eros", nombre: "Eros", marca: "Versace",
    genero: "m", tipo: "disenador", precio: 355000, destacado: true,
    familia: "Aromático fougère · Eau de Toilette",
    desc: [
      "El dios del amor en frasco azul y oro. Eros abre con una explosión de menta, manzana verde y limón que resulta adictiva desde el primer segundo.",
      "El corazón de haba tonka, geranio y ambroxan cae en vainilla, cedro y vetiver. Seducción mediterránea directa, sin rodeos."
    ],
    notas: { salida: "Menta, manzana verde y limón", corazon: "Haba tonka, geranio y ambroxan", fondo: "Vainilla, cedro, vetiver y musgo de roble" },
    ocasion: "Citas, fiestas y salidas nocturnas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#2E7D6E", vidrio2: "#0F3D34", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "eros-flame", nombre: "Eros Flame", marca: "Versace",
    genero: "m", tipo: "disenador", precio: 395000,
    familia: "Amaderado especiado · Eau de Parfum",
    desc: [
      "La versión cálida y madura de Eros. Limón italiano y mandarina abren luminosos sobre un corazón de pimienta negra y romero.",
      "La vainilla, el sándalo y el pachulí del fondo lo hacen más otoñal y sofisticado que el original. Menos fiesta, más cena elegante."
    ],
    notas: { salida: "Limón italiano, mandarina y pomelo", corazon: "Pimienta negra, romero y geranio", fondo: "Vainilla, sándalo, pachulí y haba tonka" },
    ocasion: "Cenas, otoño-invierno y planes elegantes.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "torre", vidrio: "#B8342B", vidrio2: "#6B1410", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "bleu-chanel", nombre: "Bleu de Chanel", marca: "Chanel",
    genero: "m", tipo: "disenador", precio: 655000, destacado: true,
    familia: "Amaderado aromático · Eau de Parfum",
    desc: [
      "La definición moderna de elegancia masculina. Cítricos brillantes y menta abren con una limpieza impecable.",
      "El incienso, el jengibre y el pomelo del corazón dan carácter, y el sándalo con cedro firma un fondo sobrio. Funciona en absolutamente toda ocasión."
    ],
    notas: { salida: "Limón, menta, pomelo y bergamota", corazon: "Jengibre, nuez moscada, jazmín e incienso", fondo: "Sándalo, cedro, ámbar y pachulí" },
    ocasion: "Universal: oficina, cita, boda o viaje.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#1B2A44", vidrio2: "#0A1220", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "sauvage-elixir", nombre: "Sauvage Elixir", marca: "Dior",
    genero: "m", tipo: "disenador", precio: 720000, destacado: true,
    familia: "Amaderado especiado · Elixir",
    desc: [
      "La concentración más densa y opulenta de la casa Dior. Canela, nuez moscada y cardamomo abren con una intensidad casi licorosa.",
      "La lavanda del corazón se asienta en regaliz, sándalo y pachulí. Un elixir de proyección brutal: dos vaporizaciones son suficientes."
    ],
    notas: { salida: "Canela, nuez moscada, cardamomo y pomelo", corazon: "Lavanda y esencias especiadas", fondo: "Regaliz, sándalo, pachulí y haba tonka" },
    ocasion: "Noche, invierno y ocasiones de impacto.",
    duracion: "Extrema: 10 a 14 horas.",
    frasco: { forma: "rect", vidrio: "#7A1D2E", vidrio2: "#3D0A16", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "dior-homme-intense", nombre: "Dior Homme Intense", marca: "Dior",
    genero: "m", tipo: "disenador", precio: 615000,
    familia: "Iris amaderado · Eau de Parfum",
    desc: [
      "Uno de los perfumes masculinos más elegantes jamás creados. El iris empolvado, cremoso y noble domina la composición de principio a fin.",
      "La lavanda, el ámbar y el vetiver le dan una sofisticación de traje a medida. Refinado, sensual y absolutamente atemporal."
    ],
    notas: { salida: "Lavanda y bergamota", corazon: "Iris empolvado, ambreta y pera", fondo: "Vetiver, ámbar, cacao y almizcle" },
    ocasion: "Eventos formales, cenas y bodas.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#4A4F55", vidrio2: "#22262A", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "le-male-le-parfum", nombre: "Le Male Le Parfum", marca: "Jean Paul Gaultier",
    genero: "m", tipo: "disenador", precio: 470000,
    familia: "Oriental avainillado · Eau de Parfum Intense",
    desc: [
      "El marinero más icónico, en su versión más rica y adictiva. Cardamomo fresco abre paso a una lavanda cremosa y aterciopelada.",
      "La vainilla bourbon del fondo, envuelta en haba tonka y benjuí, lo convierte en un imán de cumplidos en clima frío."
    ],
    notas: { salida: "Cardamomo y bergamota", corazon: "Lavanda cremosa e iris", fondo: "Vainilla bourbon, haba tonka y benjuí" },
    ocasion: "Noche, invierno y citas.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "busto", vidrio: "#1E3A63", vidrio2: "#0B1B33", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "phantom", nombre: "Phantom", marca: "Rabanne",
    genero: "m", tipo: "disenador", precio: 415000,
    familia: "Aromático fresco · Eau de Toilette",
    desc: [
      "El robot más famoso de la perfumería moderna. Abre con un limón chispeante y lavanda que resultan inmediatamente limpios y frescos.",
      "El corazón de vetiver y salvia se asienta en vainilla y pachulí. Fresco pero cálido: un perfume de uso diario prácticamente infalible."
    ],
    notas: { salida: "Limón, lavanda y salvia", corazon: "Vetiver y notas amaderadas", fondo: "Vainilla, pachulí y almizcle" },
    ocasion: "Día a día, oficina y planes casuales.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "robot", vidrio: "#E8E4DC", vidrio2: "#B9B2A6", tapa: "plata", acento: "#8E949A" }
  },
  {
    id: "invictus", nombre: "Invictus", marca: "Rabanne",
    genero: "m", tipo: "disenador", precio: 355000,
    familia: "Acuático amaderado · Eau de Toilette",
    desc: [
      "El trofeo del vencedor. Pomelo y mandarina abren con una frescura marina que se volvió firma de toda una generación.",
      "El acorde acuático y la hoja de laurel del corazón caen en ámbar gris, guayaco y pachulí. Deportivo, limpio y siempre halagado."
    ],
    notas: { salida: "Pomelo, mandarina y notas marinas", corazon: "Hoja de laurel, jazmín y ámbar gris", fondo: "Guayaco, pachulí, musgo de roble y ambroxan" },
    ocasion: "Día, deporte, verano y oficina.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "trofeo", vidrio: "#D8DCE0", vidrio2: "#9AA1A8", tapa: "plata", acento: "#7E858C" }
  },
  {
    id: "acqua-profumo", nombre: "Acqua di Giò Profumo", marca: "Giorgio Armani",
    genero: "m", tipo: "disenador", precio: 560000,
    familia: "Acuático amaderado · Parfum",
    desc: [
      "La versión oscura y elegante del clásico mediterráneo. Bergamota y notas marinas abren frescas, pero con más cuerpo que el original.",
      "El incienso del corazón es la firma: mineral, ahumado y sofisticado, sobre pachulí y salvia. Un fresco para adultos."
    ],
    notas: { salida: "Bergamota, notas marinas y mandarina", corazon: "Incienso, geranio y salvia", fondo: "Pachulí y maderas" },
    ocasion: "Oficina, cenas y todo el año.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "torre", vidrio: "#23262B", vidrio2: "#0E1013", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "ysl-y-edp", nombre: "Y Eau de Parfum", marca: "Yves Saint Laurent",
    genero: "m", tipo: "disenador", precio: 495000,
    familia: "Aromático amaderado · Eau de Parfum",
    desc: [
      "El blanco y negro más moderno del armario masculino. Manzana y jengibre abren nítidos y contemporáneos.",
      "La salvia y la lavanda del corazón se apoyan en un fondo de haba tonka, cedro y ambroxan. Limpio, elegante y muy joven."
    ],
    notas: { salida: "Manzana, jengibre y bergamota", corazon: "Salvia, lavanda y geranio", fondo: "Haba tonka, cedro, vetiver y ambroxan" },
    ocasion: "Día, oficina, universidad y citas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#FAF7F1", vidrio2: "#CFC8BC", tapa: "negro", acento: "#23272C" }
  },
  {
    id: "la-nuit-homme", nombre: "La Nuit de L'Homme", marca: "Yves Saint Laurent",
    genero: "m", tipo: "disenador", precio: 455000,
    familia: "Amaderado especiado · Eau de Toilette",
    desc: [
      "Uno de los grandes seductores de la perfumería. El cardamomo abre especiado y suave, sin ninguna aspereza.",
      "La lavanda y el cedro del corazón se funden con vetiver y haba tonka. Discreto, cercano y letal en distancias cortas."
    ],
    notas: { salida: "Cardamomo y bergamota", corazon: "Lavanda, cedro virginiano y bergamota", fondo: "Vetiver, haba tonka y caoba" },
    ocasion: "Citas, cenas y noche.",
    duracion: "Moderada-alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#1A1C1F", vidrio2: "#000000", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "most-wanted", nombre: "The Most Wanted Parfum", marca: "Azzaro",
    genero: "m", tipo: "disenador", precio: 420000,
    familia: "Ámbar especiado · Parfum",
    desc: [
      "Un perfume construido alrededor del jengibre y el ámbar líquido: cálido, dulce y con una proyección inmediata.",
      "La haba tonka y el bourbon del fondo lo vuelven goloso y adictivo. Diseñado para la noche y para dejar rastro."
    ],
    notas: { salida: "Jengibre, cardamomo y bergamota", corazon: "Ámbar líquido y madera de gaiac", fondo: "Haba tonka, vainilla bourbon y almizcle" },
    ocasion: "Noche, fiestas y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "torre", vidrio: "#26282C", vidrio2: "#0F1114", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "luna-rossa-carbon", nombre: "Luna Rossa Carbon", marca: "Prada",
    genero: "m", tipo: "disenador", precio: 445000,
    familia: "Aromático metálico · Eau de Toilette",
    desc: [
      "Elegancia técnica de regata. Un acorde metálico único y bergamota abren con una limpieza inconfundible.",
      "La lavanda del corazón y el pachulí con ambroxan del fondo lo convierten en uno de los frescos más sofisticados del mercado."
    ],
    notas: { salida: "Bergamota y acorde metálico", corazon: "Lavanda y pimienta", fondo: "Pachulí, ambroxan y carbón" },
    ocasion: "Oficina, día y clima templado.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#5A6068", vidrio2: "#292D32", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "bad-boy", nombre: "Bad Boy", marca: "Carolina Herrera",
    genero: "m", tipo: "disenador", precio: 465000,
    familia: "Amaderado especiado · Eau de Toilette",
    desc: [
      "El rayo negro que responde al tacón de Good Girl. Pimienta blanca y bergamota abren afiladas y modernas.",
      "Salvia y cedro estructuran el corazón, mientras el cacao y la haba tonka del fondo le dan un lado goloso e irresistible."
    ],
    notas: { salida: "Pimienta blanca, pimienta negra y bergamota", corazon: "Salvia, cedro y ambroxan", fondo: "Cacao, haba tonka y ámbar" },
    ocasion: "Noche, citas y salidas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rayo", vidrio: "#1C1E22", vidrio2: "#000000", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "idole", nombre: "Idôle", marca: "Lancôme",
    genero: "f", tipo: "disenador", precio: 510000, destacado: true,
    familia: "Chipre floral rosado · Eau de Parfum",
    desc: [
      "El frasco más delgado de la perfumería moderna guarda una rosa limpia y luminosa, pensada para una generación nueva.",
      "El jazmín y la pera dan frescura, y el acorde de almizcle blanco con vainilla y pachulí firma una estela pulida y radiante."
    ],
    notas: { salida: "Pera, bergamota y grosella negra", corazon: "Rosa, jazmín y peonía", fondo: "Almizcle blanco, vainilla y pachulí" },
    ocasion: "Día, oficina y uso frecuente.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "plano", vidrio: "#F6E7C8", vidrio2: "#D8B87C", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "libre", nombre: "Libre", marca: "Yves Saint Laurent",
    genero: "f", tipo: "disenador", precio: 585000,
    familia: "Floral lavanda · Eau de Parfum",
    desc: [
      "La libertad hecha perfume: el choque entre la lavanda francesa y el azahar marroquí es su firma inconfundible.",
      "El fondo de vainilla Madagascar, almizcle y cedro lo vuelve cálido y sensual. Moderno, rebelde y muy reconocible."
    ],
    notas: { salida: "Mandarina, lavanda y grosella negra", corazon: "Lavanda, azahar y jazmín", fondo: "Vainilla Madagascar, almizcle, cedro y ámbar" },
    ocasion: "Día y noche, todo el año.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#E9D9A8", vidrio2: "#C2A356", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "black-opium", nombre: "Black Opium", marca: "Yves Saint Laurent",
    genero: "f", tipo: "disenador", precio: 560000, destacado: true,
    familia: "Gourmand café · Eau de Parfum",
    desc: [
      "El café más adictivo de la perfumería. Abre con pera y pimienta rosa antes de revelar su acorde estrella de café negro.",
      "El jazmín aporta un corazón floral, y la vainilla con cedro y pachulí firma un fondo nocturno, dulce y magnético."
    ],
    notas: { salida: "Pera, pimienta rosa y flor de azahar", corazon: "Café, jazmín y almendra amarga", fondo: "Vainilla, cedro, pachulí y almizcle" },
    ocasion: "Noche, fiestas y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#232228", vidrio2: "#0A0A0C", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "jadore", nombre: "J'adore", marca: "Dior",
    genero: "f", tipo: "disenador", precio: 640000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "El ánfora dorada más famosa del mundo. Un ramo de ylang-ylang, rosa de Damasco y jazmín sambac de una feminidad absoluta.",
      "La pera y el melón aportan luz, y el almizcle con maderas cierra una estela clásica, sofisticada y siempre apropiada."
    ],
    notas: { salida: "Pera, melón y mandarina", corazon: "Ylang-ylang, rosa de Damasco y jazmín sambac", fondo: "Almizcle, vainilla y maderas nobles" },
    ocasion: "Eventos, bodas y ocasiones elegantes.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "anfora", vidrio: "#EBCB8A", vidrio2: "#B98B34", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "chance-tendre", nombre: "Chance Eau Tendre", marca: "Chanel",
    genero: "f", tipo: "disenador", precio: 640000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "El frasco redondo de Chanel en su versión más tierna. Membrillo y pomelo abren jugosos y translúcidos.",
      "El jazmín del corazón se apoya en almizcle blanco y cedro, dejando una piel limpia, fresca y de una elegancia sin esfuerzo."
    ],
    notas: { salida: "Membrillo, pomelo y jacinto", corazon: "Jazmín y rosa", fondo: "Almizcle blanco, cedro e iris" },
    ocasion: "Día, primavera-verano y oficina.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "redondo", vidrio: "#F6D3D9", vidrio2: "#DDA0AE", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "flowerbomb", nombre: "Flowerbomb", marca: "Viktor&Rolf",
    genero: "f", tipo: "disenador", precio: 595000,
    familia: "Floral oriental · Eau de Parfum",
    desc: [
      "Una explosión floral en granada de cristal. Té y bergamota abren antes de un corazón denso de jazmín sambac, rosa y orquídea.",
      "El pachulí y la vainilla del fondo hacen que la estela sea enorme y reconocible a metros. Opulento y adictivo."
    ],
    notas: { salida: "Té, bergamota y osmanto", corazon: "Jazmín sambac, rosa centifolia, orquídea y fresia", fondo: "Pachulí, vainilla y almizcle" },
    ocasion: "Noche, eventos y clima fresco.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "diamante", vidrio: "#F0BFCF", vidrio2: "#C67D9B", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "daisy", nombre: "Daisy", marca: "Marc Jacobs",
    genero: "f", tipo: "disenador", precio: 385000,
    familia: "Floral fresco · Eau de Toilette",
    desc: [
      "Las margaritas del tapón anticipan un perfume alegre y juvenil. Fresa silvestre y pomelo abren con una frescura despreocupada.",
      "La violeta y el jazmín del corazón descansan sobre almizcle blanco y vainilla. Ligero, limpio y perfecto para el día."
    ],
    notas: { salida: "Fresa silvestre, pomelo y hoja de violeta", corazon: "Violeta, jazmín y gardenia", fondo: "Almizcle blanco, vainilla y maderas" },
    ocasion: "Día, primavera y planes casuales.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "redondo", vidrio: "#FBF6EC", vidrio2: "#DDD3C0", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "my-way", nombre: "My Way", marca: "Giorgio Armani",
    genero: "f", tipo: "disenador", precio: 495000,
    familia: "Floral almizclado · Eau de Parfum",
    desc: [
      "Un viaje floral moderno: bergamota y azahar abren luminosos y limpios, con una naturalidad muy actual.",
      "El nardo y el jazmín construyen un corazón blanco y cremoso, y la vainilla bourbon con almizcle y cedro firma el fondo."
    ],
    notas: { salida: "Bergamota y flor de azahar", corazon: "Nardo y jazmín", fondo: "Vainilla bourbon, almizcle blanco y cedro" },
    ocasion: "Día, oficina y cenas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#FBF7F0", vidrio2: "#D9CFBE", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "212-vip-rose", nombre: "212 VIP Rosé", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 375000,
    familia: "Floral frutal espumoso · Eau de Parfum",
    desc: [
      "Champán rosado en frasco metálico. El acorde de champagne rosé abre burbujeante y festivo, imposible de confundir.",
      "La frambuesa y el durazno aportan jugosidad, y el almizcle blanco con maderas deja una estela alegre y muy fiestera."
    ],
    notas: { salida: "Acorde de champagne rosé y frambuesa", corazon: "Durazno, flor de azahar y peonía", fondo: "Almizcle blanco, ámbar y maderas" },
    ocasion: "Fiestas, celebraciones y noche.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#F0C0C4", vidrio2: "#C97F8B", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "fame", nombre: "Fame", marca: "Rabanne",
    genero: "f", tipo: "disenador", precio: 445000,
    familia: "Floral amaderado · Eau de Parfum",
    desc: [
      "La diosa dorada de Rabanne. Mango y pimienta rosa abren exóticos y jugosos, con una modernidad descarada.",
      "El jazmín sambac del corazón se apoya en incienso y sándalo. Sensual, luminoso y con un frasco escultórico icónico."
    ],
    notas: { salida: "Mango y pimienta rosa", corazon: "Jazmín sambac", fondo: "Incienso, sándalo y vainilla" },
    ocasion: "Noche, eventos y citas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "busto", vidrio: "#E4C070", vidrio2: "#A87F2E", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "good-girl-supreme", nombre: "Good Girl Suprême", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 575000,
    familia: "Floral gourmand · Eau de Parfum",
    desc: [
      "La evolución más golosa del tacón azul. Almendra y café siguen presentes, pero la fresa y el ron aportan un giro festivo.",
      "El nardo y el jazmín mantienen la opulencia floral, mientras la vainilla y el sándalo cierran con una calidez irresistible."
    ],
    notas: { salida: "Fresa, almendra y acorde de ron", corazon: "Nardo, jazmín y café", fondo: "Vainilla, sándalo, haba tonka y cacao" },
    ocasion: "Noche, celebraciones y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "diamante", vidrio: "#2E4C86", vidrio2: "#12224A", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "aventus", nombre: "Aventus", marca: "Creed",
    genero: "m", tipo: "nicho", precio: 2150000, destacado: true,
    familia: "Chipre frutal · Eau de Parfum",
    desc: [
      "El perfume masculino más imitado de la historia moderna. La piña ahumada de la salida es una firma que nadie ha logrado replicar del todo.",
      "Abedul, pachulí y almizcle construyen un fondo seco y aristocrático. Inspirado en la vida de Napoleón: poder embotellado."
    ],
    notas: { salida: "Piña, bergamota, manzana y grosella negra", corazon: "Abedul, pachulí, rosa y jazmín", fondo: "Almizcle, musgo de roble, ámbar gris y vainilla" },
    ocasion: "Toda ocasión de alto nivel: negocios, bodas, noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#1F2226", vidrio2: "#0A0C0E", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "br540", nombre: "Baccarat Rouge 540", marca: "Maison Francis Kurkdjian",
    genero: "u", tipo: "nicho", precio: 1780000, destacado: true,
    familia: "Ámbar floral · Extrait de Parfum",
    desc: [
      "La fragancia más viral de la última década. Un acorde de azafrán y jazmín sobre ámbar gris y madera de cedro, luminoso y casi mineral.",
      "Su firma dulce-salada de algodón de azúcar quemado es inconfundible y deja rastro durante horas. Un objeto de deseo absoluto."
    ],
    notas: { salida: "Azafrán y jazmín", corazon: "Ámbar gris y madera de cedro", fondo: "Resina de abeto y almizcle blanco" },
    ocasion: "Ocasiones especiales, noche y eventos.",
    duracion: "Extrema: 12+ horas, estela enorme.",
    frasco: { forma: "rect", vidrio: "#C33A32", vidrio2: "#7A140F", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "oud-greatness", nombre: "Oud for Greatness", marca: "Initio",
    genero: "u", tipo: "nicho", precio: 1390000,
    familia: "Oud especiado · Extrait de Parfum",
    desc: [
      "Un oud moderno y sofisticado, muy alejado de los orientales pesados. Azafrán y nuez moscada abren afilados y limpios.",
      "El oud de Laos y el pachulí construyen un corazón profundo, y el almizcle con maderas lo mantiene refinado. Nicho de alta gama."
    ],
    notas: { salida: "Azafrán, nuez moscada y lavanda", corazon: "Oud de Laos y pachulí", fondo: "Almizcle, maderas y ámbar" },
    ocasion: "Noche, invierno y eventos de lujo.",
    duracion: "Extrema: 12+ horas.",
    frasco: { forma: "rect", vidrio: "#26241F", vidrio2: "#0C0B09", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "naxos", nombre: "Naxos", marca: "Xerjoff",
    genero: "m", tipo: "nicho", precio: 1450000,
    familia: "Tabaco miel · Eau de Parfum",
    desc: [
      "Un homenaje a Sicilia: lavanda y bergamota abren mediterráneas antes de revelar su corazón de miel y tabaco.",
      "La haba tonka y la vainilla firman un fondo goloso y aristocrático. Considerado uno de los mejores gourmand masculinos jamás creados."
    ],
    notas: { salida: "Lavanda, bergamota y limón", corazon: "Miel, canela y jazmín", fondo: "Tabaco, haba tonka, vainilla y madera de cachemira" },
    ocasion: "Noche, otoño-invierno y ocasiones especiales.",
    duracion: "Extrema: 10 a 14 horas.",
    frasco: { forma: "flacon", vidrio: "#D8B25E", vidrio2: "#9A742A", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "layton", nombre: "Layton", marca: "Parfums de Marly",
    genero: "m", tipo: "nicho", precio: 1240000, destacado: true,
    familia: "Amaderado avainillado · Eau de Parfum",
    desc: [
      "El caballo de batalla de Parfums de Marly. Manzana y lavanda abren frescas y elegantes sobre un corazón especiado de pimienta y geranio.",
      "La vainilla, el sándalo y el almizcle construyen un fondo cremoso que enamora. Versátil, señorial y de los más halagados del nicho."
    ],
    notas: { salida: "Manzana, lavanda, bergamota y mandarina", corazon: "Violeta, jazmín, geranio y pimienta", fondo: "Vainilla, sándalo, almizcle y haba tonka" },
    ocasion: "Universal: oficina, cena, noche y viaje.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "flacon", vidrio: "#25417A", vidrio2: "#0E1F44", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "delina", nombre: "Delina", marca: "Parfums de Marly",
    genero: "f", tipo: "nicho", precio: 1310000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "La rosa turca más luminosa del nicho contemporáneo. Lichi y ruibarbo abren jugosos y chispeantes.",
      "El corazón de rosa, peonía y vainilla se apoya en almizcle, incienso y cachemira. Femenino, sofisticado y de proyección enorme."
    ],
    notas: { salida: "Lichi, ruibarbo, bergamota y nerolí", corazon: "Rosa turca, peonía y vainilla", fondo: "Almizcle, incienso, madera de cachemira y cedro" },
    ocasion: "Eventos, cenas y ocasiones especiales.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "flacon", vidrio: "#EDBFC9", vidrio2: "#C1798E", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "santal-33", nombre: "Santal 33", marca: "Le Labo",
    genero: "u", tipo: "nicho", precio: 1180000,
    familia: "Amaderado especiado · Eau de Parfum",
    desc: [
      "El perfume de culto del downtown neoyorquino. Sándalo cremoso, cedro y cardamomo con un cuero suave y ahumado.",
      "La violeta y el papiro le dan un aire seco y andrógino. Minimalista, adictivo y absolutamente reconocible."
    ],
    notas: { salida: "Cardamomo, violeta e iris", corazon: "Sándalo australiano y papiro", fondo: "Cedro, cuero y ámbar" },
    ocasion: "Uso diario de autor, oficina creativa y noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "apotecario", vidrio: "#C9A47A", vidrio2: "#8A6640", tapa: "negro", acento: "#2A2E33" }
  },
  {
    id: "acqua-parfum", nombre: "Acqua di Giò Parfum", marca: "Giorgio Armani",
    genero: "m", tipo: "disenador", precio: 545000, destacado: true,
    familia: "Acuático amaderado · Parfum",
    desc: [
      "La relectura más profunda del mediterráneo de Armani. La salvia y el pachulí sostienen un acorde marino que ya no es ligero, sino denso y mineral.",
      "El fondo de incienso y madera de amyris le da un cuerpo casi nocturno. Fresco para quien ya superó los frescos deportivos."
    ],
    notas: { salida: "Bergamota, salvia y notas marinas", corazon: "Pachulí, geranio y romero", fondo: "Incienso, amyris y ámbar gris" },
    ocasion: "Oficina, cenas y todo el año.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "torre", vidrio: "#1E2A38", vidrio2: "#0A1018", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "allure-sport", nombre: "Allure Homme Sport", marca: "Chanel",
    genero: "m", tipo: "disenador", precio: 615000,
    familia: "Cítrico amaderado · Eau de Toilette",
    desc: [
      "El fresco elegante de Chanel: mandarina y naranja abren con una limpieza inmediata, sin ningún exceso.",
      "La pimienta y el cedro construyen el cuerpo, y el almizcle blanco con vainilla y tonka cierra suave. Discreto, pulcro y de una clase innegable."
    ],
    notas: { salida: "Mandarina, naranja y aldehídos", corazon: "Pimienta, neroli y cedro", fondo: "Almizcle blanco, vainilla, tonka y vetiver" },
    ocasion: "Día, oficina, deporte social y verano.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#D9DDE1", vidrio2: "#9AA1A8", tapa: "negro", acento: "#23272C" }
  },
  {
    id: "the-one-men", nombre: "The One for Men", marca: "Dolce&Gabbana",
    genero: "m", tipo: "disenador", precio: 425000,
    familia: "Ámbar especiado · Eau de Parfum",
    desc: [
      "Un oriental especiado de manual: pomelo y albahaca abren luminosos antes de un corazón de cardamomo y jengibre.",
      "El tabaco, el ámbar y el cedro del fondo lo vuelven cálido y muy elegante. Un clásico de cena que nunca resulta agresivo."
    ],
    notas: { salida: "Pomelo, albahaca y cilantro", corazon: "Cardamomo, jengibre y flor de naranjo", fondo: "Tabaco, ámbar, cedro y ambreta" },
    ocasion: "Cenas, otoño-invierno y noche.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#C6A15A", vidrio2: "#8A6825", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "gentleman-society", nombre: "Gentleman Society", marca: "Givenchy",
    genero: "m", tipo: "disenador", precio: 470000,
    familia: "Aromático amaderado · Eau de Parfum",
    desc: [
      "Un floral masculino bien resuelto: el narciso azul y la salvia abren verdes y sofisticados, muy poco convencionales.",
      "La vainilla del fondo, sostenida por vetiver y cedro, lo mantiene cálido sin caer en lo dulce. Moderno y de buen gusto."
    ],
    notas: { salida: "Salvia, bergamota y hoja de violeta", corazon: "Narciso azul y jazmín", fondo: "Vainilla, vetiver, cedro y pachulí" },
    ocasion: "Oficina, citas y uso diario elegante.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#25406B", vidrio2: "#0E1E3A", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "burberry-hero", nombre: "Hero Eau de Parfum", marca: "Burberry",
    genero: "m", tipo: "disenador", precio: 435000,
    familia: "Amaderado especiado · Eau de Parfum",
    desc: [
      "Tres cedros —Virginia, Atlas y Himalaya— construyen la columna vertebral de esta fragancia seca y contemporánea.",
      "La bergamota y la pimienta negra dan chispa a la salida, y el benjuí con haba tonka aporta la calidez justa. Muy versátil."
    ],
    notas: { salida: "Bergamota, pimienta negra y pimienta rosa", corazon: "Cedro de Virginia, Atlas e Himalaya", fondo: "Benjuí, haba tonka e incienso" },
    ocasion: "Día a día, oficina y clima templado.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#2E3238", vidrio2: "#14171A", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "boss-bottled", nombre: "Boss Bottled", marca: "Hugo Boss",
    genero: "m", tipo: "disenador", precio: 340000,
    familia: "Amaderado especiado · Eau de Toilette",
    desc: [
      "El perfume de oficina por antonomasia desde 1998. Manzana y ciruela abren frescas sobre un corazón de canela y clavo.",
      "El sándalo, el cedro y la vainilla del fondo lo hacen cálido, confiable y universalmente aceptado. Un caballo de batalla."
    ],
    notas: { salida: "Manzana, ciruela, bergamota y limón", corazon: "Canela, clavo, geranio y caoba", fondo: "Sándalo, cedro, vainilla y olivo" },
    ocasion: "Oficina, reuniones y uso diario.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "plano", vidrio: "#3A3F45", vidrio2: "#1A1D21", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "montblanc-explorer", nombre: "Explorer", marca: "Montblanc",
    genero: "m", tipo: "disenador", precio: 355000,
    familia: "Chipre amaderado · Eau de Parfum",
    desc: [
      "La respuesta accesible a los grandes frutales de nicho. Bergamota italiana y pimienta rosa abren brillantes.",
      "El vetiver de Haití da el cuerpo y el pachulí de Indonesia con ambroxan firma un fondo seco y señorial. Rendimiento sobresaliente."
    ],
    notas: { salida: "Bergamota italiana, pimienta rosa y jengibre", corazon: "Vetiver de Haití y cuero", fondo: "Pachulí de Indonesia, ambroxan y musgo" },
    ocasion: "Versátil: oficina, viaje y noche.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#22262B", vidrio2: "#0D0F12", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "ombre-leather", nombre: "Ombré Leather", marca: "Tom Ford",
    genero: "u", tipo: "disenador", precio: 780000, destacado: true,
    familia: "Cuero floral · Eau de Parfum",
    desc: [
      "Cuero suave y cardamomo sobre un fondo de ámbar y musgo: la interpretación más vestible del cuero en perfumería moderna.",
      "El jazmín sambac aporta un giro floral inesperado que lo suaviza. Unisex, seco y con una elegancia áspera muy reconocible."
    ],
    notas: { salida: "Cardamomo y cuero", corazon: "Jazmín sambac y flor de azahar", fondo: "Ámbar, musgo de roble y pachulí" },
    ocasion: "Noche, otoño-invierno y ocasiones de carácter.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#4A3524", vidrio2: "#1F160E", tapa: "negro", acento: "#2A2E33" }
  },
  {
    id: "tobacco-vanille", nombre: "Tobacco Vanille", marca: "Tom Ford",
    genero: "u", tipo: "disenador", precio: 1180000,
    familia: "Tabaco gourmand · Eau de Parfum",
    desc: [
      "Un club de caballeros en frasco: hoja de tabaco y especias sobre vainilla, cacao y frutos secos.",
      "Denso, opulento y profundamente invernal. Una sola vaporización llena una habitación y dura hasta el día siguiente."
    ],
    notas: { salida: "Hoja de tabaco y notas especiadas", corazon: "Flor de vainilla, cacao y haba tonka", fondo: "Frutos secos, madera y ámbar" },
    ocasion: "Invierno, noche y ocasiones especiales.",
    duracion: "Extrema: 12+ horas.",
    frasco: { forma: "apotecario", vidrio: "#6E4A22", vidrio2: "#33200C", tapa: "negro", acento: "#2A2E33" }
  },
  {
    id: "born-roma-donna", nombre: "Born in Roma Donna", marca: "Valentino",
    genero: "f", tipo: "disenador", precio: 495000,
    familia: "Floral amaderado · Eau de Parfum",
    desc: [
      "El contrapunto femenino del frasco con tachuelas. Grosella negra y bergamota abren jugosas y modernas.",
      "El jazmín sambac se apoya en vainilla bourbon y madera de cachemira. Elegante, urbano y con carácter joven."
    ],
    notas: { salida: "Grosella negra y bergamota", corazon: "Jazmín sambac y flor de azahar", fondo: "Vainilla bourbon, madera de cachemira y almizcle" },
    ocasion: "Día y noche, todo el año.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#E9B9C6", vidrio2: "#B87389", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "nuit-tresor", nombre: "La Nuit Trésor", marca: "Lancôme",
    genero: "f", tipo: "disenador", precio: 545000,
    familia: "Gourmand floral · Eau de Parfum",
    desc: [
      "Un diamante negro de rosa y vainilla. La frambuesa y el lichi abren jugosos antes de una rosa profunda y aterciopelada.",
      "El fondo de vainilla bourbon, haba tonka y pachulí lo vuelve nocturno y adictivo. Sensualidad sin concesiones."
    ],
    notas: { salida: "Frambuesa, lichi y bergamota", corazon: "Rosa, flor de azahar e incienso", fondo: "Vainilla bourbon, haba tonka, pachulí y papiro" },
    ocasion: "Noche, cenas y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "diamante", vidrio: "#2A2233", vidrio2: "#0D0912", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "miss-dior", nombre: "Miss Dior Eau de Parfum", marca: "Dior",
    genero: "f", tipo: "disenador", precio: 660000,
    familia: "Floral chipre · Eau de Parfum",
    desc: [
      "Un ramo de rosa de Grasse y peonía sobre un lazo de satén. Fresco, femenino y de una construcción impecable.",
      "La madera de sándalo y el almizcle blanco cierran con suavidad. El floral francés por excelencia, apropiado en cualquier contexto."
    ],
    notas: { salida: "Mandarina siciliana y bergamota", corazon: "Rosa de Grasse, peonía y lirio", fondo: "Sándalo, almizcle blanco y pachulí" },
    ocasion: "Día, bodas, oficina y primavera.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "redondo", vidrio: "#F5CBD2", vidrio2: "#D08FA1", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "coco-noir", nombre: "Coco Noir", marca: "Chanel",
    genero: "f", tipo: "disenador", precio: 690000,
    familia: "Ambarado floral · Eau de Parfum",
    desc: [
      "La cara oscura de Coco: pomelo y bergamota abren brillantes sobre un corazón de rosa y jazmín.",
      "El pachulí, el sándalo y las habas tonka construyen un fondo profundo y misterioso. Nocturno, denso y muy Chanel."
    ],
    notas: { salida: "Pomelo, bergamota y notas cítricas", corazon: "Rosa, jazmín y geranio", fondo: "Pachulí, sándalo, vainilla y habas tonka" },
    ocasion: "Noche, eventos y clima frío.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#1A1A1D", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "gucci-bloom", nombre: "Bloom", marca: "Gucci",
    genero: "f", tipo: "disenador", precio: 520000,
    familia: "Floral blanco · Eau de Parfum",
    desc: [
      "Un jardín de flores blancas sin filtros: nardo, jazmín sambac y enredadera de Rangún, casi sin notas de salida.",
      "Directo, denso y de una feminidad rotunda. Para quien quiere oler a flores de verdad, no a una versión edulcorada."
    ],
    notas: { salida: "Enredadera de Rangún", corazon: "Nardo y jazmín sambac", fondo: "Raíz de lirio y almizcle" },
    ocasion: "Día, primavera y eventos florales.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "redondo", vidrio: "#F2E6D8", vidrio2: "#CBB79E", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "paradoxe", nombre: "Paradoxe", marca: "Prada",
    genero: "f", tipo: "disenador", precio: 560000,
    familia: "Floral almizclado · Eau de Parfum",
    desc: [
      "Un jazmín tratado con precisión de laboratorio: limpio, luminoso y envuelto en almizcles blancos.",
      "La bergamota abre chispeante y el ámbar del fondo aporta una calidez discreta. Minimalista, moderno y muy cómodo de llevar."
    ],
    notas: { salida: "Bergamota y neroli", corazon: "Jazmín y flores blancas", fondo: "Almizcles blancos y ámbar" },
    ocasion: "Día, oficina y uso frecuente.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "busto", vidrio: "#F7F1E6", vidrio2: "#D3C7B2", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "amethyst", nombre: "Bade'e Al Oud Amethyst", marca: "Lattafa",
    genero: "u", tipo: "arabe", precio: 165000, destacado: true,
    familia: "Frutal ambarado · Eau de Parfum",
    desc: [
      "La versión frutal y golosa de la línea Bade'e Al Oud. Frutos rojos y bergamota abren jugosos sobre un corazón de rosa y azafrán.",
      "El oud, la vainilla y el ámbar del fondo le dan un cuerpo denso. Uno de los mejores rendimientos por peso de la casa."
    ],
    notas: { salida: "Frutos rojos, bergamota y azafrán", corazon: "Rosa, jazmín y oud", fondo: "Vainilla, ámbar, almizcle y maderas" },
    ocasion: "Noche, clima fresco y planes especiales.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "cofre", vidrio: "#7C4E9E", vidrio2: "#3A1F55", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "hayaati", nombre: "Hayaati", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 130000,
    familia: "Amaderado aromático · Eau de Parfum",
    desc: [
      "Un fresco especiado de uso diario: bergamota y pimienta abren nítidas sobre lavanda y geranio.",
      "El cedro, el vetiver y el ámbar cierran seco y limpio. Discreto, correcto y muy económico para rotación de oficina."
    ],
    notas: { salida: "Bergamota, pimienta y limón", corazon: "Lavanda, geranio y salvia", fondo: "Cedro, vetiver, ámbar y almizcle" },
    ocasion: "Oficina y uso diario.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#1F3B52", vidrio2: "#0B1B28", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "pride-nashama", nombre: "Pride Al Nashama", marca: "Lattafa",
    genero: "m", tipo: "arabe", precio: 125000,
    familia: "Frutal amaderado · Eau de Parfum",
    desc: [
      "Piña y manzana abren con esa jugosidad frutal que la perfumería árabe domina como nadie.",
      "El abedul ahumado y el pachulí construyen un fondo elegante y ligeramente ahumado, con almizcle y ámbar gris."
    ],
    notas: { salida: "Piña, manzana y bergamota", corazon: "Abedul, jazmín y rosa", fondo: "Almizcle, ámbar gris, pachulí y vainilla" },
    ocasion: "Uso diario, oficina y eventos.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#2B4A3C", vidrio2: "#122318", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "club-nuit-sillage", nombre: "Club de Nuit Sillage", marca: "Armaf",
    genero: "u", tipo: "arabe", precio: 195000,
    familia: "Ambarado especiado · Eau de Parfum",
    desc: [
      "La joya escondida de Armaf: pimienta rosa y azafrán abren con una densidad casi de nicho.",
      "El corazón de incienso y rosa se hunde en oud, ámbar y madera de gaiac. Serio, opulento y con proyección de sala."
    ],
    notas: { salida: "Pimienta rosa, azafrán y bergamota", corazon: "Incienso, rosa y jazmín", fondo: "Oud, ámbar, madera de gaiac y almizcle" },
    ocasion: "Noche, invierno y eventos formales.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "rect", vidrio: "#2F3A44", vidrio2: "#141A20", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "ventana", nombre: "Ventana", marca: "Armaf",
    genero: "m", tipo: "arabe", precio: 140000,
    familia: "Frutal ahumado · Eau de Parfum",
    desc: [
      "Piña y bergamota sobre abedul ahumado: la fórmula que Armaf conoce de memoria, aquí en clave más seca.",
      "El almizcle y el ámbar gris cierran con limpieza. Alternativa sólida para quien busca ese perfil frutal-ahumado."
    ],
    notas: { salida: "Piña, bergamota y manzana", corazon: "Abedul ahumado y jazmín", fondo: "Almizcle, ámbar gris y vainilla" },
    ocasion: "Uso diario, oficina y salidas.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "torre", vidrio: "#4A5560", vidrio2: "#1F262D", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "rare-carbon", nombre: "Rare Carbon", marca: "Afnan",
    genero: "m", tipo: "arabe", precio: 175000,
    familia: "Amaderado ambarado · Eau de Parfum",
    desc: [
      "Bergamota y azafrán abren afilados sobre un corazón de cuero y madera de gaiac.",
      "El ámbar y el almizcle del fondo lo mantienen cálido y elegante. Un árabe con acabado de diseñador."
    ],
    notas: { salida: "Bergamota, azafrán y pimienta", corazon: "Cuero, madera de gaiac y jazmín", fondo: "Ámbar, almizcle, pachulí y vainilla" },
    ocasion: "Noche, cenas y clima fresco.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "rect", vidrio: "#1C1E22", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "turathi-blue", nombre: "Turathi Blue", marca: "Afnan",
    genero: "m", tipo: "arabe", precio: 160000,
    familia: "Aromático acuático · Eau de Parfum",
    desc: [
      "Un fresco azul con más cuerpo del que aparenta: bergamota y menta abren limpias sobre lavanda.",
      "El ambroxan y el cedro del fondo le dan longevidad. Ideal para clima cálido sin quedarse corto de duración."
    ],
    notas: { salida: "Bergamota, menta y limón", corazon: "Lavanda, geranio y notas acuáticas", fondo: "Ambroxan, cedro, almizcle y ámbar" },
    ocasion: "Día, verano, oficina y deporte social.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "flacon", vidrio: "#1E5A8C", vidrio2: "#0A2A47", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "detour-noir", nombre: "Détour Noir", marca: "Al Haramain",
    genero: "u", tipo: "arabe", precio: 185000,
    familia: "Ambarado amaderado · Eau de Parfum",
    desc: [
      "Azafrán y nuez moscada abren con una intensidad casi de extrait, en la línea de los grandes oud modernos.",
      "El oud y el pachulí construyen el cuerpo, y el ámbar con almizcle firma el cierre. Unisex, oscuro y elegante."
    ],
    notas: { salida: "Azafrán, nuez moscada y lavanda", corazon: "Oud, pachulí y rosa", fondo: "Ámbar, almizcle, cedro y vainilla" },
    ocasion: "Noche, invierno y ocasiones de carácter.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "rect", vidrio: "#232326", vidrio2: "#08080A", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "daarej", nombre: "Daarej", marca: "Rasasi",
    genero: "f", tipo: "arabe", precio: 210000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "Un floral árabe luminoso: durazno y frutas dulces abren sobre un corazón de rosa y jazmín.",
      "La vainilla, el sándalo y el almizcle cierran cremosos. Femenino, cálido y con la duración típica de la casa."
    ],
    notas: { salida: "Durazno, frutas dulces y bergamota", corazon: "Rosa, jazmín y ylang-ylang", fondo: "Vainilla, sándalo, almizcle y ámbar" },
    ocasion: "Día y noche, todo el año.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "gota", vidrio: "#E0A6B8", vidrio2: "#B26A82", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "salvo", nombre: "Salvo", marca: "Maison Alhambra",
    genero: "m", tipo: "arabe", precio: 125000,
    familia: "Aromático fresco · Eau de Parfum",
    desc: [
      "Bergamota y pimienta rosa abren con esa frescura azul tan reconocible, sostenida por lavanda y ambroxan.",
      "El cedro y el almizcle cierran limpios. Un fresco de oficina correcto y muy accesible."
    ],
    notas: { salida: "Bergamota, pimienta rosa y limón", corazon: "Lavanda, geranio y ambroxan", fondo: "Cedro, almizcle y pachulí" },
    ocasion: "Oficina, día a día y clima cálido.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "torre", vidrio: "#2C5F8A", vidrio2: "#102B44", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "nusuk-ghala", nombre: "Ghala", marca: "Nusuk",
    genero: "f", tipo: "arabe", precio: 190000,
    familia: "Floral gourmand · Eau de Parfum",
    desc: [
      "Un floral cremoso con acabado de lujo: pera y bergamota abren frescas sobre jazmín y rosa.",
      "La vainilla, el sándalo y el almizcle construyen un fondo suave y persistente. Muy halagado en distancias cortas."
    ],
    notas: { salida: "Pera, bergamota y frutas blancas", corazon: "Jazmín, rosa y heliotropo", fondo: "Vainilla, sándalo, almizcle y ámbar" },
    ocasion: "Día, oficina y cenas.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#EFD9C0", vidrio2: "#C3A177", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "shaghaf-oud", nombre: "Shaghaf Oud", marca: "Swiss Arabian",
    genero: "u", tipo: "arabe", precio: 205000,
    familia: "Oud gourmand · Eau de Parfum",
    desc: [
      "Oud y rosa envueltos en un caramelo denso: la combinación que hizo célebre a esta casa emiratí.",
      "El azafrán y el ámbar del fondo lo vuelven adictivo y muy dulce. Poco convencional y absolutamente memorable."
    ],
    notas: { salida: "Azafrán y notas dulces", corazon: "Oud, rosa y praliné", fondo: "Ámbar, vainilla, almizcle y maderas" },
    ocasion: "Noche, invierno y planes especiales.",
    duracion: "Extrema: 10 a 12 horas.",
    frasco: { forma: "urna", vidrio: "#5E2A2A", vidrio2: "#2A0F0F", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "herod", nombre: "Herod", marca: "Parfums de Marly",
    genero: "m", tipo: "nicho", precio: 1290000,
    familia: "Tabaco vainilla · Eau de Parfum",
    desc: [
      "Un tabaco dulce de manual: pimienta y canela abren especiadas sobre un corazón de hoja de tabaco.",
      "La vainilla, el cedro y el incienso del fondo lo vuelven cremoso y aristocrático. Uno de los grandes invernales del nicho."
    ],
    notas: { salida: "Pimienta, canela y osmanto", corazon: "Hoja de tabaco, incienso y cinamomo", fondo: "Vainilla, cedro de Virginia y almizcle" },
    ocasion: "Invierno, noche y ocasiones especiales.",
    duracion: "Extrema: 10 a 14 horas.",
    frasco: { forma: "flacon", vidrio: "#2E2A26", vidrio2: "#12100E", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "percival", nombre: "Percival", marca: "Parfums de Marly",
    genero: "m", tipo: "nicho", precio: 1250000,
    familia: "Aromático fougère · Eau de Parfum",
    desc: [
      "Un fougère luminoso y contemporáneo: bergamota y lavanda abren con una limpieza impecable.",
      "El corazón de neroli y salvia descansa sobre almizcle, ambroxan y musgo. Fresco, elegante y de rendimiento excepcional."
    ],
    notas: { salida: "Bergamota, lavanda y limón", corazon: "Neroli, salvia y geranio", fondo: "Almizcle, ambroxan, musgo y ámbar" },
    ocasion: "Día, oficina, primavera-verano.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#3E7FA8", vidrio2: "#194563", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "erba-pura", nombre: "Erba Pura", marca: "Xerjoff",
    genero: "u", tipo: "nicho", precio: 1420000, destacado: true,
    familia: "Frutal ambarado · Eau de Parfum",
    desc: [
      "Una explosión de frutas maduras sobre almizcle blanco: naranja siciliana, frutas tropicales y un dulzor luminoso.",
      "El ámbar y el almizcle del fondo lo hacen envolvente y adictivo. Unisex, alegre y de los más halagados del nicho italiano."
    ],
    notas: { salida: "Naranja siciliana, limón y frutas tropicales", corazon: "Frutas maduras y notas dulces", fondo: "Almizcle blanco, ámbar y maderas" },
    ocasion: "Toda ocasión: día, noche y calor.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "flacon", vidrio: "#E8B84B", vidrio2: "#A97C1A", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "side-effect", nombre: "Side Effect", marca: "Initio",
    genero: "u", tipo: "nicho", precio: 1380000,
    familia: "Tabaco gourmand · Extrait de Parfum",
    desc: [
      "Ron, canela y tabaco sobre vainilla: un gourmand alcohólico y sensual, pensado para la noche.",
      "La rosa búlgara y el sándalo aportan profundidad. Denso, cálido y con la concentración extrait de la casa."
    ],
    notas: { salida: "Canela, ron y bergamota", corazon: "Rosa búlgara y tabaco", fondo: "Vainilla, sándalo, benjuí y almizcle" },
    ocasion: "Noche, invierno y ocasiones de lujo.",
    duracion: "Extrema: 12+ horas.",
    frasco: { forma: "rect", vidrio: "#1E1A17", vidrio2: "#080706", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "grand-soir", nombre: "Grand Soir", marca: "Maison Francis Kurkdjian",
    genero: "u", tipo: "nicho", precio: 1520000,
    familia: "Ambarado vainillado · Eau de Parfum",
    desc: [
      "París de noche en un ámbar dorado. Benjuí, labdanum y vainilla construyen una calidez envolvente y sin aristas.",
      "La flor de azahar y el haba tonka le dan luz. Sencillo en apariencia, magistral en ejecución."
    ],
    notas: { salida: "Flor de azahar y lavanda", corazon: "Ámbar, benjuí y labdanum", fondo: "Vainilla, haba tonka y almizcle" },
    ocasion: "Noche, invierno y veladas elegantes.",
    duracion: "Extrema: 10 a 14 horas.",
    frasco: { forma: "rect", vidrio: "#D6A94E", vidrio2: "#97701F", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "hacivat", nombre: "Hacivat", marca: "Nishane",
    genero: "u", tipo: "nicho", precio: 1340000,
    familia: "Chipre frutal · Extrait de Parfum",
    desc: [
      "Piña fresca y pomelo sobre un corazón de pachulí y jazmín: el frutal turco que se ganó un culto propio.",
      "El cedro y el musgo de roble del fondo lo mantienen seco y sofisticado. Comparado a menudo con Aventus, pero más verde."
    ],
    notas: { salida: "Piña, pomelo y bergamota", corazon: "Pachulí, jazmín y madera de gaiac", fondo: "Cedro, musgo de roble y ámbar" },
    ocasion: "Día, oficina de alto nivel y primavera.",
    duracion: "Muy alta: 8 a 10 horas.",
    frasco: { forma: "apotecario", vidrio: "#2F4A38", vidrio2: "#132218", tapa: "negro", acento: "#2A2E33" }
  },
  {
    id: "interlude-man", nombre: "Interlude Man", marca: "Amouage",
    genero: "m", tipo: "nicho", precio: 2280000,
    familia: "Ambarado ahumado · Eau de Parfum",
    desc: [
      "El incienso más desafiante de la perfumería moderna: humo, orégano y bergamota abren con una intensidad casi litúrgica.",
      "El ámbar, el labdanum y el cuero construyen un fondo monumental. No es un perfume fácil; es un perfume memorable."
    ],
    notas: { salida: "Bergamota, orégano y pimienta", corazon: "Incienso, mirra, opopónaco y cuero", fondo: "Ámbar, labdanum, pachulí y almizcle" },
    ocasion: "Invierno, noche y ocasiones de gran formato.",
    duracion: "Extrema: 14+ horas.",
    frasco: { forma: "urna", vidrio: "#33383D", vidrio2: "#121517", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "gypsy-water", nombre: "Gypsy Water", marca: "Byredo",
    genero: "u", tipo: "nicho", precio: 1120000,
    familia: "Amaderado aromático · Eau de Parfum",
    desc: [
      "Una hoguera en el bosque: bergamota y enebro abren frescos sobre incienso y pino.",
      "El sándalo, la vainilla y el ámbar cierran suaves y ahumados. Minimalista, bohemio y de una elegancia discreta."
    ],
    notas: { salida: "Bergamota, enebro, limón y pimienta", corazon: "Incienso, pino y flor de naranjo", fondo: "Sándalo, ámbar y vainilla" },
    ocasion: "Uso diario de autor, otoño y viajes.",
    duracion: "Moderada-alta: 6 a 8 horas.",
    frasco: { forma: "apotecario", vidrio: "#E4DED2", vidrio2: "#B5AC9B", tapa: "negro", acento: "#2A2E33" }
  },
  {
    id: "nautica-voyage", nombre: "Voyage", marca: "Nautica",
    genero: "m", tipo: "disenador", precio: 165000, destacado: true,
    familia: "Acuático frutal · Eau de Toilette",
    desc: [
      "El fresco más rentable del mercado: manzana verde y notas marinas abren con una limpieza que evoca la brisa del mar.",
      "El musgo y el almizcle del fondo lo mantienen suave y agradable. Un clásico de uso diario a precio imbatible."
    ],
    notas: { salida: "Manzana verde y hojas de loto", corazon: "Mimosa, notas marinas y rosa", fondo: "Musgo de roble, almizcle y ámbar" },
    ocasion: "Día, verano, oficina y universidad.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "flacon", vidrio: "#2E6FA8", vidrio2: "#123B63", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "ck-eternity", nombre: "Eternity for Men", marca: "Calvin Klein",
    genero: "m", tipo: "disenador", precio: 285000,
    familia: "Aromático fougère · Eau de Toilette",
    desc: [
      "Un fougère limpio de 1989 que sigue oliendo actual. Lavanda y mandarina abren frescas sobre un corazón de salvia y jazmín.",
      "El sándalo y el ámbar cierran con suavidad. Discreto, pulcro y de una elegancia sin pretensiones."
    ],
    notas: { salida: "Lavanda, mandarina y bergamota", corazon: "Salvia, jazmín y lirio de los valles", fondo: "Sándalo, ámbar y almizcle" },
    ocasion: "Oficina, día a día y clima templado.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#C9D2D8", vidrio2: "#8A959D", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "ck-one", nombre: "CK One", marca: "Calvin Klein",
    genero: "u", tipo: "disenador", precio: 265000,
    familia: "Cítrico aromático · Eau de Toilette",
    desc: [
      "El unisex que definió los noventa. Bergamota, piña y papaya abren con una frescura andrógina y transparente.",
      "El té verde y el almizcle del fondo lo vuelven limpio como ropa recién lavada. Un icono de la perfumería moderna."
    ],
    notas: { salida: "Bergamota, piña, papaya y mandarina", corazon: "Nuez moscada, violeta y jazmín", fondo: "Té verde, almizcle, ámbar y cedro" },
    ocasion: "Uso diario, verano y planes casuales.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "apotecario", vidrio: "#D5D8D2", vidrio2: "#9DA298", tapa: "plata", acento: "#8E949A" }
  },
  {
    id: "polo-blue", nombre: "Polo Blue", marca: "Ralph Lauren",
    genero: "m", tipo: "disenador", precio: 320000,
    familia: "Acuático amaderado · Eau de Toilette",
    desc: [
      "Melón, pepino y albahaca abren con una frescura verde y jugosa muy reconocible.",
      "La salvia y el geranio dan cuerpo, y el musgo con almizcle cierran suave. Deportivo y fácil de llevar todos los días."
    ],
    notas: { salida: "Melón, pepino y mandarina", corazon: "Albahaca, salvia y geranio", fondo: "Musgo, almizcle, ámbar y pachulí" },
    ocasion: "Día, deporte social y verano.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "flacon", vidrio: "#2B5D9E", vidrio2: "#122F5C", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "cool-water", nombre: "Cool Water", marca: "Davidoff",
    genero: "m", tipo: "disenador", precio: 215000,
    familia: "Acuático aromático · Eau de Toilette",
    desc: [
      "El acuático que inventó la categoría en 1988. Menta, lavanda y notas marinas abren con una frescura helada.",
      "El sándalo, el cedro y el almizcle firman un fondo limpio. Referencia obligada y de precio muy accesible."
    ],
    notas: { salida: "Menta, lavanda, romero y notas marinas", corazon: "Geranio, nerolí y sándalo", fondo: "Cedro, almizcle, ámbar y tabaco" },
    ocasion: "Día, verano y uso frecuente.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "redondo", vidrio: "#4E8FC0", vidrio2: "#1F4E77", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "leau-issey-homme", nombre: "L'Eau d'Issey Pour Homme", marca: "Issey Miyake",
    genero: "m", tipo: "disenador", precio: 295000,
    familia: "Acuático amaderado · Eau de Toilette",
    desc: [
      "Yuzu y bergamota abren cítricos y minerales, con esa transparencia japonesa tan característica.",
      "La nuez moscada y el geranio dan calor al corazón, y el sándalo con tabaco cierran seco. Sobrio y muy elegante."
    ],
    notas: { salida: "Yuzu, bergamota y limón", corazon: "Nuez moscada, canela, geranio y lirio", fondo: "Sándalo, cedro, tabaco y ámbar" },
    ocasion: "Oficina, día y clima cálido.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "torre", vidrio: "#5E7F96", vidrio2: "#28414F", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "bvlgari-man-black", nombre: "Man in Black", marca: "Bvlgari",
    genero: "m", tipo: "disenador", precio: 395000,
    familia: "Ámbar especiado · Eau de Parfum",
    desc: [
      "Ron y especias abren cálidos sobre un corazón de cuero y tuberosa, una combinación poco común y muy lograda.",
      "El benjuí, el tabaco y la haba tonka construyen un fondo denso y masculino. Nocturno y con carácter."
    ],
    notas: { salida: "Ron, especias y pimienta", corazon: "Cuero, tuberosa e iris", fondo: "Benjuí, tabaco, haba tonka y ámbar" },
    ocasion: "Noche, cenas y clima fresco.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "redondo", vidrio: "#1E1C1A", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "azzaro-chrome", nombre: "Chrome", marca: "Azzaro",
    genero: "m", tipo: "disenador", precio: 275000,
    familia: "Cítrico aromático · Eau de Toilette",
    desc: [
      "Limón, bergamota y neroli abren con una limpieza casi jabonosa, fresca y luminosa.",
      "El jazmín y el cilantro dan cuerpo, y el sándalo con almizcle cierran suave. El fresco limpio por excelencia."
    ],
    notas: { salida: "Limón, bergamota, neroli y piña", corazon: "Jazmín, cilantro, salvia y ciclamen", fondo: "Sándalo, almizcle, cedro y haba tonka" },
    ocasion: "Día, oficina y verano.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "redondo", vidrio: "#C6D4DC", vidrio2: "#7E8F99", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "banderas-king", nombre: "King of Seduction", marca: "Antonio Banderas",
    genero: "m", tipo: "disenador", precio: 145000,
    familia: "Aromático amaderado · Eau de Toilette",
    desc: [
      "Bergamota y menta abren frescas sobre un corazón de lavanda y cardamomo.",
      "El cedro y el almizcle cierran limpios. Sencillo, correcto y de los mejores precios del mercado."
    ],
    notas: { salida: "Bergamota, menta y mandarina", corazon: "Lavanda, cardamomo y salvia", fondo: "Cedro, almizcle, ámbar y haba tonka" },
    ocasion: "Día a día, universidad y oficina.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "torre", vidrio: "#26456B", vidrio2: "#0F2038", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "banderas-secret", nombre: "The Secret", marca: "Antonio Banderas",
    genero: "m", tipo: "disenador", precio: 150000,
    familia: "Amaderado especiado · Eau de Toilette",
    desc: [
      "Manzana y menta abren frescas antes de un corazón de canela y violeta.",
      "La vainilla, el cedro y el ámbar cierran cálidos. Muy vestible en clima fresco y de precio accesible."
    ],
    notas: { salida: "Manzana, menta y bergamota", corazon: "Canela, violeta y cardamomo", fondo: "Vainilla, cedro, ámbar y almizcle" },
    ocasion: "Noche informal y clima fresco.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "rect", vidrio: "#23272C", vidrio2: "#0D0F12", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "light-blue-homme", nombre: "Light Blue Pour Homme", marca: "Dolce&Gabbana",
    genero: "m", tipo: "disenador", precio: 340000,
    familia: "Cítrico amaderado · Eau de Toilette",
    desc: [
      "Pomelo siciliano y mandarina abren con una frescura mediterránea inmediata.",
      "El romero y el palo de rosa dan cuerpo, y el incienso con almizcle cierran limpios. Verano embotellado."
    ],
    notas: { salida: "Pomelo siciliano, mandarina y bergamota", corazon: "Pimienta, romero y palo de rosa", fondo: "Incienso, almizcle y musgo de roble" },
    ocasion: "Verano, playa y día.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "rect", vidrio: "#7FB3D5", vidrio2: "#3D7AA6", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "boss-the-scent", nombre: "The Scent", marca: "Hugo Boss",
    genero: "m", tipo: "disenador", precio: 335000,
    familia: "Cuero especiado · Eau de Toilette",
    desc: [
      "Jengibre y mandarina abren especiados sobre un corazón de maninka, una fruta africana de aroma adictivo.",
      "El cuero del fondo le da un acabado sensual y cálido. Compacto, seductor y muy bien resuelto."
    ],
    notas: { salida: "Jengibre y mandarina", corazon: "Fruta maninka y lavanda", fondo: "Cuero y ámbar" },
    ocasion: "Noche, citas y clima fresco.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "plano", vidrio: "#4A3524", vidrio2: "#1F160E", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "ferragamo-uomo", nombre: "Uomo", marca: "Salvatore Ferragamo",
    genero: "m", tipo: "disenador", precio: 265000,
    familia: "Gourmand amaderado · Eau de Toilette",
    desc: [
      "Cardamomo y pimienta negra abren especiados sobre un corazón de flor de naranjo y crema de avellana.",
      "El sándalo, el cedro y la haba tonka cierran cremosos. Dulce sin exceso y muy elegante."
    ],
    notas: { salida: "Cardamomo, pimienta negra y bergamota", corazon: "Flor de naranjo y crema de avellana", fondo: "Sándalo, cedro, haba tonka y almizcle" },
    ocasion: "Oficina, cenas y otoño.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#8A2E32", vidrio2: "#4A1315", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "kenzo-homme", nombre: "Kenzo Homme Intense", marca: "Kenzo",
    genero: "m", tipo: "disenador", precio: 290000,
    familia: "Acuático amaderado · Eau de Parfum",
    desc: [
      "Notas marinas y bergamota abren con una frescura salina muy limpia.",
      "El cardamomo y la nuez moscada calientan el corazón, y el cedro con vetiver cierran seco. Fresco pero con cuerpo."
    ],
    notas: { salida: "Notas marinas, bergamota y mandarina", corazon: "Cardamomo, nuez moscada y jengibre", fondo: "Cedro, vetiver, almizcle y ámbar" },
    ocasion: "Día, oficina y clima cálido.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "torre", vidrio: "#2A6E8E", vidrio2: "#0F3448", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "jaguar-classic-black", nombre: "Classic Black", marca: "Jaguar",
    genero: "m", tipo: "disenador", precio: 135000,
    familia: "Aromático amaderado · Eau de Toilette",
    desc: [
      "Bergamota y menta abren frescas sobre lavanda y cardamomo.",
      "El cedro, el vetiver y el almizcle cierran limpios. Correcto, discreto y de precio muy competitivo."
    ],
    notas: { salida: "Bergamota, menta y limón", corazon: "Lavanda, cardamomo y geranio", fondo: "Cedro, vetiver, almizcle y ámbar" },
    ocasion: "Oficina y día a día.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "plano", vidrio: "#1C1E22", vidrio2: "#000000", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "mercedes-man", nombre: "Mercedes-Benz Man", marca: "Mercedes-Benz",
    genero: "m", tipo: "disenador", precio: 245000,
    familia: "Amaderado especiado · Eau de Toilette",
    desc: [
      "Bergamota y pimienta abren con nitidez sobre un corazón floral de jazmín y lirio.",
      "El vetiver, el pachulí y el ámbar cierran con elegancia sobria. Muy correcto para vestir formal."
    ],
    notas: { salida: "Bergamota, pimienta y pomelo", corazon: "Jazmín, lirio y ciclamen", fondo: "Vetiver, pachulí, ámbar y almizcle" },
    ocasion: "Oficina, reuniones y cenas.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "flacon", vidrio: "#2F3A44", vidrio2: "#141A20", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "police-to-be", nombre: "To Be", marca: "Police",
    genero: "m", tipo: "disenador", precio: 155000,
    familia: "Ámbar especiado · Eau de Toilette",
    desc: [
      "Frasco de calavera y aroma dulce especiado: manzana y bergamota abren sobre canela y flor de azahar.",
      "La vainilla, el ámbar y el pachulí cierran cálidos. Llamativo, juvenil y muy económico."
    ],
    notas: { salida: "Manzana, bergamota y limón", corazon: "Canela, flor de azahar y clavo", fondo: "Vainilla, ámbar, pachulí y almizcle" },
    ocasion: "Noche informal y clima fresco.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "busto", vidrio: "#2A2E33", vidrio2: "#111316", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "guess-seductive-blue", nombre: "Seductive Homme Blue", marca: "Guess",
    genero: "m", tipo: "disenador", precio: 140000,
    familia: "Aromático acuático · Eau de Toilette",
    desc: [
      "Bergamota y notas acuáticas abren frescas sobre lavanda y salvia.",
      "El cedro y el almizcle cierran limpios. Ligero, agradable y de gran relación calidad-precio."
    ],
    notas: { salida: "Bergamota, notas acuáticas y limón", corazon: "Lavanda, salvia y geranio", fondo: "Cedro, almizcle y ámbar" },
    ocasion: "Día, verano y universidad.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "plano", vidrio: "#2E6FA8", vidrio2: "#123B63", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "adidas-victory", nombre: "Victory League", marca: "Adidas",
    genero: "m", tipo: "disenador", precio: 75000,
    familia: "Aromático amaderado · Eau de Toilette",
    desc: [
      "Bergamota y menta abren deportivas y limpias sobre un corazón de lavanda y salvia.",
      "El cedro y el almizcle cierran discretos. Pensado para el día a día activo, a precio de entrada."
    ],
    notas: { salida: "Bergamota, menta y limón", corazon: "Lavanda, salvia y geranio", fondo: "Cedro, almizcle y haba tonka" },
    ocasion: "Deporte, universidad y día a día.",
    duracion: "Baja-moderada: 3 a 5 horas.",
    frasco: { forma: "plano", vidrio: "#1F3B52", vidrio2: "#0B1B28", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "tommy-hilfiger", nombre: "Tommy", marca: "Tommy Hilfiger",
    genero: "m", tipo: "disenador", precio: 185000,
    familia: "Aromático fresco · Eau de Toilette",
    desc: [
      "Un fresco americano de los noventa: manzana, lavanda y menta abren con una alegría despreocupada.",
      "La flor de manzano y el sándalo cierran suaves. Casual, limpio y muy fácil de llevar."
    ],
    notas: { salida: "Manzana, lavanda, menta y bergamota", corazon: "Flor de manzano, rosa y clavo", fondo: "Sándalo, almizcle y cedro" },
    ocasion: "Día, universidad y planes casuales.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "rect", vidrio: "#D8DCE0", vidrio2: "#9AA1A8", tapa: "plata", acento: "#7E858C" }
  },
  {
    id: "212-vip-women", nombre: "212 VIP", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 385000, destacado: true,
    familia: "Gourmand floral · Eau de Parfum",
    desc: [
      "La fiesta neoyorquina en clave femenina: ron y maracuyá abren con una energía burbujeante.",
      "La gardenia da el corazón floral y la vainilla con almizcle y haba tonka cierran golosos. Nocturno y muy reconocible."
    ],
    notas: { salida: "Ron, maracuyá y bergamota", corazon: "Gardenia y flor de azahar", fondo: "Vainilla, almizcle, haba tonka y ámbar" },
    ocasion: "Fiestas, celebraciones y noche.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "rect", vidrio: "#2A2E33", vidrio2: "#0D0F12", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "ch-chic", nombre: "Chic for Women", marca: "Carolina Herrera",
    genero: "f", tipo: "disenador", precio: 355000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "Frambuesa y bergamota abren jugosas sobre un corazón de rosa, peonía y magnolia.",
      "El sándalo, el ámbar y el almizcle cierran cálidos. Femenino clásico, elegante y de uso amplio."
    ],
    notas: { salida: "Frambuesa, bergamota y grosella", corazon: "Rosa, peonía y magnolia", fondo: "Sándalo, ámbar, almizcle y vainilla" },
    ocasion: "Día, oficina y cenas.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "diamante", vidrio: "#D45A7A", vidrio2: "#8E2743", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "lady-million", nombre: "Lady Million", marca: "Rabanne",
    genero: "f", tipo: "disenador", precio: 445000,
    familia: "Floral frutal ambarado · Eau de Parfum",
    desc: [
      "El lingote dorado femenino. Frambuesa, nerolí y limón abren chispeantes sobre un corazón de jazmín y azahar.",
      "La miel, el pachulí y el ámbar cierran densos y golosos. Descarado, brillante y hecho para brillar."
    ],
    notas: { salida: "Frambuesa, nerolí y limón", corazon: "Jazmín sambac, azahar y gardenia", fondo: "Miel, pachulí, ámbar y almizcle" },
    ocasion: "Fiestas, noche y celebraciones.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "diamante", vidrio: "#E4C070", vidrio2: "#A87F2E", tapa: "oro", acento: "#F0E2C0" }
  },
  {
    id: "bright-crystal", nombre: "Bright Crystal", marca: "Versace",
    genero: "f", tipo: "disenador", precio: 320000,
    familia: "Floral frutal · Eau de Toilette",
    desc: [
      "Granada y yuzu abren luminosos sobre un corazón de peonía, magnolia y loto.",
      "El almizcle, el ámbar y la caoba cierran suaves. Fresco, femenino y de una ligereza muy agradecida en calor."
    ],
    notas: { salida: "Granada, yuzu y hielo", corazon: "Peonía, magnolia y loto", fondo: "Almizcle, ámbar y caoba" },
    ocasion: "Día, primavera-verano y oficina.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "gota", vidrio: "#F0C6D2", vidrio2: "#C98FA4", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "dylan-blue-femme", nombre: "Dylan Blue Femme", marca: "Versace",
    genero: "f", tipo: "disenador", precio: 340000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "Grosella negra y manzana Granny Smith abren ácidas y modernas sobre un corazón de rosa y jazmín.",
      "El almizcle, el pachulí y las maderas cierran con carácter. Femenino con actitud mediterránea."
    ],
    notas: { salida: "Grosella negra, manzana Granny Smith y pomelo", corazon: "Rosa, jazmín y flor de azahar", fondo: "Almizcle, pachulí, ámbar y maderas" },
    ocasion: "Día y noche, todo el año.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "gota", vidrio: "#4E86A8", vidrio2: "#1F4A66", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "light-blue-femme", nombre: "Light Blue", marca: "Dolce&Gabbana",
    genero: "f", tipo: "disenador", precio: 350000,
    familia: "Cítrico floral · Eau de Toilette",
    desc: [
      "Manzana Granny Smith y limón siciliano abren con la frescura de una mañana en Capri.",
      "El bambú y el jazmín dan cuerpo, y el cedro con almizcle cierran limpios. Verano puro y un superventas eterno."
    ],
    notas: { salida: "Manzana Granny Smith, limón siciliano y campanilla", corazon: "Bambú, jazmín y rosa blanca", fondo: "Cedro, almizcle y ámbar" },
    ocasion: "Verano, playa y uso diario.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "rect", vidrio: "#A9D0E4", vidrio2: "#5E97B8", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "ck-euphoria", nombre: "Euphoria", marca: "Calvin Klein",
    genero: "f", tipo: "disenador", precio: 315000,
    familia: "Floral amaderado · Eau de Parfum",
    desc: [
      "Granada y caqui abren exóticos sobre un corazón de orquídea negra y loto.",
      "La caoba, el ámbar líquido y el almizcle cierran densos y sensuales. Hipnótico y muy nocturno."
    ],
    notas: { salida: "Granada, caqui y verde persimón", corazon: "Orquídea negra, loto y champaca", fondo: "Caoba, ámbar líquido, violeta y almizcle" },
    ocasion: "Noche, cenas y clima fresco.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "gota", vidrio: "#5C2E6E", vidrio2: "#2A0F38", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "lancome-tresor", nombre: "Trésor", marca: "Lancôme",
    genero: "f", tipo: "disenador", precio: 425000,
    familia: "Floral empolvado · Eau de Parfum",
    desc: [
      "Un clásico de 1990: melocotón y lila abren sobre un corazón de rosa e iris muy empolvado.",
      "El sándalo, el ámbar y la vainilla cierran cremosos. Romántico, cálido y de una elegancia clásica."
    ],
    notas: { salida: "Melocotón, lila y bergamota", corazon: "Rosa, iris y heliotropo", fondo: "Sándalo, ámbar, vainilla y almizcle" },
    ocasion: "Cenas, eventos y clima fresco.",
    duracion: "Alta: 7 a 9 horas.",
    frasco: { forma: "diamante", vidrio: "#E7C9A8", vidrio2: "#BC9463", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "amor-amor", nombre: "Amor Amor", marca: "Cacharel",
    genero: "f", tipo: "disenador", precio: 265000,
    familia: "Floral frutal · Eau de Toilette",
    desc: [
      "Grosella negra, mandarina y naranja abren vibrantes sobre un corazón de jazmín y lirio.",
      "El almizcle, el ámbar y el sándalo cierran suaves. Juvenil, alegre y muy querido en Colombia."
    ],
    notas: { salida: "Grosella negra, mandarina y naranja", corazon: "Jazmín, lirio y rosa", fondo: "Almizcle, ámbar, sándalo y vainilla" },
    ocasion: "Día, universidad y planes casuales.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "gota", vidrio: "#D33B4E", vidrio2: "#7E1523", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "flower-kenzo", nombre: "Flower by Kenzo", marca: "Kenzo",
    genero: "f", tipo: "disenador", precio: 335000,
    familia: "Floral empolvado · Eau de Parfum",
    desc: [
      "La amapola roja del frasco anuncia un floral empolvado y sereno: violeta, rosa búlgara y hedione.",
      "La vainilla, el almizcle blanco y el incienso cierran suaves como talco. Delicado y muy reconocible."
    ],
    notas: { salida: "Mandarina, casia y violeta", corazon: "Rosa búlgara, hedione y amapola", fondo: "Vainilla, almizcle blanco e incienso" },
    ocasion: "Día, oficina y uso frecuente.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "plano", vidrio: "#F2E9DC", vidrio2: "#C9BCA6", tapa: "rojo", acento: "#B23A3A" }
  },
  {
    id: "leau-issey-femme", nombre: "L'Eau d'Issey", marca: "Issey Miyake",
    genero: "f", tipo: "disenador", precio: 300000,
    familia: "Floral acuático · Eau de Toilette",
    desc: [
      "Loto, rosa de agua y melón abren con una transparencia acuática única en su categoría.",
      "La peonía y el lirio dan el corazón, y el sándalo con almizcle cierran limpios. Fresco, sereno y atemporal."
    ],
    notas: { salida: "Loto, rosa de agua, melón y bergamota", corazon: "Peonía, lirio y nenúfar", fondo: "Sándalo, cedro, almizcle y ámbar" },
    ocasion: "Día, verano y oficina.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "torre", vidrio: "#CFE3EC", vidrio2: "#8FB4C6", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "green-tea", nombre: "Green Tea", marca: "Elizabeth Arden",
    genero: "f", tipo: "disenador", precio: 145000,
    familia: "Cítrico verde · Eau de Toilette",
    desc: [
      "Té verde, limón y menta abren con una frescura limpia y herbal muy relajante.",
      "El jazmín y el ruibarbo dan cuerpo, y el almizcle blanco cierra suave. Ligero y perfecto para el calor."
    ],
    notas: { salida: "Té verde, limón, menta y bergamota", corazon: "Jazmín, ruibarbo y clavel", fondo: "Almizcle blanco, ámbar y musgo de roble" },
    ocasion: "Día, verano y oficina.",
    duracion: "Baja-moderada: 3 a 5 horas.",
    frasco: { forma: "apotecario", vidrio: "#D9E4C6", vidrio2: "#A3B584", tapa: "plata", acento: "#8E949A" }
  },
  {
    id: "clinique-happy", nombre: "Happy", marca: "Clinique",
    genero: "f", tipo: "disenador", precio: 265000,
    familia: "Cítrico floral · Eau de Parfum",
    desc: [
      "Pomelo rosa y naranja abren radiantes sobre un corazón de magnolia y orquídea.",
      "El almizcle y las maderas cierran discretos. Optimista, limpio y de los cítricos femeninos mejor logrados."
    ],
    notas: { salida: "Pomelo rosa, naranja y limón", corazon: "Magnolia, orquídea y rosa", fondo: "Almizcle, maderas y ámbar" },
    ocasion: "Día, oficina y primavera.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "redondo", vidrio: "#F3D9A8", vidrio2: "#C9A55F", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "omnia-crystalline", nombre: "Omnia Crystalline", marca: "Bvlgari",
    genero: "f", tipo: "disenador", precio: 355000,
    familia: "Floral acuático · Eau de Toilette",
    desc: [
      "Bambú y pera nashi abren con una transparencia cristalina muy elegante.",
      "El loto da el corazón y las maderas de balsa con almizcle cierran suaves. Sutil, refinado y muy limpio."
    ],
    notas: { salida: "Bambú y pera nashi", corazon: "Loto y flores acuáticas", fondo: "Madera de balsa, almizcle y ámbar" },
    ocasion: "Día, oficina y clima cálido.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "redondo", vidrio: "#E3EEF2", vidrio2: "#A8C3CE", tapa: "plata", acento: "#B9BEC4" }
  },
  {
    id: "nina-ricci", nombre: "Nina", marca: "Nina Ricci",
    genero: "f", tipo: "disenador", precio: 285000,
    familia: "Floral frutal · Eau de Toilette",
    desc: [
      "La manzana roja de cristal esconde un floral goloso: limón, lima y toffee abren dulces.",
      "La peonía y la manzana dan cuerpo, y la vainilla con almizcle cierran cremosos. Juvenil y encantador."
    ],
    notas: { salida: "Limón, lima y toffee", corazon: "Peonía, manzana y praliné", fondo: "Vainilla, almizcle y cedro" },
    ocasion: "Día, universidad y regalos.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "redondo", vidrio: "#E05364", vidrio2: "#992432", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "britney-fantasy", nombre: "Fantasy", marca: "Britney Spears",
    genero: "f", tipo: "disenador", precio: 175000,
    familia: "Gourmand frutal · Eau de Parfum",
    desc: [
      "Kiwi, lichi y cupcake rojo abren descaradamente dulces, en uno de los gourmand más vendidos de la historia.",
      "La orquídea y el jazmín dan el corazón, y el almizcle con madera cierran cremosos. Divertido y adictivo."
    ],
    notas: { salida: "Kiwi, lichi y cupcake rojo", corazon: "Orquídea, jazmín y flor de mayo", fondo: "Almizcle, madera y raíz de lirio" },
    ocasion: "Día a día, universidad y planes casuales.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "gota", vidrio: "#C77BC0", vidrio2: "#8A3E85", tapa: "plata", acento: "#C4C8CC" }
  },
  {
    id: "tous-touch", nombre: "Tous Touch", marca: "Tous",
    genero: "f", tipo: "disenador", precio: 235000,
    familia: "Floral almizclado · Eau de Toilette",
    desc: [
      "Mandarina y grosella abren frescas sobre un corazón de jazmín y rosa.",
      "El almizcle, el sándalo y la vainilla cierran suaves y limpios. Discreto, cercano y muy vestible."
    ],
    notas: { salida: "Mandarina, grosella y bergamota", corazon: "Jazmín, rosa y magnolia", fondo: "Almizcle, sándalo, vainilla y ámbar" },
    ocasion: "Día, oficina y uso frecuente.",
    duracion: "Moderada: 5 a 7 horas.",
    frasco: { forma: "busto", vidrio: "#E8D4B8", vidrio2: "#BFA37C", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "loewe-solo-ella", nombre: "Solo Loewe Ella", marca: "Loewe",
    genero: "f", tipo: "disenador", precio: 375000,
    familia: "Floral frutal · Eau de Parfum",
    desc: [
      "Frambuesa y bergamota abren jugosas sobre un corazón de jazmín y peonía.",
      "El pachulí, la vainilla y el almizcle cierran cálidos. Elegancia española, sobria y bien construida."
    ],
    notas: { salida: "Frambuesa, bergamota y grosella", corazon: "Jazmín, peonía y rosa", fondo: "Pachulí, vainilla, almizcle y ámbar" },
    ocasion: "Día y noche, todo el año.",
    duracion: "Alta: 6 a 8 horas.",
    frasco: { forma: "rect", vidrio: "#E9B9C6", vidrio2: "#B87389", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "guess-girl", nombre: "Guess Girl", marca: "Guess",
    genero: "f", tipo: "disenador", precio: 155000,
    familia: "Floral frutal · Eau de Toilette",
    desc: [
      "Pera y grosella negra abren jugosas sobre un corazón de peonía y jazmín.",
      "El almizcle, el ámbar y el sándalo cierran suaves. Fresco, juvenil y de precio muy accesible."
    ],
    notas: { salida: "Pera, grosella negra y bergamota", corazon: "Peonía, jazmín y rosa", fondo: "Almizcle, ámbar, sándalo y vainilla" },
    ocasion: "Día, universidad y planes casuales.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "plano", vidrio: "#F0C6D2", vidrio2: "#C98FA4", tapa: "oro", acento: "#C9AE7F" }
  },
  {
    id: "shakira-rock", nombre: "Rock! by Shakira", marca: "Shakira",
    genero: "f", tipo: "disenador", precio: 115000,
    familia: "Floral oriental · Eau de Toilette",
    desc: [
      "Frutas rojas y pimienta rosa abren vibrantes sobre un corazón de jazmín y flor de azahar.",
      "La vainilla, el pachulí y el ámbar cierran cálidos. Sensual, accesible y muy popular en el mercado local."
    ],
    notas: { salida: "Frutas rojas, pimienta rosa y mandarina", corazon: "Jazmín, flor de azahar y rosa", fondo: "Vainilla, pachulí, ámbar y almizcle" },
    ocasion: "Noche informal y día a día.",
    duracion: "Moderada: 4 a 6 horas.",
    frasco: { forma: "busto", vidrio: "#8E2B4A", vidrio2: "#4A0F24", tapa: "oro", acento: "#C9AE7F" }
  }
];

const COMBOS = [
  {
    id: "combokhamrah", titulo: "Trío Árabe Intenso",
    nombre: "Asad + Khamrah + Club de Nuit",
    precio: 420000,
    desc: [
      "Los tres pesos pesados de la perfumería árabe en un solo combo. Tres fragancias de duración extrema que cubren la noche, el frío y las ocasiones especiales sin repetir registro."
    ],
    incluye: [
      ["Asad — Lattafa", "Café, tabaco y maderas ahumadas: presencia y carácter."],
      ["Khamrah — Lattafa", "Canela, dátiles y vainilla: el gourmand especiado."],
      ["Club de Nuit Intense — Armaf", "Frutal ahumado elegante para cualquier plan."]
    ],
    ideal: "Quien quiere estelas potentes y duraderas con la mejor relación calidad-precio.",
    foto: "combo-asad-khamrha-clubnuit.jpg"
  },
  {
    id: "comboeros", titulo: "Trío Seductor Oriental",
    nombre: "Asad + Versace Eros + Oud for Glory",
    precio: 545000,
    desc: [
      "Tres registros de seducción: la frescura dulce mediterránea de Eros, la fuerza ahumada de Asad y el lujo profundo del oud. Un arsenal completo para la noche."
    ],
    incluye: [
      ["Asad — Lattafa", "Café, tabaco y ámbar: el león de Lattafa."],
      ["Eros — Versace", "Menta, manzana verde y vainilla: frescura seductora italiana."],
      ["Bade’e Al Oud for Glory — Lattafa", "Azafrán y oud ambarado: opulencia oriental."]
    ],
    ideal: "El hombre que alterna entre lo fresco-seductor y lo oriental intenso.",
    foto: "combo-asad-eros-oudforglory.jpg"
  },
  {
    id: "combobleuchanel", titulo: "Trío Ícono de Diseñador",
    nombre: "Sauvage + Bleu de Chanel + 212 VIP Black",
    precio: 1390000,
    desc: [
      "Tres de los masculinos más halagados del mundo: el magnetismo de Sauvage, la elegancia amaderada de Bleu de Chanel y la energía nocturna de 212 VIP Black. Día, oficina y fiesta cubiertos."
    ],
    incluye: [
      ["Sauvage — Dior", "Bergamota y ambroxan: el fresco magnético universal."],
      ["Bleu de Chanel", "Cítricos, incienso y cedro: elegancia para toda ocasión."],
      ["212 VIP Black — Carolina Herrera", "Absenta y vainilla negra: el alma de la fiesta."]
    ],
    ideal: "Armar una rotación de lujo con tres imprescindibles comprobados.",
    foto: "combo-dior-bluechanel-212.jpg"
  },
  {
    id: "combocreed", titulo: "Cuarteto Premium",
    nombre: "Eros + Sauvage + Silver Mountain Water + 212 Men",
    precio: 2650000,
    desc: [
      "Cuatro fragancias, cuatro escenarios. La frescura alpina de Creed, el ADN urbano de 212, la seducción de Eros y el infalible Sauvage: una colección completa en una sola compra."
    ],
    incluye: [
      ["Eros — Versace", "Menta y vainilla: seducción mediterránea."],
      ["Sauvage — Dior", "El best-seller fresco especiado."],
      ["Silver Mountain Water — Creed", "Té verde y grosella: aire puro de los Alpes."],
      ["212 Men NYC — Carolina Herrera", "Verde-almizclado urbano, un clásico noventero."]
    ],
    ideal: "El coleccionista que quiere variedad premium de un solo golpe.",
    foto: "combo-eros-dior-creed-212.jpg"
  },
  {
    id: "comboone", titulo: "Trío Fiesta Total",
    nombre: "One Million + Le Male + 212 VIP Men",
    precio: 1090000,
    desc: [
      "Los tres reyes de la noche: el lingote dorado, el marinero de Gaultier y el alma de las fiestas de Nueva York. Tres estelas dulces-especiadas que nunca pasan desapercibidas."
    ],
    incluye: [
      ["One Million — Rabanne", "Canela, cuero y ámbar: puro protagonismo."],
      ["Le Male — Jean Paul Gaultier", "Lavanda, menta y vainilla: el seductor clásico."],
      ["212 VIP Men — Carolina Herrera", "Vodka helada, menta y ámbar: fiesta neoyorquina."]
    ],
    ideal: "Salidas nocturnas, citas y quien ama las estelas dulces.",
    foto: "combo-onemillion,lemale,212.jpg"
  },
  {
    id: "combococo", titulo: "Trío Elegancia Femenina",
    nombre: "Good Girl Blush + Coco Mademoiselle + Yara",
    precio: 1180000,
    desc: [
      "Tres estilos de feminidad: la elegancia parisina de Chanel, el romanticismo rosado de Blush y la dulzura cremosa de Yara. Un guardarropa olfativo completo."
    ],
    incluye: [
      ["Good Girl Blush — Carolina Herrera", "Peonía y vainilla: romance luminoso."],
      ["Coco Mademoiselle — Chanel", "Rosa, jazmín y pachulí: clase atemporal."],
      ["Yara — Lattafa", "Orquídea y vainilla: dulzura de terciopelo."]
    ],
    ideal: "Regalo seguro o rotación diaria de día, oficina y noche.",
    foto: "combo-coco-blush-yara.jpg"
  },
  {
    id: "combogoodgirl", titulo: "Colección Good Girl",
    nombre: "Good Girl + Blush + Very Good Girl",
    precio: 1420000,
    desc: [
      "La trilogía completa del tacón más famoso de la perfumería: la original nocturna, la rosada romántica y la roja frutal. Tres facetas de una misma actitud."
    ],
    incluye: [
      ["Good Girl", "Nardos, café y tonka: la sensual original."],
      ["Good Girl Blush", "Peonía y vainilla: la más dulce y diurna."],
      ["Very Good Girl", "Frambuesa y rosa: energía frutal con carácter."]
    ],
    ideal: "Fans de Carolina Herrera y coleccionistas del stiletto.",
    foto: "combo-goodgirl.jpg"
  },
  {
    id: "combomoschino", titulo: "Trío Dulce Juvenil",
    nombre: "Toy 2 Bubble Gum + Good Girl Blush + Thank U Next",
    precio: 1050000,
    desc: [
      "Pura diversión: el chicle de Moschino, el romance de Blush y el postre de Ariana. Tres perfumes alegres, dulces y juveniles para variar toda la semana."
    ],
    incluye: [
      ["Toy 2 Bubble Gum — Moschino", "Sorbete de pera y chicle: dulzura pop."],
      ["Good Girl Blush — Carolina Herrera", "Peonía y vainilla cremosa."],
      ["Thank U Next — Ariana Grande", "Frambuesa, coco y macarrón."]
    ],
    ideal: "Quien ama lo dulce, lo divertido y lo coleccionable.",
    foto: "combo-toy2-goodblush-thanku.jpg"
  },
  {
    id: "comboyara", titulo: "Trío Dulzura Total",
    nombre: "Yara + Good Girl Blush + Thank U Next",
    precio: 850000,
    desc: [
      "Tres best-sellers dulces que se complementan a la perfección: la cremosidad árabe de Yara, la elegancia rosada de Blush y el toque juguetón de Thank U Next."
    ],
    incluye: [
      ["Yara — Lattafa", "Orquídea, heliotropo y vainilla: el fenómeno viral."],
      ["Good Girl Blush — Carolina Herrera", "El tacón en su versión más romántica."],
      ["Thank U Next — Ariana Grande", "Pera, coco y macarrón: dulzura con actitud."]
    ],
    ideal: "Amantes de las estelas dulces que reciben cumplidos.",
    foto: "combo-yara-goodblush-thanku.jpg"
  }
];

module.exports = { PERFUMES, COMBOS };
