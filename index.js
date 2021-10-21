const moovieUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=d0af46ab";
function getMovie(title) {
  return fetch(`${moovieUrl}&t=${title}`).then((x) => x.json());
}

function getCountry(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then((x) =>
    x.json()
  );
}

// 1. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და გვეტყვის რამდენი  წლის წინ გამოვიდა ეს ფილმი.
async function getAge(title) {
  const movie = await getMovie(title);
  console.log(movie);
  const releaseDate = movie.Year;
  var today = new Date();
  var year = today.getFullYear();
  const age = year - releaseDate;
  return age;
}
getAge("Interstelar").then((x) => console.log(x));

// 2. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და დაგვიბრუნებს ამ  ფილმის მსახიობების სახელების მასივს (გვარების გარეშე)
async function getActors(title) {
  const movie = await getMovie(title);
  const actors = movie.Actors.split(", ");
  const finalArr = actors.reduce((result, curr) => {
    result.push(curr.split(" ")[0]);
    return result;
  }, []);
  return finalArr;
}

getActors("Avatar").then((x) => console.log(x));

// 3. დაწერეთ ფუნქცია, რომელიც დააბრუნებს იმ ქვეყნის ვალუტას, საიდანაც თქვენი  ერთერთი საყვარელი ფილმია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული,  ავიღოთ პირველი)

async function currency(country) {
  const cont = await getCountry(country);
  return cont[0].currencies[Object.keys(cont[0].currencies)[0]].name;
}

async function getcurrency(title) {
  const movie = await getMovie(title);
  const country = movie.Country.split(" ")[0];
  return currency(country);
}
getcurrency("Interstelar").then((x) => console.log(x));

// 4. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და გვეტყვის ჯამში რამდენი საათი და რამდენი წუთია ყველა ფილმის ხანგრძლივობა ერთად.
async function getDuration(title) {
  const movie = await getMovie(title);
  const dur = movie.Runtime.split(" ")[0];
  return Number(dur);
}

async function getTotal(a, b, c) {
  const durations = await Promise.all([
    getDuration(a),
    getDuration(b),
    getDuration(c),
  ]);
  return durations.reduce((sum, curr) => (sum += curr), 0);
}

getTotal("Avatar", "Interstelar", "harry potter").then((x) => console.log(x));

// 5. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და დაგვიბრუნებს იმ ქვეყნების მოსახლეობების ჯამს, საიდანაც ეს ფილმებია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული, ავიღოთ პირველი)

async function getPopulation(country) {
  const count = await getCountry(country);
  return count[0].population;
}

async function getCountryPopulation(title) {
  const movie = await getMovie(title);
  const country = movie.Country.split(", ")[0];
  return getPopulation(country);
}

async function getTotalPopulation(a, b, c) {
  const total = await Promise.all([
    getCountryPopulation(a),
    getCountryPopulation(b),
    getCountryPopulation(c),
  ]);

  return total.reduce((sum, curr) => (sum += curr));
}

getTotalPopulation("Avatar", "Interstelar", "harry potter").then((x) =>
  console.log(x)
);
