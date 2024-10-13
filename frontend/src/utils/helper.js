/**
 * Helper object that contains validators and API utility functions.
 *
 */
export const Helper = {
  config: {
    newsPerPage: 10,
  },
  validators: {
    name: (name) => /^[a-zA-Z\s]{2,}$/.test(name),
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: (password) => typeof password === 'string' && password.length >= 8,
  },
  returnObj: (success, data) => {
    return {
      success,
      data,
    };
  },
  // Local Storage Helper - separated from the main helper object
  localStorage: {
    setItem: (key, value) => {
      console.log(key, value)
      try {
        const data = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, data);
        return Helper.returnObj(true, null); // Return success status and the stored data
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        return Helper.returnObj(false, error.message); // Return error message
      }
    },
    getItem: (key) => {
      try {
        const data = localStorage.getItem(key);
        const parsedData = data ? JSON.parse(data) : null;
        return Helper.returnObj(true, parsedData); // Return success status and the data
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return Helper.returnObj(false, error.message); // Return error message
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
        return Helper.returnObj(true, `${key} removed`); // Return success status and the key that was removed
      } catch (error) {
        console.error("Error removing from localStorage:", error);
        return Helper.returnObj(false, error.message); // Return error message
      }
    },

  },
  isUserLoggedIn: () => {
    const token = Helper.localStorage.getItem("token");
    const user = Helper.localStorage.getItem("user");

    return token.success && token.data && user.success && user.data ? true : false;
  },
  logoutUser: () => {
    const removeToken = Helper.localStorage.removeItem("token");
    const removeUser = Helper.localStorage.removeItem("user");

    if (removeToken.success && removeUser.success) {
      return Helper.returnObj(true, "User logged out successfully");
    } else {
      return Helper.returnObj(false, "Error logging out");
    }
  },
  arrayToIdLabelObj: (array) => {
    const result = {};
    array.forEach(item => {
      result[item] = {
        id: item,
        label: item.charAt(0).toUpperCase() + item.slice(1)
      };
    });
    return result;
  },

  openInNewTab: (url) => {
    const win = window.open(url, "_blank");
    win.focus();
  },

  formatIsoDate: (isoDate) => {
    
    if (!isoDate) return "";

    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  },
  
  /**
   * 
   * @param {string} id 
   * @param {function} setStateFn 
   * @returns 
   */
  handleCheckBoxChangeArray: (id, setStateFn) => {
    return setStateFn((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((obId) => obId !== id)
        : [...prevSelected, id]
    );
  }
}
