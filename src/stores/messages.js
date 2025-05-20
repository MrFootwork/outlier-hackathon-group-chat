import { defineStore } from 'pinia'
import { ref } from 'vue'

const now = new Date()

const startingMessagesRoom1 = Array.from({ length: 17 }, (_, i) => {
  const texts = [
    // John Doe (1)
    'Hey everyone! How was your weekend? Anyone do anything fun or try something new?',
    // Jane Smith (2)
    'Pretty good! I went hiking for the first time in ages. The view was amazing. Has anyone else been outdoors lately?',
    // Alice Johnson (3)
    'I finally finished that side project I was working on. Learned a ton! Anyone else working on something cool outside of work?',
    // Bob Brown (4)
    'Nice! I mostly relaxed and caught up on some movies. Any recommendations for what to watch next?',
    // John Doe (1)
    'That sounds awesome. Alice, what was your project about? And Jane, where did you go hiking?',
    // Alice Johnson (3)
    "It was a small coding challenge app. I tried out a new framework—happy to share if anyone's interested! Anyone else experimenting with new tech?",
    // Jane Smith (2)
    "Congrats, Alice! I'd love to hear more. And I went to Pine Ridge Trail. Has anyone tried geocaching? Thinking of giving it a go next weekend.",
    // Bob Brown (4)
    'Geocaching sounds fun! Never tried it. Also, Alice, what framework did you use? Maybe we could do a mini knowledge share session?',
    // John Doe (1)
    'Anyone up for a group call later this week to chat about side projects and maybe plan a team outing?',
    // Jane Smith (2)
    "I'm in! Thursday works for me. Should we do a virtual coffee break or something more interactive?",
    // Alice Johnson (3)
    'Thursday is perfect. Maybe we could do a show-and-tell of our projects or hobbies?',
    // Bob Brown (4)
    'Count me in too! And I like the show-and-tell idea. Should we invite anyone from the other teams?',
    // John Doe (1)
    "Great, I'll set it up and send the invite. Any preferences for time? And what platform do you all prefer—Zoom, Teams, or something else?",
    // Jane Smith (2)
    'Thanks, John! I vote for Teams. Also, does anyone want to try a virtual game after the call?',
    // Alice Johnson (3)
    'Looking forward to it! And yes to a game—maybe something collaborative? Any favorites?',
    // Bob Brown (4)
    'Same here. I’ve heard about some fun online escape rooms. Anyone interested in trying one out?',
    // John Doe (1)
    'By the way, has anyone tried the new coffee place downtown? I heard they have a great workspace. Maybe we could meet there sometime? Or does anyone have other favorite spots?',
  ]
  const senderIDs = [1, 2, 3, 4, 1, 3, 2, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]

  return {
    id: i + 1,
    text: texts[i],
    roomID: 1,
    senderID: senderIDs[i],
    time: new Date(now.getTime() - (24 - i) * 60000).toISOString(), // Each message 1 min apart
  }
})

const startingMessagesRoom2 = Array.from({ length: 17 }, (_, i) => {
  const texts = [
    // Bob Brown (4)
    "Hey fam! Anyone home yet? I just found something awesome at the store and can't wait to show you!",
    // Mommy Doe (5)
    "Just walked in the door! What did you find, Bob? And does anyone have dinner ideas? I'm open to suggestions.",
    // Bro Doe (6)
    'Hey! Ooh, what is it? Also, can we do pizza night? Or maybe try making something new together? I can help in the kitchen!',
    // Bob Brown (4)
    "It's a brand new board game called 'Mystery Mansion'! Looks super fun and has a bunch of puzzles. Should we play after dinner? And I'm up for pizza or something else!",
    // Mommy Doe (5)
    'Mystery Mansion? That sounds intriguing! How many people can play? And we did have pizza recently—what about homemade burgers or a taco night? Thoughts?',
    // Bro Doe (6)
    'Taco night sounds epic! I can help chop veggies or make guac. Also, is the game hard to learn? Maybe we can invite someone else to join?',
    // Bob Brown (4)
    "It's pretty easy to pick up, but lots of twists! We can play up to 6 people. Should I text Grandma or maybe invite a neighbor? Also, do we need anything from the store for tacos?",
    // Mommy Doe (5)
    "Great idea! Let's invite Grandma—she loves games. Bob, could you grab some lettuce, tomatoes, and maybe some dessert? Any fun dessert ideas, anyone?",
    // Bob Brown (4)
    "On it! I'll get lettuce, tomatoes, and maybe check out the bakery for something sweet. Any requests? Also, who wants to be on dish duty tonight?",
    // Mommy Doe (5)
    'If Bro helps with the guac, maybe he can do dishes too! For dessert, how about ice cream or something we can bake together? Brownies, maybe?',
    // Bro Doe (6)
    "Deal! I'll do dishes if I get extra guac. Brownies sound awesome—can we add chocolate chips? And should we get some snacks for game night too?",
    // Bob Brown (4)
    "Chocolate chip brownies coming up! I'll grab some chips and maybe popcorn for game night. Any favorite drinks I should pick up?",
    // Mommy Doe (5)
    'Thanks, Bob! Lemonade or sparkling water would be nice. Should we make a fruit platter too? And Bro, do you want to invite a friend?',
    // Bro Doe (6)
    "Fruit platter sounds good! I can text Sam and see if he's free. Should we set up outside if the weather's nice?",
    // Mommy Doe (5)
    "Love that idea! Let's check the weather and maybe have dinner on the patio. Bob, can you bring the portable speaker for music?",
    // Bob Brown (4)
    "Absolutely! I'll grab the speaker and text Grandma and Sam. Anything else before I head out? Can't wait for tonight!",
    // Mommy Doe (5)
    'Thanks, boys! Keep the ideas coming—anything else we should add to the list? This is shaping up to be a great night!',
  ]
  const senderIDs = [4, 5, 6, 4, 5, 6, 4, 5, 4, 5, 6, 4, 5, 6, 5, 4, 5]

  return {
    id: i + 1,
    text: texts[i],
    roomID: 2,
    senderID: senderIDs[i],
    time: new Date(now.getTime() - (24 - i) * 60000).toISOString(), // Each message 1 min apart
  }
})

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([])

  // Initialize with starting messages for two rooms
  messages.value = [...startingMessagesRoom1, ...startingMessagesRoom2]

  function addMessage(message) {
    messages.value.push(message)
  }

  return {
    messages,
    addMessage,
  }
})
