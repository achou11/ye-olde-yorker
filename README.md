![Dat](https://dat-badge.glitch.me/2061897e7f3ee41f5598bcf09ace7f108cd210fcc8896d9ea5a35b416b8705ac/badge.svg)

# Ye Olde Yorker

I stumbled upon the The New Yorker's random cartoon API and decided to build somethingwith it. This is that something.

Heavily inspired by their [random cartoon generator](https://newyorker.com/cartoons/random/) app.

Some future features:

- Use the dat and Beaker APIs to facilitate some p2p image sharing
  - save original image url + user caption in a JSON format? i.e.
  
  ```json
  // archive.json
  {
    "archive": {
      "users": [
        {
          "datUrl": "dat://thedatuserurl",
          "images": [
            {
              "imageUrl": "https://url-to-the-original-image",
              "caption": "This is the custom caption made for the image"
            },
            {
              "imageUrl": "https://url-to-the-original-image",
              "caption": "This is the custom caption made for the image"
            }
          ]
        }
      ]
    }
  }
  ```
  
- Add social media share features
- Create a twitter account that reads the archive (from Beaker Browser / Dat users) and does a daily tweet thing with attribution and whatnot
