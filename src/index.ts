// Variable to control created style name
const STYLE_NAME = "interviewStyle"

// Variable to control whether to create a new style, or use an element's existing style
const CREATE_NEW_STYLE = true


document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault()

  // Declare our style variable for later use
  let newStyle

  // Get the currently selected element in the Designer
  const el = await webflow.getSelectedElement()

  // If element is found and has the ability to update text content
  if (el && el.textContent) {

    // Checking if styles exist; to see if a new one should be created
    const elStyles = await el.getStyles()

    if (elStyles.length == 0 || CREATE_NEW_STYLE) {

      // Check if our style name has already been used. If so, use existing style.
      if (! (newStyle = await webflow.getStyleByName(STYLE_NAME))) {
        newStyle = webflow.createStyle(STYLE_NAME)
      }
    }

    // Alternate method of setting font, size, and color, by editing
    // an element's existing class/style, rather than create a new one.
    // This uses the last-applied class to ensure style changes take effect
    else {
      newStyle = elStyles[elStyles.length - 1]
    }

    // Set the style font, size, and color
    newStyle.setProperties({
      "font-family": "Cursive",
      "font-size": "20px",
      "color": "#0073E6"
    })

    // We must save the style for changes to persist
    await newStyle.save()

    // #### NOTE ####
    // Since combo class creation/editing is not supported via the Design API
    // this does not check for existing styles and will overwrite any existing
    // element styles
    el.setStyles([newStyle])

    // Finally, save the changes to the element & they will be reflected in the Designer
    await el.save()
  }
}
