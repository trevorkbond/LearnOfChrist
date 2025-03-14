#!/usr/bin/env python
import copy

from bs4 import BeautifulSoup
from urllib.request import urlopen
import re
import pickle
import json

scripture_regex = r"((Gen\.|Ex\.|Lev\.|Num\.|Deut\.|Josh\.|Judg\.|Ruth|1\s+Sam\.|2\s+Sam\.|1\s+Kgs\.|2\s+Kgs\.|1\s+Chr\.|2\s+Chr\.|Ezra|Neh\.|Esth\.|Job|Ps\.|Prov\.|Eccl\.|Song|Isa\.|Jer\.|Lam\.|Ezek\.|Dan\.|Hosea|Joel|Amos|Obad\.|Jonah|Micah|Nahum|Hab\.|Zeph\.|Hag\.|Zech\.|Mal\.|Matt\.|Mark|Luke|John|Acts|Rom\.|1\s+Cor\.|2\s+Cor\.|Gal\.|Eph\.|Philip\.|Col\.|1\s+Thes\.|2\s+Thes\.|1\s+Tim\.|2\s+Tim\.|Titus|Philem\.|Heb\.|James|1\s+Pet\.|2\s+Pet\.|1\s+Jn\.|2\s+Jn\.|3\s+Jn\.|Jude|Rev\.|1\s+Ne\.|2\s+Ne\.|Jacob|Enos|Jarom|Omni|W\s+of\s+M|Mosiah|Alma|Hel\.|3\s+Ne\.|4\s+Ne\.|Morm\.|Ether|Moro\.|D&C|Moses|Abr\.|JS—M|JS—H|A\s+of\s+F)*\s*\d+:*\d+(–*\d+)?)"
book_regex = r"(Gen\.|Ex\.|Lev\.|Num\.|Deut\.|Josh\.|Judg\.|Ruth|1\s+Sam\.|2\s+Sam\.|1\s+Kgs\.|2\s+Kgs\.|1\s+Chr\.|2\s+Chr\.|Ezra|Neh\.|Esth\.|Job|Ps\.|Prov\.|Eccl\.|Song|Isa\.|Jer\.|Lam\.|Ezek\.|Dan\.|Hosea|Joel|Amos|Obad\.|Jonah|Micah|Nahum|Hab\.|Zeph\.|Hag\.|Zech\.|Mal\.|Matt\.|Mark|Luke|John|Acts|Rom\.|1\s+Cor\.|2\s+Cor\.|Gal\.|Eph\.|Philip\.|Col\.|1\s+Thes\.|2\s+Thes\.|1\s+Tim\.|2\s+Tim\.|Titus|Philem\.|Heb\.|James|1\s+Pet\.|2\s+Pet\.|1\s+Jn\.|2\s+Jn\.|3\s+Jn\.|Jude|Rev\.|1\s+Ne\.|2\s+Ne\.|Jacob|Enos|Jarom|Omni|W\s+of\s+M|Mosiah|Alma|Hel\.|3\s+Ne\.|4\s+Ne\.|Morm\.|Ether|Moro\.|D&C|Moses|Abr\.|JS—M|JS—H|A\s+of\s+F|3\s+3)"
book_name_mapping = {
    'Gen.': 'Genesis',
    'Ex.': 'Exodus',
    'Lev.': 'Leviticus',
    'Num.': 'Numbers',
    'Deut.': 'Deuteronomy',
    'Josh.': 'Joshua',
    'Judg.': 'Judges',
    'Ruth': 'Ruth',
    '1 Sam.': '1 Samuel',
    '2 Sam.': '2 Samuel',
    '1 Kgs.': '1 Kings',
    '2 Kgs.': '2 Kings',
    '1 Chr.': '1 Chronicles',
    '2 Chr.': '2 Chronicles',
    'Ezra': 'Ezra',
    'Neh.': 'Nehemiah',
    'Esth.': 'Esther',
    'Job': 'Job',
    'Ps.': 'Psalms',
    'Prov.': 'Proverbs',
    'Eccl.': 'Ecclesiastes',
    'Song': 'Song of Solomon',
    'Isa.': 'Isaiah',
    'Jer.': 'Jeremiah',
    'Lam.': 'Lamentations',
    'Ezek.': 'Ezekiel',
    'Dan.': 'Daniel',
    'Hosea': 'Hosea',
    'Joel': 'Joel',
    'Amos': 'Amos',
    'Obad.': 'Obadiah',
    'Jonah': 'Jonah',
    'Micah': 'Micah',
    'Nahum': 'Nahum',
    'Hab.': 'Habakkuk',
    'Zeph.': 'Zephaniah',
    'Hag.': 'Haggai',
    'Zech.': 'Zechariah',
    'Mal.': 'Malachi',
    'Matt.': 'Matthew',
    'Mark': 'Mark',
    'Luke': 'Luke',
    'John': 'John',
    'Acts': 'Acts',
    'Rom.': 'Romans',
    '1 Cor.': '1 Corinthians',
    '2 Cor.': '2 Corinthians',
    'Gal.': 'Galatians',
    'Eph.': 'Ephesians',
    'Philip.': 'Philippians',
    'Col.': 'Colossians',
    '1 Thes.': '1 Thessalonians',
    '2 Thes.': '2 Thessalonians',
    '1 Tim.': '1 Timothy',
    '2 Tim.': '2 Timothy',
    'Titus': 'Titus',
    'Philem.': 'Philemon',
    'Heb.': 'Hebrews',
    'James': 'James',
    '1 Pet.': '1 Peter',
    '2 Pet.': '2 Peter',
    '1 Jn.': '1 John',
    '2 Jn.': '2 John',
    '3 Jn.': '3 John',
    'Jude': 'Jude',
    'Rev.': 'Revelation',
    '1 Ne.': '1 Nephi',
    '2 Ne.': '2 Nephi',
    'Jacob': 'Jacob',
    'Enos': 'Enos',
    'Jarom': 'Jarom',
    'Omni': 'Omni',
    'W of M': 'Words of Mormon',
    'Mosiah': 'Mosiah',
    'Alma': 'Alma',
    'Hel.': 'Helaman',
    '3 Ne.': '3 Nephi',
    '4 Ne.': '4 Nephi',
    'Morm.': 'Mormon',
    'Ether': 'Ether',
    'Moro.': 'Moroni',
    'D&C': 'Doctrine and Covenants',
    'Moses': 'Moses',
    'Abr.': 'Abraham',
    'JS—M': 'Joseph Smith—Matthew',
    'JS—H': 'Joseph Smith—History',
    'A of F': 'Articles of Faith',
    '3 3': '3 Nephi'
}


def get_url(topic):
    mod_string = re.sub(r',* ', '-', topic).lower()
    return "https://www.churchofjesuschrist.org/study/scriptures/tg/" + mod_string + "?lang=eng"


def get_references():
    url = "https://www.churchofjesuschrist.org/study/scriptures/tg?lang=eng"
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")

    newline_cleanup = re.sub(
        "\n+", "\n", soup.find("nav", class_="manifest").get_text())
    tg_list = newline_cleanup.split("\n")

    christ_tg_topics = [
        topic for topic in tg_list if re.search("^Jesus Christ", topic)]
    christ_tg_dict = {}
    for topic in christ_tg_topics:
        christ_tg_dict[topic] = []

    for topic in christ_tg_topics:
        topic_url = get_url(topic)
        topic_page = urlopen(topic_url)
        topic_html = topic_page.read().decode("utf-8")
        topic_soup = BeautifulSoup(topic_html, "html.parser")

        topic_newline_cleanup = re.sub(
            "\n+", "\n", topic_soup.find("div", class_="body-block").get_text())

        for line in topic_newline_cleanup.split("\n"):
            cleaned_description = re.sub(scripture_regex, '',
                                         line).strip()
            cleaned_description = re.sub(
                r'[^a-zA-Z0-9]*$', '', cleaned_description).strip()
            new_matches = re.findall(scripture_regex, line)
            for match in new_matches:
                match_str = match[0].replace(u'\xa0', ' ').strip()
                match_to_description = {}
                match_to_description[match_str] = cleaned_description
                christ_tg_dict[topic].append(match_to_description)

    with open("saved_references.pkl", "wb+") as file:
        pickle.dump(christ_tg_dict, file)


def get_book_for_each_reference():
    with open("saved_references.pkl", "rb") as f:
        references = pickle.load(f)

    for topic, scripture_list in references.items():
        for i in range(1, len(scripture_list)):
            curr_reference = next(iter(scripture_list[i].keys()))
            if re.match(book_regex, curr_reference) is None:
                num_looking_back = 1
                previous_scripture = next(
                    iter(scripture_list[i - num_looking_back].keys()))
                while re.match(book_regex, previous_scripture) is None:
                    num_looking_back += 1
                    previous_scripture = next(
                        iter(scripture_list[i - num_looking_back].keys()))
                new_scripture = re.match(
                    book_regex, previous_scripture).group() + " " + next(iter(scripture_list[i].keys()))
                new_scripture = re.sub(r"\s+", " ", new_scripture)
                # check if the new_scripture has a chapter
                if ':' not in new_scripture and '–' not in new_scripture:
                    chapter = re.search(
                        r'(?<=\s)(\d+)(?=\:)', previous_scripture).group(0)
                    insert_match = re.search(r'(\d+)(?!.*\d)', new_scripture)
                    if insert_match:
                        # Insert the string before the last number
                        position = insert_match.start(0)
                        new_scripture = new_scripture[:position] + \
                            chapter + ":" + new_scripture[position:]
                scripture_list[i] = {
                    new_scripture: scripture_list[i][curr_reference]}

    with open("saved_references_with_books.pkl", "wb+") as file:
        pickle.dump(references, file)


def map_scripture_to_topic():
    with open("saved_references.pkl", "rb") as f:
        references = pickle.load(f)
    scripture_to_topic = {}

    for topic, scripture_list in references.items():
        for scripture in scripture_list:
            if scripture not in scripture_to_topic:
                scripture_to_topic[scripture] = [topic]
            else:
                scripture_to_topic[scripture].append(topic)

    with open("scripture_to_topic.pkl", "wb+") as file:
        pickle.dump(scripture_to_topic, file)


def get_full_book_name_for_each_reference():
    with open("saved_references_with_books.pkl", "rb") as f:
        references = pickle.load(f)
    for _, scripture_list in references.items():
        for i in range(len(scripture_list)):
            new_ref = get_mapped_reference(
                next(iter(scripture_list[i].keys())))
            new_ref = re.sub(r'–', '-', new_ref)
            scripture_list[i] = {
                new_ref: scripture_list[i][next(iter(scripture_list[i].keys()))]}
    with open("saved_references_with_full_books.pkl", "wb+") as file:
        pickle.dump(references, file)


def get_mapped_reference(ref):
    abbrev_book = re.match(book_regex, ref).group()
    rest_of_ref = ref.split(" ")[-1]
    new_book = book_name_mapping[abbrev_book]
    new_ref = new_book + " " + rest_of_ref
    return new_ref


with open("saved_references_with_full_books.pkl", "rb") as file:
    refs = pickle.load(file)
    with open('final_raw_data.json', 'w', encoding='utf-8') as f:
        json.dump(refs, f, ensure_ascii=False, indent=4)
