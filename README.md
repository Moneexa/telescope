# Edge Cases

This document outlines the product and technical edge cases identified during the development process, along with insights into their handling. We discuss the API handling.

## Product Edge Cases

### 1. Backend Crash or Poor Network

- **Scenario**: Backend service crashes or network issues occur during operations.
- **Implemented Strategy**: Implemented error handling, and used alerts to inform the user with appropriate error messages

### 2. Empty Database

- **Scenario**: The database contains no entries.
- **Implemented Strategy**: Displayed an alert message indicating no data is available, rather than showing a blank or broken UI.

### 3. Changes in Backend Entries

- **Scenario**: Backend entry data changes if some other user edits the information.
- **Implemented Strategy**: Updated data is not reflected in the app unless user refreshes the page.

### 4. Form Submission Without Setting a Pin

- **Scenario**: User attempts to submit a form without setting a pin.
- **Implemented Strategy**: After the form is submitted, backend throws an error (arguable) that latitude and longitude have not been sent.

### 5. Missing Geocoding API Parameters

- **Scenario**: Geocoding API does not return a specific parameter like postal code/city/address.
- **Implemented Strategy**: We keep those entries as empty string, so that if user wishes, they can fill those values.

### 6. Mismatched Pin and Form Entries

- **Scenario**: User sets a pin somewhere but changes the form entries to reflect a different location.
- **Implemented Strategy**: Nothing happens, the user address is not validated as such. Although the pin coordinates should be correct.

### 7. Viewing a Nonexistent Property

- **Scenario**: User attempts to view a property with an ID that does not exist.
- **Implemented Strategy**: User is shown an alert this page does not exist.

### 8. Stale Properties List

- **Scenario**: Context provider state is not in sync with backend data.
- **Implemented Strategy**: Unless the user refreshes the page, new data is not updated.

## Technical Edge Cases

### 1. Missing Tailwind Classes

- **Scenario**: Some required classes are not available in Tailwind (e.g., custom pixel sizes).
- **Implemented Strategy**: We had to provide them manually in the classNames with the hyphen.

### 2. Silent Errors with Wrong Class Names or Variables

- **Scenario**: Incorrect class names or variables do not give compile time /build time errors.
- **Implemented Strategy**: We kept a manual check to ensure the classNames given are correct.

### 3. ShadCN Breadcrumb Performance Issue

- **Scenario**: BreadcrumbLink `href` causes the resources to be loaded again and again every time navigation happens, this causes load on server side and client side
- **Implemented Strategy**: Replaced BreadcrumbLink with React Router's `Link` component to handle navigation without server-side reloading.

### 4. UUID Changes Impacting Breadcrumbs

- **Scenario**: if UUID format changes in the backend, then the breadcrumb will not behave normal specifically for `view-property/:propertyId` url.
- **Implemented Strategy**: At the moment, only specific type of UUID is handled, we have to extend it so that the breadcrumb works for all kinds of urls.

### 5. Tailwind and Background Images

- **Scenario**: Tailwind CSS does not support setting certain background images.
- **Implemented Strategy**: Apply background images directly using inline styles or in the `body` tag of the application.

# Data Refreshing Approaches

## Refreshing Properties List

### Option 1: Fetching Properties in Each Component

- **Pros**:
  - Ensures the freshest data is fetched every time a component is mounted.
- **Cons**:
  - Increases the number of API calls per each componemt, potentially impacting performance and server load.

### Option 2: Fetching Properties Once in Context

- **Pros**:
  - Reduces the number of API calls, improving performance.
- **Cons**:

  - List may not reflect updates dynamically unless explicitly refreshed.

- We used Option 2, because performance is an important concern due to lack of resources, also high data availability is not a priority.

## Getting Location Data

### Option 1: User clicks on map and selects location

- **Pros**: - Easy implementation, give accurate results.
- **Cons**: - All the users cannot be aware of exact location on map.

### Option 2: User writes addresses, and pin is placed on map automatically.

- **Pros**: - Meaningful solution for layman user.
- **Cons**: - Very technically extensive to implement and time consuming.

- We used option 1 due to time constraint.

# API Usage

## Library used

### Option 1: Axios

- **Pros**: - Serves functionality
- **Cons**: - Additional installation of lib

### Option 2: Fetch

- **Pros**: - Serves functionality - No library installation
- **Cons**: - Writing additional lines of code to get the backend data and error.

- We used Option 2, because additional dependancy is unnecessary.

## Strategy to Get the Data from API

- We created a generic function to handle API calls.
- Used `async` and `await` to handle the asynchronous nature of API responses.
- Enclosed response handling within a `try-catch` block to manage errors effectively.
- Implemented a discriminated union type structure to handle API responses. The structure is as follows:
  `type Response<T>= { status: "loading" }  | 
{ status: "error", error: string } |
{ status: "success", data: T }`
- When response.ok is true, then we await the response to get the desired data key. We return the response from this block as follows: `{status:"success", data:response.data}`
- When response.ok is not true then we await the response to get the error key. Code comes here usually when the backend gives error in 400 range. we return following from here `{status:"error", error:response.error}`
- In order to handle the errors of 500 range, we use catch block, and return the errors in following way: `{status:"error", error:"Internal Server Error, try again later"}`

### Comparison: Discriminated Union/Union Type vs Without them while using API Generic Function

| **Aspect**               | **Discriminated Union/Union Type Structure**                                                                                                                                                                                                                                                                                                                                               | **Classic Approach**                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Code Simplification**  | Pushes developer to return the data when status is success, and error when there is an failure in the API call.                                                                                                                                                                                                                                                                            | During development one can simply not tell from the response return type, if there is an error or an actual response, there is no way checking that.                          |
| **Error Identification** | Errors can be directly accessed when `status` is `"error"`. Also it improves intellisense to check message when the status is error. To the discriminated union, we can enforce to add statusCode of the error received, this way developer will provide the statusCode when status is error, and the function using this call, can easily invoke other actions based on the status codes. | Check voluntarily when the error is thrown, if error is not checked, then there is no way the compiler tells you to handle the issue, this can cause production level issues. |
