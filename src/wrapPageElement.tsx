import React from "react"
import withDefaults from "../defaults"
import { ContextProvider } from "./ContextProvider"

export const wrapPageElement = ({ element, props }, themeOptions) => {
  if (!props) return
  const { data, pageContext } = props
  const { language, languages, originalPath, defaultLanguage, path } =
    pageContext

  console.log(
    "gatsby-shopify-manager wrapPageElement 30/05/23: ",
    pageContext,
    path
  )

  const { shouldWrapRootElementWithProvider, shopName, accessToken } =
    withDefaults(themeOptions)

  if (shouldWrapRootElementWithProvider === false) {
    return element
  }

  const missingApiInformation = shopName == null || accessToken == null
  if (missingApiInformation) {
    throw new Error(
      "gatsby-shopify-manager: You forgot to pass in a shopName or accessToken to the theme options"
    )
  }

  return (
    <ContextProvider
      shopName={shopName}
      accessToken={accessToken}
      language={language === "en" ? "en-GB" : "de-de"}
    >
      {element}
    </ContextProvider>
  )
}
