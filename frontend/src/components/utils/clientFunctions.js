import { format } from "date-fns";
import toast from "react-hot-toast";
import xss from "xss";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

function convertKeysToNestedObject(input) {
  const output = {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key];
      const keys = key.split("."); // Split keys by '.' to get the hierarchy

      let current = output;

      // Loop through the key parts, and build the nested structure
      for (let i = 0; i < keys.length; i++) {
        const part = keys[i];

        // If this is the last key part, assign the value
        if (i === keys.length - 1) {
          current[part] = value;
        } else {
          // If the key doesn't exist, create an empty object
          if (!current[part]) {
            current[part] = {};
          }
          // Move deeper into the nested structure
          current = current[part];
        }
      }
    }
  }
  const finalOutput = { ...input, ...output };
  Object.keys(finalOutput).forEach((key) => {
    if (key.includes(".")) {
      delete finalOutput[key];
    }
  });
  return finalOutput;
}

export function formField(target) {
  const fields = {};
  for (const x in target) {
    if (Object.hasOwnProperty.call(target, x)) {
      const el = target[x];
      if (
        el &&
        el.type !== "file" &&
        el.type !== "checkbox" &&
        el.name &&
        el.name.length > 0
      ) {
        fields[el.name] = xss(
          target[el.name]?.value && target[el.name].value.trim()
        );
        if (el.getAttribute("data-type") === "multiple") {
          fields[el.name] = JSON.parse(fields[el.name]);
        }
      }
      if (el && el.type === "checkbox" && el.name && el.name.length > 0) {
        let checkboxes = [];
        for (const y in target) {
          if (Object.hasOwnProperty.call(target, y)) {
            const ckb = target[y];
            if (
              ckb.type === "checkbox" &&
              ckb.name === el.name &&
              ckb.checked
            ) {
              checkboxes.push(xss(ckb.value?.trim()));
            }
          }
        }
        fields[el.name] = checkboxes;
      }
    }
  }
  return convertKeysToNestedObject(fields);
}

export async function request(url, method, body, headers = {}, params = {}) {
  try {
    // Retrieve token from cookies
    const encryptedToken = Cookies.get("authToken");
    let decryptedData;

    if (encryptedToken) {
      const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with a secure key
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    const __url = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    let queryString = "";
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams(params);
      queryString = `?${queryParams.toString()}`;
    }
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(decryptedData?.token
          ? { Authorization: `Bearer ${decryptedData.token}` }
          : {}),
        ...headers,
      },
      cache: "no-store",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${__url}${queryString}`, options);

    if (!response.ok) {
      // Throw an error if response status is not ok
      const errorData = await response.json();
      throw new Error(
        errorData.message || "An error occurred while making the request."
      );
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
    toast.error(error.message || "An error occurred while making the request.");
  }
}

export function dateFormat(date) {
  return date ? format(date, "MMMM dd, yyyy") : "N/A";
}

export function formatMongoDateForInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
