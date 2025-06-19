const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY

export const translateToEnglish = async (text) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "vi",
        target: "en",
        format: "text",
      }),
    });

    const data = await response.json();

    if (data?.data?.translations?.[0]?.translatedText) {
      return data.data.translations[0].translatedText;
    }

    console.warn("Unexpected translation response:", data);
    return text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
};

export const translateToVietnamese = async (text) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "ja", // Japanese
        target: "vi", // Vietnamese
        format: "text",
      }),
    });

    const data = await response.json();

    if (data?.data?.translations?.[0]?.translatedText) {
      return data.data.translations[0].translatedText;
    }

    console.warn("Unexpected translation response (to VI):", data);
    return text;
  } catch (error) {
    console.error("Translation to Vietnamese failed:", error);
    return text;
  }
};
