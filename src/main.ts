const keywordInput = document.getElementById("keyword") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

searchBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    resultDiv.innerHTML = "<p>国名を入力してください</p>";
    return;
  }

  resultDiv.innerHTML = "<p>検索中...</p>";

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${keyword}`
    );

    if (!response.ok) {
      throw new Error("not found");
    }

    const data = await response.json();
    const country = data[0];

    const name = country.name.common;
    const capital = country.capital?.[0] ?? "なし";
    const flag = country.flags.png;

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="${flag}" width="150" />
      <p>首都：${capital}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>国が見つかりませんでした</p>";
  }
});
