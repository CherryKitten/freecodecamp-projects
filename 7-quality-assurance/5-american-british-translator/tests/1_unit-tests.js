const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

const translator = new Translator();

suite("Unit Tests", () => {
  suite("Translation tests", () => {
    suite("American to british", () => {
      test("Mangoes are my favorite fruit.", () => {
        assert.equal(
          translator.translate(
            "Mangoes are my favorite fruit.",
            "american-to-british"
          ),
          "Mangoes are my favourite fruit."
        );
      });
      test("I ate yogurt for breakfast.", () => {
        assert.equal(
          translator.translate(
            "I ate yogurt for breakfast.",
            "american-to-british"
          ),
          "I ate yoghurt for breakfast."
        );
      });
      test("We had a party at my friend's condo.", () => {
        assert.equal(
          translator.translate(
            "We had a party at my friend's condo.",
            "american-to-british"
          ),
          "We had a party at my friend's flat."
        );
      });
      test("Can you toss this in the trashcan for me?", () => {
        assert.equal(
          translator.translate(
            "Can you toss this in the trashcan for me?",
            "american-to-british"
          ),
          "Can you toss this in the bin for me?"
        );
      });
      test("The parking lot was full.", () => {
        assert.equal(
          translator.translate(
            "The parking lot was full.",
            "american-to-british"
          ),
          "The car park was full."
        );
      });
      test("Like a high tech Rube Goldberg machine.", () => {
        assert.equal(
          translator.translate(
            "Like a high tech Rube Goldberg machine.",
            "american-to-british"
          ),
          "Like a high tech Heath Robinson device."
        );
      });
      test("To play hooky means to skip class or work.", () => {
        assert.equal(
          translator.translate(
            "To play hooky means to skip class or work.",
            "american-to-british"
          ),
          "To bunk off means to skip class or work."
        );
      });
      test("No Mr. Bond, I expect you to die.", () => {
        assert.equal(
          translator.translate(
            "No Mr. Bond, I expect you to die.",
            "american-to-british"
          ),
          "No Mr Bond, I expect you to die."
        );
      });
      test("Dr. Grosh will see you now.", () => {
        assert.equal(
          translator.translate(
            "Dr. Grosh will see you now.",
            "american-to-british"
          ),
          "Dr Grosh will see you now."
        );
      });
      test("Lunch is at 12:15 today.", () => {
        assert.equal(
          translator.translate(
            "Lunch is at 12:15 today.",
            "american-to-british"
          ),
          "Lunch is at 12.15 today."
        );
      });
    });
    suite("British to american", () => {
      test("We watched the footie match for a while.", () => {
        assert.equal(
          translator.translate(
            "We watched the footie match for a while.",
            "british-to-american"
          ),
          "We watched the soccer match for a while."
        );
      });
      test("Paracetamol takes up to an hour to work.", () => {
        assert.equal(
          translator.translate(
            "Paracetamol takes up to an hour to work.",
            "british-to-american"
          ),
          "Tylenol takes up to an hour to work."
        );
      });
      test("First, caramelise the onions.", () => {
        assert.equal(
          translator.translate(
            "First, caramelise the onions.",
            "british-to-american"
          ),
          "First, caramelize the onions."
        );
      });
      test("I spent the bank holiday at the funfair.", () => {
        assert.equal(
          translator.translate(
            "I spent the bank holiday at the funfair.",
            "british-to-american"
          ),
          "I spent the public holiday at the carnival."
        );
      });
      test("I had a bicky then went to the chippy.", () => {
        assert.equal(
          translator.translate(
            "I had a bicky then went to the chippy.",
            "british-to-american"
          ),
          "I had a cookie then went to the fish-and-chip shop."
        );
      });
      test("I've just got bits and bobs in my bum bag.", () => {
        assert.equal(
          translator.translate(
            "I've just got bits and bobs in my bum bag.",
            "british-to-american"
          ),
          "I've just got odds and ends in my fanny pack."
        );
      });
      test("The car boot sale at Boxted Airfield was called off.", () => {
        assert.equal(
          translator.translate(
            "The car boot sale at Boxted Airfield was called off.",
            "british-to-american"
          ),
          "The swap meet at Boxted Airfield was called off."
        );
      });
      test("Have you met Mrs Kalyani?", () => {
        assert.equal(
          translator.translate(
            "Have you met Mrs Kalyani?",
            "british-to-american"
          ),
          "Have you met Mrs. Kalyani?"
        );
      });
      test("Prof Joyner of King's College, London.", () => {
        assert.equal(
          translator.translate(
            "Prof Joyner of King's College, London.",
            "british-to-american"
          ),
          "Prof. Joyner of King's College, London."
        );
      });
      test("Tea time is usually around 4 or 4.30.", () => {
        assert.equal(
          translator.translate(
            "Tea time is usually around 4 or 4.30.",
            "british-to-american"
          ),
          "Tea time is usually around 4 or 4:30."
        );
      });
    });
  });
  suite("Highlighting tests", () => {
    test("Mangoes are my favorite fruit.", () => {
      assert.equal(
        translator.translate(
          "Mangoes are my favorite fruit.",
          "american-to-british",
          true
        ),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });
    test("I ate yogurt for breakfast.", () => {
      assert.equal(
        translator.translate(
          "I ate yogurt for breakfast.",
          "american-to-british",
          true
        ),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });
    test("We watched the footie match for a while.", () => {
      assert.equal(
        translator.translate(
          "We watched the footie match for a while.",
          "british-to-american",
          true
        ),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });
    test("Paracetamol takes up to an hour to work.", () => {
      assert.equal(
        translator.translate(
          "Paracetamol takes up to an hour to work.",
          "british-to-american",
          true
        ),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
  });
});
