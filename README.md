# Example-splitio-counter
Example showing how to use a counter to limit only a certain number of users to a certain treatment


This project demonstrates how to integrate [Split.io](https://www.split.io/) feature flags with a a counter based upon a backend datasource

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A Split.io account with a valid SDK key

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/split-community/example-splitio-counter.git
   cd example-splitio-counter
   ```

2. Install dependencies with `npm install`
3. Configure your Split.io SDK key:
    Replace `SDK_KEY` in index.js with your actual Split.io SDK key.

### Setup in Split.io
1. Create a feature flag called `flag_only_show_to_10`
2. Ensure that it has a `count` attribute to show `on` to any count less than or equal to 10, and `off` otherwise
3. ![image](https://github.com/Split-Community/example-nodejs-counter/assets/1207274/b59a2802-b468-4840-93dc-66a2e6d06e3b)


### Usage
1. Start the express server with `npm start`
2. Open your web browser and visit http://localhost:3000/ to see the application in action.
3. As you refresh the page, a new random userid will be generated
4. The first 10 users to hit the page will get `on`, and anyone else will get `off`
5. ![image](https://github.com/Split-Community/example-splitio-counter/assets/1207274/86a09255-87b2-470d-b380-afbc9e875a06)
