
export type PromptCategory = {
  name: string;
  description: string;
  examples: string[];
};

export const promptCategories: PromptCategory[] = [
  {
    name: "European Capitals",
    description: "Name a European capital city",
    examples: [
      "London",
      "Paris",
      "Berlin",
      "Madrid",
      "Rome",
      "Athens",
      "Vienna",
      "Amsterdam",
      "Brussels",
      "Budapest",
      "Copenhagen",
      "Dublin",
      "Helsinki",
      "Lisbon",
      "Oslo",
      "Prague",
      "Stockholm",
      "Warsaw"
    ]
  },
  {
    name: "Football Players",
    description: "Name a famous football (soccer) player",
    examples: [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Neymar Jr.",
      "Kylian Mbappé",
      "Robert Lewandowski",
      "Mohamed Salah",
      "Kevin De Bruyne",
      "Erling Haaland",
      "Sergio Ramos",
      "Luka Modric",
      "Toni Kroos",
      "Thomas Müller",
      "Harry Kane",
      "Virgil van Dijk",
      "Trent Alexander-Arnold"
    ]
  },
  {
    name: "Movie Titles",
    description: "Name a popular movie",
    examples: [
      "The Godfather",
      "Star Wars",
      "Titanic",
      "Avatar",
      "The Dark Knight",
      "Pulp Fiction",
      "Forrest Gump",
      "The Matrix",
      "Jurassic Park",
      "The Lion King",
      "Back to the Future",
      "Inception",
      "The Avengers",
      "Jaws",
      "E.T. the Extra-Terrestrial"
    ]
  },
  {
    name: "Fruits",
    description: "Name a fruit",
    examples: [
      "Apple",
      "Banana",
      "Orange",
      "Strawberry",
      "Grape",
      "Pineapple",
      "Mango",
      "Watermelon",
      "Blueberry",
      "Peach",
      "Kiwi",
      "Pear",
      "Cherry",
      "Lemon",
      "Avocado"
    ]
  },
  {
    name: "Car Brands",
    description: "Name a car manufacturer",
    examples: [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Volkswagen",
      "Tesla",
      "Nissan",
      "Hyundai",
      "Kia",
      "Porsche",
      "Ferrari",
      "Lamborghini"
    ]
  },
  {
    name: "Animals",
    description: "Name an animal",
    examples: [
      "Lion",
      "Elephant",
      "Tiger",
      "Giraffe",
      "Monkey",
      "Bear",
      "Wolf",
      "Eagle",
      "Dolphin",
      "Shark",
      "Penguin",
      "Kangaroo",
      "Zebra",
      "Panda",
      "Koala"
    ]
  },
  {
    name: "Countries",
    description: "Name a country",
    examples: [
      "United States",
      "Canada",
      "Brazil",
      "Mexico",
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Japan",
      "China",
      "India",
      "Australia",
      "Russia",
      "South Africa"
    ]
  },
  {
    name: "Musical Instruments",
    description: "Name a musical instrument",
    examples: [
      "Piano",
      "Guitar",
      "Violin",
      "Drums",
      "Flute",
      "Saxophone",
      "Trumpet",
      "Cello",
      "Clarinet",
      "Harp",
      "Accordion",
      "Bass",
      "Trombone",
      "Harmonica",
      "Ukulele"
    ]
  },
];

export const getRandomPrompt = (): { prompt: string; category: string } => {
  const randomCategoryIndex = Math.floor(Math.random() * promptCategories.length);
  const category = promptCategories[randomCategoryIndex];
  
  return {
    prompt: category.description,
    category: category.name
  };
};
