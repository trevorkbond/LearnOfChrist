import json
import re
import csv

full_book_regex = r"(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1\s+Samuel|2\s+Samuel|1\s+Kings|2\s+Kings|1\s+Chronicles|2\s+Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song\s+of\s+Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1\s+Corinthians|2\s+Corinthians|Galatians|Ephesians|Philippians|Colossians|1\s+Thessalonians|2\s+Thessalonians|1\s+Timothy|2\s+Timothy|Titus|Philemon|Hebrews|James|1\s+Peter|2\s+Peter|1\s+John|2\s+John|3\s+John|Jude|Revelation|1\s+Nephi|2\s+Nephi|Jacob|Enos|Jarom|Omni|Words\s+of\s+Mormon|Mosiah|Alma|Helaman|3\s+Nephi|4\s+Nephi|Mormon|Ether|Moroni|Doctrine\s+and\s+Covenants|Moses|Abraham|Joseph\s+Smith—Matthew|Joseph\s+Smith—History|Articles\s+of\s+Faith)"

book_order = {
    'Genesis': 0,
    'Exodus': 1,
    'Leviticus': 2,
    'Numbers': 3,
    'Deuteronomy': 4,
    'Joshua': 5,
    'Judges': 6,
    'Ruth': 7,
    '1 Samuel': 8,
    '2 Samuel': 9,
    '1 Kings': 10,
    '2 Kings': 11,
    '1 Chronicles': 12,
    '2 Chronicles': 13,
    'Ezra': 14,
    'Nehemiah': 15,
    'Esther': 16,
    'Job': 17,
    'Psalms': 18,
    'Proverbs': 19,
    'Ecclesiastes': 20,
    'Song of Solomon': 21,
    'Isaiah': 22,
    'Jeremiah': 23,
    'Lamentations': 24,
    'Ezekiel': 25,
    'Daniel': 26,
    'Hosea': 27,
    'Joel': 28,
    'Amos': 29,
    'Obadiah': 30,
    'Jonah': 31,
    'Micah': 32,
    'Nahum': 33,
    'Habakkuk': 34,
    'Zephaniah': 35,
    'Haggai': 36,
    'Zechariah': 37,
    'Malachi': 38,
    'Matthew': 39,
    'Mark': 40,
    'Luke': 41,
    'John': 42,
    'Acts': 43,
    'Romans': 44,
    '1 Corinthians': 45,
    '2 Corinthians': 46,
    'Galatians': 47,
    'Ephesians': 48,
    'Philippians': 49,
    'Colossians': 50,
    '1 Thessalonians': 51,
    '2 Thessalonians': 52,
    '1 Timothy': 53,
    '2 Timothy': 54,
    'Titus': 55,
    'Philemon': 56,
    'Hebrews': 57,
    'James': 58,
    '1 Peter': 59,
    '2 Peter': 60,
    '1 John': 61,
    '2 John': 62,
    '3 John': 63,
    'Jude': 64,
    'Revelation': 65,
    '1 Nephi': 66,
    '2 Nephi': 67,
    'Jacob': 68,
    'Enos': 69,
    'Jarom': 70,
    'Omni': 71,
    'Words of Mormon': 72,
    'Mosiah': 73,
    'Alma': 74,
    'Helaman': 75,
    '3 Nephi': 76,
    '4 Nephi': 77,
    'Mormon': 78,
    'Ether': 79,
    'Moroni': 80,
    'Doctrine and Covenants': 81,
    'Moses': 82,
    'Abraham': 83,
    'Joseph Smith—Matthew': 84,
    'Joseph Smith—History': 85,
    'Articles of Faith': 86
}


topics = set()
references_topics = set()
references = []
scriptures = set()
references_scriptures = set()
new_json = {}
reference_id = 1
with open("final_raw_data.json", "r") as file, open("refs.csv", "w", newline="") as csvfile:
    csv_writer = csv.writer(csvfile)
    topics_json = json.load(file)
    for topic in topics_json:
        topics.add(topic)
        for reference_description in topics_json[topic]:
            reference = next(iter(reference_description))
            description = reference_description[reference]
            book = re.match(full_book_regex, reference).group()
            chapter_verses = re.sub(full_book_regex, "", reference).strip()
            chapter, verses = chapter_verses.split(":")
            start_verse = ""
            end_verse = ""
            if "-" in verses:
                start_verse, end_verse = verses.split("-")
            else:
                start_verse = verses
                end_verse = verses
            reference_entry = (book, chapter,
                               start_verse, end_verse)
            csv_writer.writerow(reference_entry)
            if reference_entry not in references:
                references.append(reference_entry)
            new_json[reference] = {
                "description": description,
                "book": book,
                "chapter": int(chapter),
                "start_verse": int(start_verse),
                "end_verse": int(end_verse),
                "id": reference_id
            }
            reference_id += 1

references.sort(key=lambda val: (
    book_order[val[0]], int(val[1]), int(val[2]), int(val[3])))

with open("new_scripture_data.json", "w") as file:
    json.dump(new_json, file)

with open("refs_unique.csv", "w", newline="") as file:
    csv_writer = csv.writer(file)
    for entry in references:
        csv_writer.writerow(entry)
