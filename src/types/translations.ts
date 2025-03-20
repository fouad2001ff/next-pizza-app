export type Translations = {
    // nav: {
    //   pizza: string;
    //   menu: string;
    //   about: string;
    //   contact: string;
    //   login: string;
    // };
    // hero: {
    //   title: string;
    //   description: string;
    //   orderNow: string;
    //   learnMore: string;
    // };
    // bestSellers: {
    //   title: string;
    //   subtitle: string;
    //   noProducts: string;
    // };
    // about: {
    //   title: string;
    //   subtitle: string;
    //   description1: string;
    //   description2: string;
    //   description3: string;
    // };
    // contact: {
    //   title: string;
    //   subtitle: string;
    //   phone: string;
    // };
    // footer: {
    //   copyright: string;
    // };
    // checkout: {
    //   title: string;
    //   phone: string;
    //   enterPhone: string;
    //   streetAddress: string;
    //   enterAddress: string;
    //   postalCode: string;
    //   enterPostalCode: string;
    //   city: string;
    //   enterCity: string;
    //   country: string;
    //   enterCountry: string;
    //   pay: string;
    // };
    validation: {
      nameRequired: string;
      invalidEmail: string;
      passwordMinLength: string;
      passwordMaxLength: string;
      confirmPasswordRequired: string;
      passwordMismatch: string;
    };
    messages: {
        userNotFound?: string;
        incorrectPassword?: string;
        loginSuccessful?: string;
        unexpectedError?: string;
        userAlreadyExists?: string;
        accountCreated?: string;
        updateProfileSucess?: string;
        categoryAdded?: string;
        updatecategorySucess?: string;
        deleteCategorySucess?: string;
        productAdded?: string;
        updateProductSucess?: string;
        deleteProductSucess?: string;
        updateUserSucess?: string;
        deleteUserSucess?: string;
      };
  };
  
  export default Translations;
  