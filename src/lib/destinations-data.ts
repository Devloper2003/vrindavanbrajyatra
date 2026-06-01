import { IMAGES } from './default-content'

export interface KeyAttraction {
  name: string
  description: string
  image: string
}

export interface Festival {
  name: string
  description: string
  month: string
}

export interface HowToReach {
  byAir: string
  byTrain: string
  byRoad: string
}

export interface Destination {
  slug: string
  name: string
  tagline: string
  heroImage: string
  description: string
  significance: string
  keyAttractions: KeyAttraction[]
  bestTimeToVisit: string
  howToReach: HowToReach
  festivals: Festival[]
}

export const destinations: Destination[] = [
  {
    slug: 'vrindavan',
    name: 'Vrindavan',
    tagline: 'The Playground of Krishna',
    heroImage: IMAGES.premMandirDay,
    description: `Vrindavan, the eternal playground of Lord Krishna, is a town that resonates with divine love and spiritual ecstasy. Located on the banks of the sacred Yamuna River in the Mathura district of Uttar Pradesh, Vrindavan is not merely a place — it is a living experience of the Ras Leela, the cosmic dance of divine love between Krishna and the Gopis. Every narrow lane, every temple bell, and every chant of "Radhe Radhe" echoes with centuries of devotion and surrender.

The name Vrindavan itself derives from "Vrinda," meaning Tulsi (holy basil), and "Van," meaning forest — the sacred forest where Krishna performed his divine pastimes. According to ancient scriptures, Vrindavan was once a lush forest where young Krishna would play his enchanting flute, drawing not only the cowherd maidens but all of creation into a state of transcendental bliss. Today, while the forests have given way to temples and ashrams, that same spiritual energy continues to pervade every corner of this holy town.

Vrindavan is home to over 5,000 temples, each with its own unique history and significance. From the world-famous Banke Bihari Temple where the deity appears in a mesmerizing tribhangi (three-fold bending) posture, to the magnificent ISKCON Temple that has become a beacon of Krishna consciousness worldwide, every temple here offers a unique darshan experience. The town is also famous for its vibrant festival celebrations, particularly Holi, which is celebrated here with unmatched fervor and joy for several weeks, transforming the entire town into a canvas of divine colors.

The spiritual atmosphere of Vrindavan is further enhanced by its numerous ghats along the Yamuna River, where devotees gather for the sacred Yamuna Aarti every evening. The sight of hundreds of flickering lamps against the backdrop of ancient temples, accompanied by devotional songs, creates an experience that words cannot capture. Vrindavan is not just a destination — it is a journey of the soul, a place where the divine and the earthly merge into one eternal embrace.`,
    significance: `Vrindavan holds the highest spiritual significance in the Vaishnava tradition as the earthly manifestation of the spiritual realm of Goloka Vrindavan. It is believed that Lord Krishna never truly left Vrindavan — his divine presence continues to permeate every particle of this sacred land. The Srimad Bhagavatam describes Vrindavan as the supreme abode where the highest form of divine love (Prema Bhakti) is eternally celebrated. Saints like Chaitanya Mahaprabhu, the Six Goswamis, and countless other realized souls have confirmed that Vrindavan is non-different from the spiritual world. Performing parikrama (circumambulation) of Vrindavan is considered equivalent to circumambulating the Lord himself, and even a single moment of sincere devotion in Vrindavan is said to yield spiritual benefits that would take lifetimes to achieve elsewhere.`,
    keyAttractions: [
      {
        name: 'Banke Bihari Temple',
        description: 'The most revered temple in Vrindavan, housing the beautiful deity of Banke Bihari (Lord Krishna in tribhangi posture). The temple was established by Swami Haridas in the 16th century and is known for its unique tradition where the curtains before the deity are periodically drawn to prevent devotees from being overwhelmed by the divine beauty of the Lord.',
        image: IMAGES.bankeBihari,
      },
      {
        name: 'Prem Mandir',
        description: 'A stunning white marble temple built by Jagadguru Kripalu Maharaj, Prem Mandir is an architectural marvel that depicts the divine pastimes of Krishna through intricate carvings and beautiful lighting displays. The temple complex comes alive at night with mesmerizing illuminations and musical fountain shows that depict scenes from Krishna\'s life.',
        image: IMAGES.premMandirNight,
      },
      {
        name: 'ISKCON Temple (Krishna Balaram Mandir)',
        description: 'Established by A.C. Bhaktivedanta Swami Prabhupada in 1975, this temple is the international headquarters of ISKCON in Vrindavan. The temple houses beautiful deities of Krishna-Balaram, Radha-Shyamasundar, and Gaura-Nitai. The temple complex includes a guest house, restaurant, and gift shop, and hosts kirtan sessions that attract devotees from around the world.',
        image: IMAGES.iskcon,
      },
      {
        name: 'Keshi Ghat & Yamuna Aarti',
        description: 'Keshi Ghat is one of the most sacred bathing ghats on the Yamuna River in Vrindavan. It is named after the demon Keshi whom Krishna defeated here. Every evening, a magnificent Yamuna Aarti is performed at the ghat, where devotees offer lamps to the sacred river amidst the chanting of mantras and devotional songs, creating a deeply moving spiritual experience.',
        image: IMAGES.keshiGhat,
      },
      {
        name: 'Madan Mohan Temple',
        description: 'One of the oldest temples in Vrindavan, the Madan Mohan Temple was established by Srila Sanatana Goswami in the 16th century. Perched on a hill near the Yamuna, it houses the deity of Madan Mohan (Krishna) who was originally worshipped by Advaita Acharya. The temple offers a panoramic view of Vrindavan and is a must-visit for those seeking the historical roots of Vrindavan\'s spiritual heritage.',
        image: IMAGES.vrindavanOverview,
      },
    ],
    bestTimeToVisit: 'October to March is the ideal time to visit Vrindavan. The weather is pleasant, making temple visits and parikrama comfortable. Special times include Holi (February-March) for the famous Vrindavan Holi celebrations, Janmashtami (August) for Krishna\'s birthday, and Kartik Purnima (October-November) for the grand lamp festival. Summers (April-June) can be extremely hot with temperatures exceeding 45°C, while monsoons (July-September) bring humidity but also a unique green beauty to the Braj landscape.',
    howToReach: {
      byAir: 'The nearest airport is Agra Airport (approx. 67 km). Delhi\'s Indira Gandhi International Airport (approx. 165 km) is better connected with domestic and international flights. From Delhi, you can hire a taxi or take a train to Mathura and then proceed to Vrindavan.',
      byTrain: 'Vrindavan has its own railway station (BDB) with connections to Delhi, Mathura, and Agra. However, Mathura Junction (MTJ) is the major railhead (12 km from Vrindavan) with excellent connectivity to Delhi, Mumbai, Kolkata, Chennai, and other major cities. Regular local trains and auto-rickshaws connect Mathura to Vrindavan.',
      byRoad: 'Vrindavan is well-connected by road. It is approximately 165 km from Delhi (3-4 hours via Yamuna Expressway), 67 km from Agra (1.5 hours), and 12 km from Mathura (30 minutes). Regular bus services (UP Roadways) and shared tempos operate from Mathura, Delhi, and Agra. Private taxis are readily available.',
    },
    festivals: [
      {
        name: 'Vrindavan Holi',
        description: 'Vrindavan celebrates Holi like nowhere else on earth. The festivities begin with Phoolon ki Holi (Holi with flower petals) at the Banke Bihari Temple, where priests shower devotees with marigolds and roses. This is followed by the famous widows\' Holi celebration — a beautiful and emotional event where widows, traditionally barred from festivities, celebrate with colors and joy. The entire town becomes a canvas of divine colors for several weeks.',
        month: 'February-March',
      },
      {
        name: 'Janmashtami',
        description: 'The celebration of Lord Krishna\'s birth is the grandest festival in Vrindavan. All temples are elaborately decorated, and special abhishek (bathing ceremony) of the deities is performed at midnight — the exact time of Krishna\'s birth. The Banke Bihari Temple remains open throughout the night, and the entire town reverberates with kirtans, bhajans, and joyful celebrations that continue for days.',
        month: 'August',
      },
      {
        name: 'Kartik Purnima & Dev Deepawali',
        description: 'The full moon night of the Kartik month is celebrated with grand illuminations across Vrindavan. Thousands of clay lamps are lit along the Yamuna ghats, creating a spectacular visual feast. The temples are adorned with lights, and special prayers and kirtans continue throughout the night. This is considered the most auspicious time for performing Vrindavan parikrama.',
        month: 'October-November',
      },
    ],
  },
  {
    slug: 'mathura',
    name: 'Mathura',
    tagline: 'Birthplace of Lord Krishna',
    heroImage: IMAGES.mathuraCity,
    description: `Mathura, the sacred birthplace of Lord Krishna, stands as one of the seven holiest cities (Sapta Puri) in Hinduism and has been a center of spiritual pilgrimage for over 5,000 years. Located on the western bank of the Yamuna River in Uttar Pradesh, Mathura is not just a city — it is the very cradle of Sanatan Dharma, where the Supreme Lord chose to incarnate as Krishna to restore dharma and demonstrate the path of divine love.

The historical and spiritual significance of Mathura is immeasurable. According to the Bhagavata Purana, Lord Krishna was born in a prison cell here to Devaki and Vasudeva, during the reign of the tyrannical King Kamsa. The same prison cell is now the site of the Krishna Janmabhoomi Temple, one of the most visited pilgrimage sites in India. The city has been a center of Krishna worship since ancient times, with archaeological evidence suggesting continuous habitation and religious activity for over 3,000 years.

Mathura was once a flourishing center of art and culture during the Kushan Empire (1st-3rd century CE), and the famous Mathura school of art produced some of the finest sculptures in Indian history. The Mathura Museum houses an extraordinary collection of these ancient artifacts, including the earliest known representations of the Buddha and various Hindu deities. The city's artistic legacy continues to influence Indian art and culture to this day.

Beyond its temples and museums, Mathura is a living city of devotion. The 25 ghats along the Yamuna River are centers of daily worship, with the Vishram Ghat being the most sacred — it is believed that Krishna rested here after defeating Kamsa. Every evening, the Yamuna Aarti at Vishram Ghat creates a divine atmosphere that draws devotees and visitors alike. The city's narrow lanes are filled with shops selling prasad, religious artifacts, and the famous Mathura peda (a sweet made from condensed milk), which is offered as prasad in almost every temple.`,
    significance: `Mathura's spiritual significance in Hinduism is supreme — it is one of the seven Moksha-puris (cities that grant liberation). The Garuda Purana states that merely residing in Mathura leads to spiritual advancement, and dying here ensures liberation from the cycle of birth and death. The city is considered the earthly manifestation of Vaikuntha (the spiritual realm), and every particle of its soil is believed to be sacred. The Vishnu Dharmottara Purana declares that Mathura is greater than all other holy places combined, for it is here that the Supreme Lord himself took birth. Performing puja, japa, or any spiritual practice in Mathura is said to yield results millions of times greater than the same practice performed elsewhere.`,
    keyAttractions: [
      {
        name: 'Krishna Janmabhoomi Temple',
        description: 'The most sacred site in Mathura, this temple complex marks the exact spot where Lord Krishna was born in a prison cell to Devaki and Vasudeva. The current temple structure houses the prison cell (garbha griha) where the divine birth took place. The complex also includes the Keshav Dev Temple and other shrines. Despite its turbulent history of destruction and rebuilding, the site remains the most important pilgrimage destination in the Braj region.',
        image: IMAGES.mathuraCity,
      },
      {
        name: 'Dwarkadhish Temple',
        description: 'One of the most magnificent temples in Mathura, the Dwarkadhish Temple was built in 1814 by Seth Gokul Das Parikh, the treasurer of the Gwalior Estate. Dedicated to Lord Krishna in his form as the King of Dwarka, the temple features stunning architecture with intricate carvings, beautiful paintings, and a magnificent central hall. The temple is especially famous for its grand Holi and Janmashtami celebrations.',
        image: IMAGES.dwarkadhish,
      },
      {
        name: 'Vishram Ghat',
        description: 'The most sacred of Mathura\'s 25 ghats on the Yamuna River, Vishram Ghat is believed to be the spot where Lord Krishna rested after defeating his uncle Kamsa. The word "Vishram" means rest. The ghat is the center of all religious activities in Mathura, including the famous evening Yamuna Aarti. Boat rides from here offer beautiful views of the river and the numerous temples lining its banks.',
        image: IMAGES.yamunaRiver,
      },
      {
        name: 'Government Museum (Mathura Museum)',
        description: 'Established in 1874 by Sir F.S. Growse, the Mathura Museum houses one of the finest collections of ancient Indian art and sculpture in the world. The museum contains artifacts from the 3rd century BCE to the 12th century CE, including remarkable specimens of the Mathura school of art, ancient coins, terracotta figurines, and the famous Buddha head sculptures that influenced Buddhist art across Asia.',
        image: IMAGES.yamunaAarti,
      },
      {
        name: 'Potra Kund & Kamsa Kila',
        description: 'Potra Kund is an ancient stepped water tank near the Krishna Janmabhoomi complex, believed to be where Krishna\'s mother Yashoda washed his clothes. The nearby Kamsa Kila (Kamsa\'s Fort) contains the ruins of the ancient fortress where Krishna was born in captivity. These sites offer a tangible connection to the historical and mythological events that make Mathura sacred.',
        image: IMAGES.devoteesTemple,
      },
    ],
    bestTimeToVisit: 'The best time to visit Mathura is from October to March when the weather is cool and pleasant. Janmashtami (August-September) is the most auspicious time to visit, as the entire city transforms into a grand celebration of Krishna\'s birth. Holi (March) in Mathura is legendary — the week-long celebrations include Lathmar Holi, Phoolon ki Holi, and the famous Holi procession. The months of Kartik (October-November) are also special for Yamuna Aarti and Dev Deepawali celebrations.',
    howToReach: {
      byAir: 'The nearest airport is Agra\'s Kheria Airport (about 55 km). Delhi\'s IGI Airport (about 165 km) offers better connectivity. Both airports have taxi services to Mathura.',
      byTrain: 'Mathura Junction (MTJ) is a major railway station on the Delhi-Mumbai and Delhi-Chennai trunk routes. It is well-connected to Delhi (1.5-2 hours by Shatabdi Express), Agra (30 minutes), Mumbai, Kolkata, Jaipur, and other major cities. Multiple daily trains are available from Delhi.',
      byRoad: 'Mathura is excellently connected by road. It lies on NH-19 (Delhi-Agra highway) and the Yamuna Expressway. Distance from Delhi: 165 km (2.5-3 hours), from Agra: 55 km (1 hour), from Jaipur: 220 km (4 hours). UP Roadways and private buses run frequently. Taxis and self-drive options are readily available.',
    },
    festivals: [
      {
        name: 'Janmashtami at Krishna Janmabhoomi',
        description: 'The celebration of Krishna\'s birth at his very birthplace is an experience unlike any other. The Krishna Janmabhoomi Temple hosts the most elaborate Janmashtami celebration in the world. The prison cell where Krishna was born is specially decorated, and at midnight, the exact moment of the divine birth, the curtains are drawn to reveal the beautifully adorned deity. Thousands of devotees gather for this sacred darshan, and the entire city erupts in joyous celebration.',
        month: 'August-September',
      },
      {
        name: 'Mathura Holi',
        description: 'Mathura\'s Holi celebrations are world-famous and span over a week. The festivities begin at the Dwarkadhish Temple with the traditional Holi procession (Holi Sabha). The celebrations include unique traditions like the procession of Radha Rani from Barsana, the colorful Rang-Gulal festival at temples, and the grand finale of Dhulendi where the entire city celebrates with colors, music, and dance on the streets.',
        month: 'March',
      },
      {
        name: 'Yamuna Chhath & Chhath Puja',
        description: 'Mathura celebrates Chhath Puja with great devotion along the Yamuna ghats. Devotees offer arghya (offerings) to the Sun God at sunrise and sunset, standing waist-deep in the sacred waters. The Vishram Ghat becomes the center of activity, with thousands of devotees performing ancient rituals that have been maintained for generations. The sight of the sun reflecting off the Yamuna during the evening offerings is truly magnificent.',
        month: 'October-November',
      },
    ],
  },
  {
    slug: 'govardhan',
    name: 'Govardhan',
    tagline: 'The Sacred Hill',
    heroImage: IMAGES.govardhanHill,
    description: `Govardhan Hill, the sacred mountain that Lord Krishna lifted on his little finger to protect the residents of Braj from the devastating rains sent by Lord Indra, is one of the most spiritually significant places in the entire Braj region. Located about 22 kilometers from Vrindavan in the Mathura district, Govardhan is not merely a geographical feature — it is considered a living deity, a manifestation of Krishna himself, and is worshipped as such by millions of devotees.

The story of Govardhan is central to Krishna's teachings in the Bhagavata Purana. When Krishna observed the residents of Braj preparing elaborate sacrifices for Lord Indra, the god of rain, he questioned this tradition and suggested instead that they worship Govardhan Hill, which provided them with food, shelter, and grazing land for their cattle. When the people followed Krishna's advice and offered their devotion to Govardhan, an enraged Indra sent torrential rains for seven days. Krishna then lifted the entire Govardhan Hill on his little finger, creating a vast umbrella under which all the people and animals of Braj took shelter. Defeated, Indra eventually acknowledged Krishna's supremacy.

Today, Govardhan Hill is the center of the famous Govardhan Parikrama, a sacred circumambulation of approximately 21 kilometers that is undertaken by millions of pilgrims every year. Devotees walk barefoot around the hill, visiting numerous sacred sites along the route including Kusum Sarovar, Radha Kund, Shyam Kund, Mukharvind, and Dan Ghati. The parikrama can be completed on foot (about 5-6 hours), by vehicle, or partially both, and is considered one of the most spiritually meritorious activities in the Braj region.

The spiritual atmosphere of Govardhan is unlike anywhere else in Braj. The parikrama path is lined with ancient temples, sacred kunds (water tanks), and spots associated with specific pastimes of Krishna. Pilgrims can be seen performing dandavat parikrama (prostrating full body length after every step), a practice that takes weeks to complete and represents the highest form of devotional surrender. The area around Radha Kund and Shyam Kund is considered the most sacred spot in all of Braj, where the divine love of Radha and Krishna reached its deepest expression.`,
    significance: `Govardhan Hill is considered non-different from Krishna himself — it is worshipped as Hari (Krishna) in stone form. The Padma Purana states that simply by seeing Govardhan Hill, one attains the same merit as performing thousands of yajnas (sacrifices). Performing parikrama of Govardhan is considered the most auspicious spiritual activity one can undertake, and it is believed that Krishna personally accompanies every devotee who performs the parikrama with sincere devotion. The Skanda Purana declares that Govardhan is the king of all mountains and the fulfiller of all desires. Bathing in Radha Kund near Govardhan is said to grant pure love of Godhead (Krishna-prema), the highest spiritual attainment.`,
    keyAttractions: [
      {
        name: 'Govardhan Parikrama Path',
        description: 'The sacred 21-kilometer circumambulation path around Govardhan Hill is the primary attraction. Along the path, pilgrims visit numerous sacred sites including Mansi Ganga, Mukharvind, Dan Ghati, and various temples. The parikrama can be done on foot, by vehicle, or as dandavat parikrama (full-body prostrations). The path is well-maintained with facilities for pilgrims including drinking water, rest areas, and food stalls.',
        image: IMAGES.govardhanParikrama,
      },
      {
        name: 'Radha Kund & Shyam Kund',
        description: 'Considered the most sacred spot in all of Braj, Radha Kund and Shyam Kund are two adjacent holy water tanks where Radha and Krishna respectively performed their pastimes. According to scripture, bathing in Radha Kund even once grants the supreme spiritual attainment of Krishna-prema (pure love of God). The kunds are surrounded by ancient temples and ghats, and the atmosphere here is charged with the deepest devotional sentiments.',
        image: IMAGES.govardhanHill,
      },
      {
        name: 'Kusum Sarovar',
        description: 'A beautiful historic water tank located on the parikrama route, Kusum Sarovar is named after the kusum (flowers) that Srimati Radharani used to collect here for making garlands for Krishna. The structure features magnificent sandstone architecture with beautiful chhatris (pavilions) and is considered one of the most photogenic spots in the Braj region. The serene atmosphere makes it a perfect place for meditation and spiritual contemplation.',
        image: IMAGES.templesReflection,
      },
      {
        name: 'Mukharvind (Giriraj Ji Temple)',
        description: 'The Mukharvind Temple houses the sacred face (mukh) of Govardhan Hill in the form of a rock formation that naturally resembles a cow\'s face. This is the primary temple of Govardhan and the most important stop on the parikrama route. The deity here is worshipped as Giriraj Ji (the king of mountains) and is offered elaborate daily worship including abhishek, chappan bhog (56 offerings), and shringar (decoration).',
        image: IMAGES.pilgrimsWalking,
      },
      {
        name: 'Dan Ghati & Manasi Ganga',
        description: 'Dan Ghati is the narrowest point of Govardhan Hill where, according to legend, Krishna would playfully stop the gopis and demand a toll (dan) of buttermilk before allowing them to pass. Nearby Manasi Ganga is a sacred lake believed to have been created by Krishna\'s divine will when the residents needed water. A beautiful temple of Haridev stands on its banks. The area is also known for its vibrant market where devotees purchase prasad and religious items.',
        image: IMAGES.govardhanParikrama,
      },
    ],
    bestTimeToVisit: 'October to March is the best time for Govardhan Parikrama. The weather is ideal for walking the 21 km route. The most auspicious times are Govardhan Puja (the day after Diwali in October-November), when lakhs of devotees perform the parikrama, and Kartik month (October-November), which is considered especially meritorious. Guru Purnima (July) also sees large gatherings. Avoid the peak summer months (May-June) as temperatures can exceed 45°C, making the parikrama extremely difficult.',
    howToReach: {
      byAir: 'The nearest airport is Agra (about 70 km). Delhi IGI Airport (about 180 km) is better connected. From either airport, you can hire a taxi to Govardhan.',
      byTrain: 'The nearest railway station is Mathura Junction (MTJ), about 22 km from Govardhan. From Mathura, take a local bus, shared tempo, or taxi to Govardhan. The journey takes about 45 minutes.',
      byRoad: 'Govardhan is well-connected by road to Mathura (22 km, 45 min), Vrindavan (25 km, 1 hour), Agra (70 km, 1.5 hours), and Delhi (175 km, 3-4 hours via Yamuna Expressway). Regular buses and shared vehicles are available from Mathura and Vrindavan.',
    },
    festivals: [
      {
        name: 'Govardhan Puja (Annakoot)',
        description: 'Celebrated on the day after Diwali, Govardhan Puja is the most important festival here. It commemorates Krishna lifting Govardhan Hill. The Mukharvind Temple is decorated magnificently, and a mountain of food (Annakoot — meaning "mountain of grains") is offered to Giriraj Ji. Over 56 varieties of dishes (Chappan Bhog) are prepared and offered to the deity. Lakhs of devotees perform the parikrama on this day, creating an atmosphere of unprecedented devotion and celebration.',
        month: 'October-November',
      },
      {
        name: 'Kartik Parikrama Mela',
        description: 'The entire month of Kartik (October-November) is considered supremely auspicious for performing Govardhan Parikrama. During this month, lakhs of devotees from across India and abroad undertake the parikrama. Special events, kirtans, and spiritual discourses are organized throughout the month. The atmosphere is electric with devotion, and the parikrama path is illuminated with lights and decorated with flowers.',
        month: 'October-November',
      },
      {
        name: 'Guru Purnima',
        description: 'Guru Purnima is celebrated with great devotion at Govardhan, particularly at the various ashrams and temples along the parikrama route. Devotees honor their spiritual teachers and perform special parikrama on this day. The atmosphere is one of gratitude and spiritual dedication, with special kirtan sessions and discourses on the glories of Govardhan Hill.',
        month: 'July',
      },
    ],
  },
  {
    slug: 'barsana',
    name: 'Barsana',
    tagline: "Radha Rani's Abode",
    heroImage: IMAGES.radhaRaniTemple,
    description: `Barsana, the sacred village where Srimati Radharani — the eternal consort and supreme devotee of Lord Krishna — spent her childhood, is one of the most spiritually charged places in the entire Braj region. Located about 50 kilometers from Mathura in the Uttar Pradesh district of Mathura, Barsana is not just a village; it is the very embodiment of divine feminine energy and the supreme abode of devotional love.

The name Barsana is derived from "Brahmasanu" (the peak of Brahma), reflecting its location atop four hills that represent the four arms of Lord Brahma. According to the Bhagavata Purana and various Braj scriptures, Barsana was the kingdom of Vrishbhanu Maharaj, Radharani's father, and it was here that the young Radha grew up, her divine beauty and devotion captivating everyone who beheld her. Every well, every grove, and every pathway in Barsana resonates with the divine pastimes of Radha and Krishna.

The centerpiece of Barsana is the magnificent Shri Radha Rani Temple, perched atop the Bhanugarh Hill. This is the only temple in India that is primarily dedicated to Radharani rather than Krishna, making it uniquely significant. The temple offers breathtaking panoramic views of the surrounding Braj countryside, with its rolling hills, sacred groves, and the distant Yamuna River. The climb to the temple involves ascending over 200 steps, but the spiritual reward of having Radharani's darshan makes every step worthwhile.

Barsana is also world-famous for its unique and exuberant Holi celebrations, particularly the Lathmar Holi, where women playfully beat men with sticks (lathis) while the men protect themselves with shields. This tradition reenacts the playful pastime where Krishna and his friends came to Barsana to tease Radha and the gopis, and the women chased them away with sticks. The Lathmar Holi of Barsana has become an internationally renowned cultural event, attracting visitors and media from around the world.`,
    significance: `Barsana is considered the spiritual capital of the Braj region and the supreme abode of divine love. In the Gaudiya Vaishnava tradition, Radharani is considered the supreme deity — she is the embodiment of Krishna's internal pleasure potency (Hladini Shakti), and without her mercy, Krishna cannot be fully attained. The Narada Pancharatra states that Barsana is greater even than Vrindavan because it is the place where the Supreme Goddess Radharani resides. Saints and scriptures declare that the spiritual atmosphere of Barsana is the most conducive for developing Prema Bhakti (pure loving devotion), and that even the dust of Barsana is more sacred than the gems of other holy places.`,
    keyAttractions: [
      {
        name: 'Shri Radha Rani Temple',
        description: 'The crown jewel of Barsana, this temple is uniquely dedicated to Srimati Radharani rather than Krishna. Perched atop Bhanugarh Hill, it was built by Raja Veer Singh of Orchha in the 17th century on the site of Vrishbhanu Maharaj\'s palace. The temple houses a beautiful deity of Radharani, and the darshan here is considered the most spiritually elevating experience in Braj. The panoramic views from the temple complex are breathtaking.',
        image: IMAGES.radhaRaniTemple,
      },
      {
        name: 'Maan Mandir',
        description: 'Located on a hill opposite the Radha Rani Temple, Maan Mandir marks the spot where Radharani would go in divine mood of "maan" (sweet anger or sulking) during her pastimes with Krishna. The temple offers stunning views of the Radha Rani Temple across the valley. The narrow passage between the two hills where Radha and Krishna would meet is called the Sankari Khol and is considered extremely sacred.',
        image: IMAGES.barsanaHoli,
      },
      {
        name: 'Sankari Khol',
        description: 'The narrow gorge between Bhanugarh Hill (where the Radha Rani Temple stands) and the Maan Mandir hill is called Sankari Khol. According to tradition, this is the secret pathway where Krishna would come to meet Radharani. The passage is so narrow that only one person can pass at a time, symbolizing the intimate and exclusive nature of divine love. Devotees consider walking through this passage a deeply moving spiritual experience.',
        image: IMAGES.pilgrimsWalking,
      },
      {
        name: 'Radha Kund (Barsana)',
        description: 'Not to be confused with the Radha Kund at Govardhan, this sacred water tank in Barsana is where Srimati Radharani and her sakhis (friends) would bathe and perform their divine pastimes. The kund is surrounded by ancient temples and ghats, and the water is considered spiritually purifying. Pilgrims often perform parikrama of this kund as part of their Barsana visit.',
        image: IMAGES.govardhanHill,
      },
      {
        name: 'Mor Kutir & Bhandir Van',
        description: 'Mor Kutir is the sacred spot where Krishna performed the Mayur Nritya (peacock dance) to please Radharani. Nearby Bhandir Van is the sacred forest where, according to scripture, Krishna and Radha performed their divine pastimes under the shade of the Bhandir trees. These spots along the Barsana parikrama route are deeply serene and offer devotees a tangible connection to the divine pastimes.',
        image: IMAGES.radhakrishnaDarshan,
      },
    ],
    bestTimeToVisit: 'October to March offers pleasant weather ideal for climbing the hills and exploring temples. The most special time to visit is during Holi (February-March) when Barsana hosts the world-famous Lathmar Holi — a must-experience cultural and spiritual event. Radhashtami (September), celebrating Radharani\'s appearance day, is another auspicious time with grand celebrations at the Radha Rani Temple. The Kartik month (October-November) is also considered extremely meritorious for visiting Barsana.',
    howToReach: {
      byAir: 'The nearest airport is Agra (about 90 km). Delhi IGI Airport (about 185 km) is better connected. From either airport, hire a taxi to Barsana.',
      byTrain: 'The nearest railway station is Mathura Junction (about 50 km). From Mathura, take a bus or taxi to Barsana. The journey takes about 1.5 hours by road. Some slower trains also stop at Kosi Kalan station, which is closer (about 20 km).',
      byRoad: 'Barsana is connected by road to Mathura (50 km, 1.5 hours), Vrindavan (45 km, 1 hour), Agra (90 km, 2 hours), and Delhi (185 km, 4 hours via Yamuna Expressway). Regular buses and shared tempos are available from Mathura and Vrindavan. Private taxis can also be hired.',
    },
    festivals: [
      {
        name: 'Lathmar Holi',
        description: 'Barsana\'s Lathmar Holi is world-famous and draws visitors from across the globe. The celebration reenacts the divine pastime where Krishna came to Barsana to playfully tease Radha and the gopis, who then chased the men away with lathis (sticks). The men from Nandgaon arrive at Barsana, singing and dancing, and the women of Barsana playfully beat them with sticks while the men protect themselves with shields. The entire town erupts in colors, music, and divine joy. It is celebrated a few days before the main Holi day.',
        month: 'February-March',
      },
      {
        name: 'Radhashtami',
        description: 'The appearance day of Srimati Radharani is celebrated with extraordinary devotion at the Radha Rani Temple. The deity is adorned in magnificent new outfits and jewelry, and special abhishek (bathing ceremony) is performed with panchamrit (five sacred substances). The temple is decorated with flowers and lights, and continuous kirtan and bhajan sessions echo through the hills of Barsana. Thousands of devotees wait in long queues for the special midnight darshan.',
        month: 'September',
      },
      {
        name: 'Hariyali Teej',
        description: 'This festival celebrating the monsoon and the divine love of Radha-Krishna is observed with great enthusiasm in Barsana. Women dress in green attire, apply mehndi (henna), and swing on decorated jhoolas (swings) in the temples. Special songs celebrating the divine romance of Radha and Krishna are sung, and the entire village takes on a festive green hue that mirrors the lush monsoon landscape of Braj.',
        month: 'July-August',
      },
    ],
  },
  {
    slug: 'nandgaon',
    name: 'Nandgaon',
    tagline: "Lord Krishna's Childhood Home",
    heroImage: IMAGES.nandgaon,
    description: `Nandgaon, the sacred village where Lord Krishna spent his entire childhood under the loving care of his foster parents Nanda Maharaj and Yashoda Maiya, holds a special place in the hearts of devotees. Located about 55 kilometers from Mathura and adjacent to Barsana, Nandgaon is the very embodiment of parental love (Vatsalya Bhava) — the deep, unconditional love that Yashoda felt for her divine child.

According to the Bhagavata Purana, after Krishna's birth in the prison of Mathura, his father Vasudeva carried the infant across the Yamuna River to the home of Nanda Maharaj in Gokul. A few years later, to protect Krishna from the attacks of demons sent by Kamsa, Nanda Maharaj moved his family from Gokul to Nandgaon (then called Nandishvara or Nandagram). It was here that Krishna spent his formative years — stealing butter from the homes of the gopis, playing with his cowherd friends, and enchanting everyone with his divine beauty and playful pastimes.

The centerpiece of Nandgaon is the Nand Bhavan Temple, perched atop the Nandishvara Hill. This temple marks the spot where Nanda Maharaj's palace once stood, and it is believed that the palace's foundation and some walls still exist beneath the current temple structure. The climb to the temple is steep but rewarding, offering panoramic views of the Braj countryside including the nearby Barsana hills. Inside the temple, deities of Nanda Maharaj, Yashoda Maiya, and young Krishna are worshipped with great devotion.

Nandgaon is inseparable from Barsana in the divine pastimes of Radha and Krishna. The two villages face each other across a valley, and the road connecting them is believed to be the very path that Krishna walked to visit Radharani. The spiritual energy of Nandgaon is distinct — it is charged with the sweetness of parental love and the mischievous charm of young Krishna. Every corner of the village has a story — the butter-stealing spots, the places where Krishna played with his friends, the wells where Yashoda drew water — all preserved in the living tradition of the Braj region.`,
    significance: `Nandgaon represents the supreme abode of Vatsalya Bhava (parental love) in the spiritual hierarchy of Braj. The Bhagavata Purana describes that Nanda Maharaj and Yashoda Maiya attained the highest spiritual perfection through their pure parental love for Krishna — they did not worship him as God, but loved him as their own child, and this love was so pure that Krishna himself was bound by it. The Skanda Purana states that simply by residing in Nandgaon, one develops the same unconditional love for Krishna that Nanda and Yashoda possessed. The village is also significant as the starting point of the Lathmar Holi tradition, where the men of Nandgaon go to Barsana to play Holi with the women there.`,
    keyAttractions: [
      {
        name: 'Nand Bhavan Temple',
        description: 'The main temple of Nandgaon, perched atop Nandishvara Hill, stands on the site of Nanda Maharaj\'s original palace. The current structure was built in the 18th century and houses beautiful deities of Nanda Baba, Yashoda Maiya, and young Krishna. The temple is built over the ancient palace foundation, and devotees can see the original stone walls beneath. The view from the temple terrace encompasses the entire Braj landscape including Barsana.',
        image: IMAGES.nandgaon,
      },
      {
        name: 'Ter Kadamba',
        description: 'A sacred grove near Nandgaon where Krishna would call his cows by playing his flute under a kadamba tree. "Ter" means to call, and this spot is associated with the enchanting pastime where Krishna\'s flute music would draw not only his cows but all living beings toward him. The site features a beautiful temple and is a peaceful spot for meditation and contemplation of Krishna\'s flute pastimes.',
        image: IMAGES.govardhanParikrama,
      },
      {
        name: 'Charan Pahari',
        description: 'A hill near Nandgaon that bears the footprints of Lord Krishna. According to tradition, Krishna would stand on this hill and play his flute, and the impression of his lotus feet became permanently embedded in the rock. The site offers a serene atmosphere and beautiful views of the surrounding Braj countryside. Devotees worship the footprints and consider touching them supremely auspicious.',
        image: IMAGES.govardhanHill,
      },
      {
        name: 'Yashoda Kund',
        description: 'A sacred water tank in Nandgaon associated with Yashoda Maiya. According to tradition, this is where Yashoda would bathe young Krishna and wash his clothes. The kund is surrounded by ancient steps and small temples. The water is considered sacred, and devotees often take a few drops as prasad. The site evokes the deep emotional connection between mother Yashoda and her divine child.',
        image: IMAGES.yamunaRiver,
      },
      {
        name: 'Nand Gaon Parikrama',
        description: 'The circumambulation path around Nandgaon takes devotees through all the sacred spots associated with Krishna\'s childhood pastimes. The parikrama includes visits to Nand Bhavan, Ter Kadamba, Charan Pahari, and various other sites. The entire route can be covered in about 2-3 hours and offers a comprehensive spiritual experience of Nandgaon\'s divine heritage. Many devotees combine the Nandgaon and Barsana parikramas in a single day.',
        image: IMAGES.pilgrimsWalking,
      },
    ],
    bestTimeToVisit: 'October to March is ideal for visiting Nandgaon with pleasant weather for temple visits and parikrama. The most unique time to visit is during Lathmar Holi (February-March), when the men of Nandgaon traditionally go to Barsana to celebrate. Nand Utsav (the day after Janmashtami in August) celebrates Nanda Maharaj\'s joy at Krishna\'s birth and is celebrated specially here. The Kartik month (October-November) is also very auspicious for visiting.',
    howToReach: {
      byAir: 'Nearest airport is Agra (about 100 km). Delhi IGI Airport (about 190 km) is better connected. From either, hire a taxi to Nandgaon.',
      byTrain: 'Nearest railway station is Mathura Junction (about 55 km). From Mathura, take a taxi or bus to Nandgaon via Barsana. Kosi Kalan station (about 25 km) is closer and connected by some trains.',
      byRoad: 'Nandgaon is connected by road to Barsana (8 km, 15 min), Mathura (55 km, 1.5 hours), Vrindavan (50 km, 1.5 hours), and Delhi (190 km, 4 hours). Regular buses and shared tempos connect Nandgaon with Barsana and Mathura. Private taxis are also available.',
    },
    festivals: [
      {
        name: 'Nandotsav',
        description: 'Celebrated the day after Janmashtami, Nandotsav marks the celebration of Nanda Maharaj and Yashoda Maiya upon the birth of their divine son Krishna. While Janmashtami celebrates the birth itself, Nandotsav celebrates the joy of the parents. The Nand Bhavan Temple is decorated magnificently, and the deity of baby Krishna is placed in a cradle for devotees to rock. Special songs celebrating parental love are sung, and the atmosphere is filled with the sweetness of Vatsalya Bhava.',
        month: 'August',
      },
      {
        name: 'Lathmar Holi (Nandgaon)',
        description: 'The day after the Lathmar Holi at Barsana, the celebration shifts to Nandgaon. The women of Nandgaon now take their turn, playfully beating the men from Barsana who come to play Holi. The roles are reversed, and the entire village celebrates with colors, songs, and the same divine joy. The Nand Bhavan Temple becomes the center of celebrations, and the atmosphere is electric with devotion and festivity.',
        month: 'February-March',
      },
    ],
  },
  {
    slug: 'gokul',
    name: 'Gokul',
    tagline: 'Where Krishna Grew Up',
    heroImage: IMAGES.gokulTemple,
    description: `Gokul, the idyllic village where the infant Krishna spent his earliest years under the tender care of his foster mother Yashoda and father Nanda Maharaj, is a treasure trove of divine childhood pastimes (Bal Lila). Located just 15 kilometers southeast of Mathura on the banks of the Yamuna River, Gokul is where the foundation of Krishna's divine play was laid — from his miraculous escape from the demon Putana to his endearing butter-stealing adventures that have captivated devotees for millennia.

The name Gokul is derived from "Go" (cow) and "Kul" (family or group), meaning the abode of cowherds. In ancient times, Gokul was a pastoral village where Nanda Maharaj and his community of cowherds lived, tending their cattle in the lush meadows along the Yamuna. It was to this peaceful setting that Vasudeva brought the newborn Krishna on that stormy night, crossing the swollen Yamuna to deliver the infant to the safety of Nanda's home. From that moment, Gokul became the stage for some of the most beloved episodes in Krishna's life.

Gokul is particularly associated with the infant and toddler pastimes of Krishna — the killing of Putana (the demoness who tried to nurse him with poisoned milk), the lifting of Govardhan Hill by the child Krishna (in some traditions, this pastime is also associated with Gokul), the Trinavarta demon episode, and the famous Damodara Lila where Yashoda tied the young Krishna to a grinding mortar as punishment for his mischief. Each of these pastimes has a specific location in Gokul that devotees can visit and experience.

The spiritual atmosphere of Gokul is one of innocent devotion and childlike love. Unlike the more grand and philosophical traditions of Vrindavan, Gokul preserves the simple, intimate quality of a mother's love for her child. The narrow lanes, the small temples, and the quiet ghats along the Yamuna all speak of a time when the Supreme Lord himself crawled on these very streets as a mischievous, lovable child. For devotees seeking to develop Vatsalya Bhava (parental devotional mood), Gokul is the ideal spiritual destination.`,
    significance: `Gokul holds supreme significance as the place where the Supreme Lord Krishna spent his most formative years as an infant and young child. The Bhagavata Purana dedicates extensive passages to the childhood pastimes of Krishna in Gokul, describing them as the sweetest and most intimate of all his divine activities. It is in Gokul that Yashoda Maiya attained the ultimate spiritual perfection of Vatsalya Prema (parental love for God), when she saw the entire universe within the mouth of her child Krishna, yet her motherly concern remained unchanged — such was the power of her pure love. The Vishnu Dharmottara Purana declares that Gokul is the supreme abode of divine childhood pastimes, and that remembering these pastimes with devotion leads to the highest spiritual realization.`,
    keyAttractions: [
      {
        name: 'Raman Reti',
        description: 'The most famous spot in Gokul, Raman Reti is a large sandbank where Krishna is believed to have played as a child. The word "Raman" means divine play, and "Reti" means sand. Devotees roll in the sacred sand here, believing it to be infused with Krishna\'s divine energy. The site features a beautiful temple and is especially popular with families who bring their children to play in the same sand where the young Krishna once played.',
        image: IMAGES.gokulTemple,
      },
      {
        name: 'Nanda Maharaj Temple (Chaurasi Khamba)',
        description: 'Also known as the 84-Pillar Temple, this ancient structure is believed to be the very house where Nanda Maharaj lived with his family. The temple gets its name from its 84 pillars and houses deities of Nanda Baba, Yashoda Maiya, and child Krishna. According to tradition, the infant Krishna\'s cradle was kept in this very location, and the original structure dates back to ancient times, with the current temple built over it.',
        image: IMAGES.nandgaon,
      },
      {
        name: 'Putana Moksha Sthal',
        description: 'This sacred site marks the spot where the infant Krishna killed the demoness Putana who had come disguised as a beautiful woman to nurse him with poisoned milk. Instead of dying, Krishna sucked the life out of her, and in her dying moments, Putana was liberated from her demonic existence. A temple marks this spot, and the site symbolizes how even the most sinful beings can attain liberation through contact with the divine.',
        image: IMAGES.devoteesTemple,
      },
      {
        name: 'Brahmand Ghat',
        description: 'One of the most sacred ghats on the Yamuna in Gokul, Brahmand Ghat is where the famous pastime of Krishna showing the entire universe (Brahmand) within his mouth took place. When Yashoda looked into Krishna\'s mouth to verify the accusation that he had eaten dirt, she saw the entire cosmos — sun, moon, stars, mountains, and all of creation — within her child\'s mouth. A beautiful temple and ghat mark this extraordinary location.',
        image: IMAGES.keshiGhat,
      },
      {
        name: 'Damodara Temple & Mudala Kunda',
        description: 'This temple commemorates the famous Damodara Lila where Yashoda tied young Krishna to a grinding mortar (mudala) as punishment for breaking a pot of yogurt. The tied Krishna then dragged the mortar between two arjuna trees, miraculously freeing the two celestial beings (Nalakuvara and Manigriva) who had been cursed to remain as trees. The nearby Mudala Kunda is the sacred tank associated with this pastime, and the site is especially revered during the month of Kartik when Damodara worship is performed.',
        image: IMAGES.radhakrishnaDarshan,
      },
    ],
    bestTimeToVisit: 'October to March is ideal for visiting Gokul with comfortable weather. The month of Kartik (October-November) is especially significant here, as the Damodara Lila pastimes are celebrated with special pujas and deep-daan (lamp offerings). Janmashtami (August) and Nandotsav (the day after) are celebrated with great devotion at the Nanda Maharaj Temple. Gokul also celebrates a unique festival during the Purnima (full moon) of the Shravan month (July-August), when the deity of baby Krishna is placed in a cradle for all to rock and bless.',
    howToReach: {
      byAir: 'Nearest airport is Agra (about 60 km). Delhi IGI Airport (about 175 km) is better connected. From either, hire a taxi to Gokul.',
      byTrain: 'The nearest railway station is Mathura Junction (about 15 km). From Mathura, take an auto-rickshaw, taxi, or local bus to Gokul. The journey takes about 30 minutes. Some local trains also stop at Gokul Road station.',
      byRoad: 'Gokul is well-connected by road to Mathura (15 km, 30 min), Vrindavan (12 km, 30 min), Agra (60 km, 1.5 hours), and Delhi (175 km, 3-4 hours via Yamuna Expressway). Auto-rickshaws and cycle rickshaws are readily available from Mathura. Taxis can be hired for a combined tour of Gokul and other Braj destinations.',
    },
    festivals: [
      {
        name: 'Damodara Masa (Kartik Month)',
        description: 'The entire month of Kartik (October-November) is celebrated as Damodara Masa in Gokul, commemorating the Damodara Lila pastime. Special evening prayers called Damodara Aarti are performed at the Damodara Temple, where devotees offer ghee lamps and sing the Damodarashtakam prayers. The atmosphere is deeply devotional, and the tradition of offering a lamp to Damodara (Krishna bound by Yashoda\'s rope) is believed to grant all spiritual and material benedictions.',
        month: 'October-November',
      },
      {
        name: 'Janmashtami in Gokul',
        description: 'While Janmashtami is celebrated throughout Braj, the celebration in Gokul has a unique charm that focuses on the childhood pastimes of Krishna. The Nanda Maharaj Temple and Raman Reti are the centers of celebration. The deity of baby Krishna is bathed with panchamrit, dressed in new clothes, and placed in a decorated cradle. Devotees line up for hours to rock the cradle of baby Krishna, experiencing the bliss of Vatsalya Bhava. The celebrations continue through the night with kirtans and bhajans.',
        month: 'August',
      },
      {
        name: 'Akshaya Tritiya',
        description: 'This auspicious day marks the beginning of the Chandan Yatra festival in Gokul temples, where the deities are smeared with cooling sandalwood paste to protect them from the summer heat. Special abhishek ceremonies are performed, and the temple decorations change to reflect the summer season. The festival also marks the beginning of the annual parikrama season in Braj, and many devotees start their Braj Yatra from Gokul on this day.',
        month: 'April-May',
      },
    ],
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug)
}

export function getAllDestinationSlugs(): string[] {
  return destinations.map(d => d.slug)
}
