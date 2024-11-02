tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        underlineExpand: {
          "0%": { backgroundSize: "0% 4px" },
          "100%": { backgroundSize: "100% 4px" },
        },
      },
      animation: {
        underlineExpand: "underlineExpand 0.5s ease-out forwards",
      },
    },
  },
};
