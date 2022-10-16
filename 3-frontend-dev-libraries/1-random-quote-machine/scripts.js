const quotes = [
    {author: 'Micolash, Host of the Nightmare', text: 'A hunter is a hunter, even in a dream'},
    {author: 'Micolash, Host of the Nightmare', text: 'Ahh, Kos, or some say Kosm… Do you hear our prayers?'},
    {author: 'Micolash, Host of the Nightmare', text: 'As you once did for the vaccuous Rom, grant us eyes, grant us eyes'},
    {author: 'Eileen the Crow', text: 'A hunter should hunt beasts. Leave the hunting of hunters to me...'},
    {author: 'Father Gascoigne', text: "Beasts all over the shop.. You'll be one of them soon enough"},
    {author: 'Ludwig, the Holy Blade', text: 'Ah, you were by my side all along. My true mentor, my guiding moonlight...'},
    {author: 'Ludwig, the Holy Blade', text: 'Even in this, darkest of nights, I see the moonlight...'},
    {author: 'Gehrman, the first Hunter', text: 'Tonight, Gehrman join the hunt'},
    {author: 'Gehrman, the first Hunter', text: 'Time is a cruel, cruel thing. Haven\'t you noticed?'},
    {author: 'Alfred, Hunter of Vilebloods', text: 'Master, look! I\'ve done it! I\'ve done it! I\'ve smashed, and pounded and grounded this rotten siren into fleshy pink pulp!'},
    {author: 'Alfred, Hunter of Vilebloods', text: 'There you filthy monstrosity... What good\'s your immortality now?'},
    {author: 'Alfred, Hunter of Vilebloods', text: 'Try stirring up trouble in this sorry state -- all mangled and twisted with every inside on the outside for all the world to see'},
    {author: 'Alfred, Hunter of Vilebloods', text: 'Let us cleanse these tarnished streets. And may the good blood guide your way.'},
    {author: 'Suspicious Beggar', text: 'Die! Die, die! Hunters are killers, nothing less! You call ME a beast? A Beast!? What would you know? I didn\'t ask for this!'},
    {author: 'Provost Willem', text: 'We are born of the blood, made men by the blood, undone by the blood. Our eyes have yet to open... Fear the Old Blood.'},
    {author: 'Research Hall patient', text: 'Has someone, anyone, seen my eyes? I\'m afraid I\'ve dropped them in a puddle. Everything is pale now...'},
    {author: 'Lady Maria of the Astral Tower', text: 'A corpse should be left well alone. Oh I know, how the secrets beckon so sweetly.'},
    {author: 'Lady Maria of the Astral Tower', text: ' Only an honest death will cure you now. Free you from your wild curiosity.'},
    {author: 'Mystery Narrator', text: 'Curse the fiends. Their children too. And their children, forever, true'},
    {author: 'The Doll', text: 'Welcome home, good Hunter. What is it you desire?'},
    {author: 'The Doll', text: 'Farewell, good hunter. May you find your worth in the waking world'},
    {author: 'The Doll', text: 'Are you cold? Oh, Good Hunter'},
    {author: 'The Doll', text: 'And so... the hunt begins again'},
]

let currentQuote = []

function updateLinks(quote){
    $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?text="'+quote.text+'" -'+quote.author)
    $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?content="'+quote.text+'" -'+quote.author)
}

function setQuote(quote) {
    while (quote === currentQuote){ quote = getRandomQuote()} // Make sure we don't repeat the same quote twice
    currentQuote = quote;
    $('#text').text(quote.text);
    $('#author').text(quote.author);
    updateLinks(quote);
    $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?text="'+quote.text+'" -'+quote.author)
}

function getRandomQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)]
}

$(document).ready(function() {
        $('#new-quote').click(function () {
            setQuote(getRandomQuote())
        })
        $('#copy-quote').click(function () {
            let $temp = $("<input>");
            $("body").append($temp);
            $temp.val('"' + currentQuote.text + '" -' + currentQuote.author).select();
            document.execCommand("copy");
            $temp.remove();
        })
        setQuote(getRandomQuote())
    }
)