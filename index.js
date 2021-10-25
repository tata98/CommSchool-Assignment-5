var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// const moovieUrl: string = "http://www.omdbapi.com/?i=tt3896198&apikey=d0af46ab";
function getMovie(title) {
    return fetch("http://www.omdbapi.com/?i=tt3896198&apikey=d0af46ab&t=" + title).then(function (x) { return x.json(); });
}
function getCountry(country) {
    return fetch("https://restcountries.com/v3.1/name/" + country).then(function (x) {
        return x.json();
    });
}
// 1. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და გვეტყვის რამდენი  წლის წინ გამოვიდა ეს ფილმი.
function getAge(title) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, releaseDate, today, year, age;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovie(title)];
                case 1:
                    movie = _a.sent();
                    console.log(movie);
                    releaseDate = movie.Year;
                    today = new Date();
                    year = today.getFullYear();
                    age = year - Number(releaseDate);
                    return [2 /*return*/, age];
            }
        });
    });
}
getAge("Interstelar").then(function (x) { return console.log(x); });
// 2. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და დაგვიბრუნებს ამ  ფილმის მსახიობების სახელების მასივს (გვარების გარეშე)
function getActors(title) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, actors, finalArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovie(title)];
                case 1:
                    movie = _a.sent();
                    actors = movie.Actors.split(", ");
                    finalArr = actors.reduce(function (result, curr) {
                        result.push(curr.split(" ")[0]);
                        return result;
                    }, []);
                    return [2 /*return*/, finalArr];
            }
        });
    });
}
getActors("Avatar").then(function (x) { return console.log(x); });
// 3. დაწერეთ ფუნქცია, რომელიც დააბრუნებს იმ ქვეყნის ვალუტას, საიდანაც თქვენი  ერთერთი საყვარელი ფილმია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული,  ავიღოთ პირველი)
function currency(country) {
    return __awaiter(this, void 0, void 0, function () {
        var cont;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCountry(country)];
                case 1:
                    cont = _a.sent();
                    return [2 /*return*/, cont[0].currencies[Object.keys(cont[0].currencies)[0]].name];
            }
        });
    });
}
function getcurrency(title) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, country;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovie(title)];
                case 1:
                    movie = _a.sent();
                    country = movie.Country.split(" ")[0];
                    return [2 /*return*/, currency(country)];
            }
        });
    });
}
getcurrency("Interstelar").then(function (x) { return console.log(x); });
// 4. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და გვეტყვის ჯამში რამდენი საათი და რამდენი წუთია ყველა ფილმის ხანგრძლივობა ერთად.
function getDuration(title) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, dur;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovie(title)];
                case 1:
                    movie = _a.sent();
                    dur = Number(movie.Runtime.split(" ")[0]);
                    return [2 /*return*/, dur];
            }
        });
    });
}
function getTotal(a, b, c) {
    return __awaiter(this, void 0, void 0, function () {
        var durations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getDuration(a),
                        getDuration(b),
                        getDuration(c),
                    ])];
                case 1:
                    durations = _a.sent();
                    return [2 /*return*/, durations.reduce(function (sum, curr) { return (sum += curr); }, 0)];
            }
        });
    });
}
getTotal("Avatar", "Interstelar", "harry potter").then(function (x) { return console.log(x); });
// 5. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და დაგვიბრუნებს იმ ქვეყნების მოსახლეობების ჯამს, საიდანაც ეს ფილმებია. (თუ რამდენიმე ქვეყანაა ფილმზე მითითებული, ავიღოთ პირველი)
function getPopulation(country) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCountry(country)];
                case 1:
                    count = _a.sent();
                    console.log(count[0].population);
                    return [2 /*return*/, Number(count[0].population)];
            }
        });
    });
}
function getCountryPopulation(title) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, country;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovie(title)];
                case 1:
                    movie = _a.sent();
                    country = movie.Country.split(", ")[0];
                    console.log(country);
                    return [2 /*return*/, getPopulation(country)];
            }
        });
    });
}
function getTotalPopulation(a, b, c) {
    return __awaiter(this, void 0, void 0, function () {
        var total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getCountryPopulation(a),
                        getCountryPopulation(b),
                        getCountryPopulation(c),
                    ])];
                case 1:
                    total = _a.sent();
                    return [2 /*return*/, total.reduce(function (sum, curr) { return (sum += curr); })];
            }
        });
    });
}
getTotalPopulation("Avatar", "Interstelar", "harry potter").then(function (x) {
    return console.log("result is:  " + x);
});
