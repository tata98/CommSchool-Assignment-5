interface Movie {
  Title: string;
  Duration: string;
  Country: string;
  Year: string;
  Actors: string;
  Runtime: string;
}

interface Country {
  Name: string;
  population: string;
  currencies: Record<string, { name: string; symbol: string }>;
}

// const moovieUrl: string = "http://www.omdbapi.com/?i=tt3896198&apikey=d0af46ab";
function getMovie(title: string): Promise<Movie> {
  return fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=d0af46ab&t=${title}`
  ).then((x) => x.json());
}

function getCountry(country: string): Promise<Array<Country>> {
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then((x) =>
    x.json()
  );
}

// 1. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და გვეტყვის რამდენი  წლის წინ გამოვიდა ეს ფილმი.
async function getAge(title: string): Promise<number> {
  const movie: Movie = await getMovie(title);
  console.log(movie);
  const releaseDate: string = movie.Year;
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const age: number = year - Number(releaseDate);
  return age;
}
getAge("Interstelar").then((x) => console.log(x));

// 2. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და დაგვიბრუნებს ამ  ფილმის მსახიობების სახელების მასივს (გვარების გარეშე)
async function getActors(title: string): Promise<string[]> {
  const movie: Movie = await getMovie(title);
  const actors: string[] = movie.Actors.split(", ");
  const finalArr: string[] = actors.reduce((result: string[], curr: string) => {
    result.push(curr.split(" ")[0]);
    return result;
  }, []);
  return finalArr;
}

getActors("Avatar").then((x) => console.log(x));

// 3. დაწერეთ ფუნქცია, რომელიც დააბრუნებს იმ ქვეყნის ვალუტას, საიდანაც თქვენი  ერთერთი საყვარელი ფილმია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული,  ავიღოთ პირველი)

async function currency(country: string): Promise<string> {
  const cont: Country[] = await getCountry(country);
  return cont[0].currencies[Object.keys(cont[0].currencies)[0]].name;
}

async function getcurrency(title: string): Promise<string> {
  const movie: Movie = await getMovie(title);
  const country: string = movie.Country.split(" ")[0];
  return currency(country);
}
getcurrency("Interstelar").then((x) => console.log(x));

// 4. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და გვეტყვის ჯამში რამდენი საათი და რამდენი წუთია ყველა ფილმის ხანგრძლივობა ერთად.
async function getDuration(title: string): Promise<number> {
  const movie: Movie = await getMovie(title);
  const dur: number = Number(movie.Runtime.split(" ")[0]);
  return dur;
}

async function getTotal(a: string, b: string, c: string): Promise<number> {
  const durations: number[] = await Promise.all([
    getDuration(a),
    getDuration(b),
    getDuration(c),
  ]);
  return durations.reduce((sum: number, curr: number) => (sum += curr), 0);
}

getTotal("Avatar", "Interstelar", "harry potter").then((x) => console.log(x));

// 5. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და დაგვიბრუნებს იმ ქვეყნების მოსახლეობების ჯამს, საიდანაც ეს ფილმებია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული, ავიღოთ პირველი)

async function getPopulation(country: string): Promise<number> {
  const count: Country[] = await getCountry(country);
  return Number(count[0].population);
}

async function getCountryPopulation(title: string): Promise<number> {
  const movie: Movie = await getMovie(title);
  const country: string = movie.Country.split(", ")[0];
  return getPopulation(country);
}

async function getTotalPopulation(
  a: string,
  b: string,
  c: string
): Promise<number> {
  const total = await Promise.all([
    getCountryPopulation(a),
    getCountryPopulation(b),
    getCountryPopulation(c),
  ]);

  return total.reduce((sum: number, curr: number) => (sum += curr));
}

getTotalPopulation("Avatar", "Interstelar", "harry potter").then((x) =>
  console.log("total population is: " + x)
);
