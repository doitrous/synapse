#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const moduleId = 'MUST-FHB-102-2'
const conceptId = 'CON-INF-23265735EECCA1'
const articleId = 'ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE'
const trypConceptId = 'CON-INF-BEDAA24AD0E037'
const trypArticleId = 'ART-INF-MUST-FHB1022-AFRICAN-TRYPANOSOMIASIS-STAGE'
const lymeConceptId = 'CON-INF-D077623ED9EADA'
const lymeArticleId = 'ART-INF-MUST-FHB1022-LYME-IXODES'
const relapsingConceptId = 'CON-INF-0C6E9F7F6C60E2'
const relapsingArticleId = 'ART-INF-MUST-FHB1022-EPIDEMIC-RELAPSING-FEVER'
const plagueConceptId = 'CON-INF-22E2FB9AF9697A'
const plagueArticleId = 'ART-INF-MUST-FHB1022-PLAGUE-HUMAN-FLEA'
const paratransConceptId = 'CON-INF-A0D40E9CB0E211'
const paratransArticleId = 'ART-INF-MUST-FHB1022-PARATRANSGENESIS'
const leishConceptId = 'CON-INF-5EAC54C4EC6F18'
const leishArticleId = 'ART-INF-MUST-FHB1022-CUTANEOUS-LEISHMANIASIS-VECTOR'
const sarcoConceptId = 'CON-INF-7400B05B6501D2'
const sarcoArticleId = 'ART-INF-MUST-FHB1022-SARCOPHAGA-WOUND-MYIASIS'
const assessmentResourceId = 'src_b9989e9ef3c314f6c771'
const teachingResourceId = 'src_5c62279de4964083aecb'
const definitionResourceId = 'src_6fb474b2c5871480abef'
const ticksResourceId = 'src_08be9a1018b73dcd7c3'
const liceResourceId = 'src_62dda2ba1dad2602f5db'
const mosquitoResourceId = 'src_b75f65f2298d0fcbc5f3'
const sandflyResourceId = 'src_a82c32271ee38d0b2cad'
const myiasisResourceId = 'src_2c1e04372fbb8b2607f7'
const tbDrugResourceId = 'src_51157599ec58c9f98c28'
const protein30sResourceId = 'src_e059ca4507cf3177b362'
const proteinInhibitorResourceId = 'src_3a69ab072e403a68f287'
const protein50sResourceId = 'src_57dd6426a8e11335031c'
const nucleoproteinResourceId = 'src_5dfd7701d995629e7c36'
const vancomycinResourceId = 'src_875c205531a585cd5b91'
const basicVirologyResourceId = 'src_b500ffe881ed0f4ace5c'
const mycologyResourceId = 'src_72a4c07c4877d4b58c3f'
const generalVirologyResourceId = 'src_09b0450fc24387f25049'
const bacterialGeneticsResourceId = 'src_a3d71ccbc276ec903213'
const antifungalDrugResourceId = 'src_bbf7f72f08ce85032b4d'
const bacterialGrowthResourceId = 'src_da7cc51e7ac1ee22c68a'
const bacterialCellResourceId = 'src_88ddfa49fe01adee5444'
const absalamAssessmentResourceId = 'src_4bd3b78f762673d7eb7f'
const absalamPart2AssessmentResourceId = 'src_8bd3b772b3b32db59726'
const mucizeAssessmentResourceId = 'src_352f47c6e866e76a9d8b'
const introTeachingResourceId = 'src_f65b3872022ca0b42a79'
const hostMicrobeResourceId = 'src_e4b2f7ce3e55fad37c9a'
const antibioticsIntroResourceId = 'src_ee1fb7a716a473eb2d98'
const gramPositiveCocciResourceId = 'src_e2832d7aebaad9c7b1fe'
const cellWallTeachingResourceId = 'src_060e284322ddf8fdf92c'

const introArticles = {
  definitions: 'ART-INF-MUST-FHB1022-PARASITE-DEFINITIONS',
  classification: 'ART-INF-MUST-FHB1022-PARASITE-HABITAT-CLASSIFICATION',
  helminths: 'ART-INF-MUST-FHB1022-HELMINTH-TAXONOMY-MORPHOLOGY',
  locomotion: 'ART-INF-MUST-FHB1022-PROTOZOAN-LOCOMOTION',
  transmission: 'ART-INF-MUST-FHB1022-PARASITE-TRANSMISSION-VECTORS-ZOONOSES',
  arthropodClasses: 'ART-INF-MUST-FHB1022-ARTHROPOD-CLASS-MORPHOLOGY',
  arthropodMetamorphosis: 'ART-INF-MUST-FHB1022-ARTHROPOD-METAMORPHOSIS',
  transovarian: 'ART-INF-MUST-FHB1022-TRANSOVARIAN-TRANSMISSION',
  muscidIdentification: 'ART-INF-MUST-FHB1022-MUSCID-IDENTIFICATION',
  cutaneousMyiasis: 'ART-INF-MUST-FHB1022-CUTANEOUS-MYIASIS-PHORESIS',
  clinicalSiteMyiasis: 'ART-INF-MUST-FHB1022-CLINICAL-SITE-MYIASIS',
  forensicMyiasis: 'ART-INF-MUST-FHB1022-FORENSIC-MYIASIS',
  myiasisTherapyPrevention: 'ART-INF-MUST-FHB1022-MYIASIS-THERAPY-PREVENTION',
  sarcophaga: sarcoArticleId,
  mosquitoBiology: 'ART-INF-MUST-FHB1022-MOSQUITO-BIOLOGY',
  mosquitoDiseases: 'ART-INF-MUST-FHB1022-MOSQUITO-DISEASES',
  mosquitoControl: 'ART-INF-MUST-FHB1022-MOSQUITO-CONTROL',
  sandflyBiology: 'ART-INF-MUST-FHB1022-SANDFLY-BIOLOGY',
  sandflyDiseases: 'ART-INF-MUST-FHB1022-SANDFLY-DISEASES',
  sandflyControl: 'ART-INF-MUST-FHB1022-SANDFLY-CONTROL',
}

const introArticleRelations = {
  definitions: ['classification', 'helminths'],
  classification: ['definitions', 'helminths', 'locomotion', 'transmission'],
  helminths: ['definitions', 'classification'],
  locomotion: ['classification', 'transmission'],
  transmission: ['classification', 'locomotion'],
  arthropodClasses: ['arthropodMetamorphosis'],
  arthropodMetamorphosis: ['arthropodClasses', 'transovarian'],
  transovarian: ['arthropodMetamorphosis'],
  muscidIdentification: ['sarcophaga'],
  cutaneousMyiasis: ['clinicalSiteMyiasis'],
  clinicalSiteMyiasis: ['cutaneousMyiasis', 'myiasisTherapyPrevention', 'sarcophaga'],
  forensicMyiasis: ['myiasisTherapyPrevention', 'sarcophaga'],
  myiasisTherapyPrevention: ['clinicalSiteMyiasis', 'forensicMyiasis'],
  sarcophaga: ['muscidIdentification', 'clinicalSiteMyiasis', 'forensicMyiasis'],
  mosquitoBiology: ['mosquitoDiseases', 'mosquitoControl'],
  mosquitoDiseases: ['mosquitoBiology', 'mosquitoControl'],
  mosquitoControl: ['mosquitoBiology', 'mosquitoDiseases'],
  sandflyBiology: ['sandflyDiseases', 'sandflyControl'],
  sandflyDiseases: ['sandflyBiology', 'sandflyControl'],
  sandflyControl: ['sandflyBiology', 'sandflyDiseases'],
}

const introItems = [
  {
    q: 2, conceptId: 'CON-INF-04A996DBD345A9', canonicalKey: 'parasitology.foundations.parasite-definition',
    label: 'Parasite as a host-associated harmful organism', aliases: ['Parasite definition', 'Parasitic organism'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite definition', page: 5,
    stem: 'A parasite is an organism that:', key: 'B', options: ['Benefits the host', 'A living organism that lives in or on another organism and harms it', 'A free-living organism', 'Can only survive outside a host'],
    claim: 'A parasite is a living organism that lives in or on another organism and harms it.',
    support: 'A parasite is a living organism that lives in or on another living organism and harms it.',
    objective: 'Recognise the host-associated and harmful relationship that defines a parasite.',
    pitfalls: 'A parasite does not benefit its host, and parasitism does not imply that the organism can live only outside a host.',
    rejected: [],
  },
  {
    q: 4, conceptId: 'CON-INF-F82C6307A7B7E3', canonicalKey: 'parasitology.foundations.facultative-parasite',
    label: 'Facultative parasite', aliases: ['Facultative parasitism', 'Free-living or parasitic organism'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite living habits', page: 7,
    stem: 'A facultative parasite:', key: 'B', options: ['Is always dependent on a host', 'Can live both as a parasite and free-living', 'Is always an endoparasite', 'Requires multiple hosts for survival'],
    claim: 'A facultative parasite can alternate between free-living and parasitic modes of life.',
    support: 'Facultative parasites can alternate between free-living and parasitic modes of life.',
    objective: 'Identify the ability to live either freely or parasitically as the defining feature of a facultative parasite.',
    pitfalls: 'Facultative does not mean obligately host-dependent, necessarily endoparasitic, or dependent on multiple hosts.',
    rejected: ['concept_4843023d39649fa9864f9980 — narrower Strongyloides-specific free-living/parasitic example; not the general definition.'],
  },
  {
    q: 5, conceptId: 'CON-INF-C79E84EB999C31', canonicalKey: 'parasitology.foundations.opportunistic-parasite',
    label: 'Opportunistic parasite in immunocompromised hosts', aliases: ['Opportunistic parasitism', 'Parasite causing severe disease in immunocompromised hosts'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Host susceptibility', page: 9,
    stem: 'An opportunistic parasite:', key: 'C', options: ['Causes disease in healthy individuals', 'Only infects plants', 'Causes severe disease in immunocompromised hosts', 'Can live independently without a host'],
    claim: 'An opportunistic parasite may cause severe disease in an immunocompromised host.',
    support: 'An opportunistic parasite causes severe disease in immunocompromised hosts.',
    objective: 'Recognise immunocompromise as the host context associated with severe opportunistic parasitic disease.',
    pitfalls: 'Opportunistic does not mean plant-only infection, obligatory disease in healthy people, or independent free living.',
    rejected: ['concept_99ed9f61ec904013cf85cd95 — narrower Pneumocystis example; not the general opportunistic-parasite definition.'],
  },
  {
    q: 9, conceptId: 'CON-INF-829EB6EC11CC8F', canonicalKey: 'parasitology.habitat.malaria-blood',
    label: 'Malaria parasites inhabit human blood', aliases: ['Malaria blood habitat', 'Haemopoietic habitat of malaria parasites'], conceptType: 'fact',
    article: 'classification', primaryNode: 'DIS-PAR-T01', subtopic: 'Protozoology', microtopic: 'Parasite habitat', page: 16,
    stem: 'What is the habitat of malaria parasites in humans?', key: 'D', options: ['Intestine', 'Muscles', 'Skin', 'Blood'],
    claim: 'Malaria parasites are blood parasites in the human haemopoietic system.',
    support: 'Haemopoietic system: blood parasites e.g. Malaria parasite.',
    objective: 'Identify blood as the human habitat of malaria parasites.',
    pitfalls: 'Do not substitute intestine, muscle, or skin for the blood habitat stated in the local classification slide.',
    rejected: [],
  },
  {
    q: 11, conceptId: 'CON-INF-D13F9697E5B95F', canonicalKey: 'parasitology.classification.taxonomy-and-habitat',
    label: 'Parasites classified by taxonomy and human-body habitat', aliases: ['Scientific and habitat classification of parasites', 'Parasite classification approaches'], conceptType: 'classification',
    article: 'classification', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite classification', page: 32,
    stem: 'Which of the following is is a classification of parasites?', key: 'D', options: ['Based on their taxonomy', 'Based on their habitat in the human body', 'Based on their color', 'A & B'],
    claim: 'Parasites may be classified scientifically by taxonomy or clinically by their habitat in the human host.',
    support: 'Classification of parasites: based on their taxonomy (scientific classification) and based on their habitat (where they live in human host).',
    objective: 'Recognise taxonomy and human-body habitat as two valid approaches to parasite classification.',
    pitfalls: 'Colour is not one of the two classification approaches taught on the governed slide.',
    rejected: [],
  },
  {
    q: 14, conceptId: 'CON-INF-F58CE242AA1B1E', canonicalKey: 'parasitology.helminths.trematode-leaf-like-unsegmented',
    label: 'Trematodes are leaf-like unsegmented flatworms', aliases: ['Trematode morphology', 'Flukes are leaf-like and unsegmented'], conceptType: 'morphology',
    article: 'helminths', primaryNode: 'DIS-PAR-T02', subtopic: 'Helminthology', microtopic: 'Trematodes', page: 33,
    stem: 'What is the shape of trematodes?', key: 'B', options: ['Tape-like and segmented', 'Leaf-like and unsegmented', 'Cylindrical and unsegmented', 'Spherical'],
    claim: 'Trematodes are flat, leaf-like, unsegmented helminths.',
    support: 'Class: Trematoda (the flukes): flat leaf like, un-segmented.',
    objective: 'Distinguish the leaf-like unsegmented morphology of trematodes from cestodes and nematodes.',
    pitfalls: 'Tape-like segmented morphology describes cestodes, while cylindrical unsegmented morphology describes nematodes.',
    rejected: ['concept_7529e2cd8159d395916adb19 — narrower Fasciola-specific leaf-shape example; not the class-level trematode morphology.'],
  },
  {
    q: 15, conceptId: 'CON-INF-DF11AEE644F4AF', canonicalKey: 'parasitology.helminths.flatworms-trematodes-cestodes',
    label: 'Parasitic flatworms include trematodes and cestodes', aliases: ['Flatworm helminth groups', 'Platyhelminths: trematodes and cestodes'], conceptType: 'classification',
    article: 'helminths', primaryNode: 'DIS-PAR-T02', subtopic: 'Helminthology', microtopic: 'Helminth classification', page: 34,
    stem: 'The group of parasitic flatworms includes:', key: 'C', options: ['Trematodes and Nematodes', 'Nematodes and Cestodes', 'Cestodes and Trematodes', 'Cestodes and Protozoa'],
    claim: 'The parasitic flatworms comprise trematodes and cestodes.',
    support: 'Helminths divide into roundworms (nematodes) and flatworms; flatworms divide into trematodes and cestodes.',
    objective: 'Identify trematodes and cestodes as the two parasitic flatworm groups.',
    pitfalls: 'Nematodes are roundworms, and protozoa are unicellular parasites rather than flatworm helminths.',
    rejected: [],
  },
  {
    q: 18, conceptId: 'CON-INF-2A48E6BD3C1F70', canonicalKey: 'parasitology.protozoa.apicomplexa-gliding',
    label: 'Apicomplexa move by gliding', aliases: ['Apicomplexan gliding', 'Gliding locomotion of Apicomplexa'], conceptType: 'classification',
    article: 'locomotion', primaryNode: 'DIS-PAR-T01', subtopic: 'Protozoology', microtopic: 'Protozoan locomotion', page: 41, assessmentPage: 5,
    stem: 'Which of the following is an organism that moves by gliding?', key: 'B', options: ['Entamoeba histolytica', 'Apicomplexa', 'Amoeba', 'Ciliates'],
    claim: 'The local curriculum classifies Apicomplexa as moving by gliding.',
    support: 'Classification of Protozoa based on organs of locomotion: Apicomplexa — By gliding.',
    objective: 'Identify Apicomplexa as the protozoan group associated with gliding locomotion in the local curriculum.',
    pitfalls: 'Amoebae use pseudopodia and ciliates use cilia; do not rewrite the source’s singular “organism” wording even though Apicomplexa is a group.',
    rejected: ['concept_9dc1156f5fddd3a2c18a42af — broader four-group locomotion classification; not the specific Apicomplexa-gliding statement.', 'concept_15a2896e46ef4cd8cbefa6a2 — states absence of a specific locomotor organ rather than the governed gliding wording.'],
  },
  {
    q: 19, conceptId: 'CON-INF-8C35F4B1A206DE', canonicalKey: 'parasitology.transmission.vector-host-to-host',
    label: 'Vector transmits parasites between hosts', aliases: ['Parasitology vector definition', 'Host-to-host parasite vector'], conceptType: 'definition',
    article: 'transmission', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Vectors', page: 12, assessmentPage: 6,
    stem: 'A vector is an organism that:', key: 'B', options: ['Provides nutrition to parasites', 'Transmits parasites from one host to another', 'Serves as a reservoir host', 'Is always infected by the parasite'],
    claim: 'A vector transmits parasites from one host to another.',
    support: 'A vector is usually an arthropod that transmits parasites from one host to another.',
    objective: 'Recognise host-to-host parasite transmission as the defining role of a vector.',
    pitfalls: 'A vector is not defined by nourishing the parasite, serving as a reservoir, or always being infected.',
    rejected: ['concept_cbe678b590c9d68db81d4ed5 — narrower mechanical-versus-biological arthropod transmission identity reserved as the Q29 duplicate hold.'],
  },
  {
    q: 21, conceptId: 'CON-INF-D13F9697E5B95F', canonicalKey: 'parasitology.classification.taxonomy-and-habitat',
    label: 'Parasites classified by taxonomy and human-body habitat', aliases: ['Scientific and habitat classification of parasites', 'Parasite classification approaches'], conceptType: 'classification',
    article: 'classification', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite classification', page: 32, assessmentPage: 6,
    stem: 'What is the purpose of classifying parasites based on habitat?', key: 'C', options: ['For laboratory identification', 'For taxonomic studies', 'For clinical diagnosis', 'For vector control'],
    claim: 'Classification of parasites by their habitat in the human host supports clinical diagnosis.',
    support: 'Based on their habitat (where they live in human host). Purpose: for clinical diagnosis.',
    objective: 'Recognise clinical diagnosis as the purpose of habitat-based parasite classification in the local curriculum.',
    pitfalls: 'Laboratory identification is assigned to scientific taxonomy, not habitat classification.',
    rejected: [],
  },
  {
    q: 22, conceptId: 'CON-INF-93B7D64C0E2A15', canonicalKey: 'parasitology.transmission.zoonotic-animal-origin',
    label: 'Zoonotic parasitic diseases originate from animals', aliases: ['Zoonotic disease definition', 'Animal-origin parasitic disease'], conceptType: 'definition',
    article: 'transmission', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Zoonoses', page: 15, assessmentPage: 6,
    stem: 'Zoonotic diseases are:', key: 'B', options: ['Only found in humans', 'Parasitic diseases that originate from animals', 'Transmitted only through vectors', 'Always caused by protozoa'],
    claim: 'Zoonotic parasitic diseases originate from animal sources and are transmitted to humans.',
    support: 'Parasitic diseases originally from animal sources and transmitted to man are called zoonotic diseases.',
    objective: 'Recognise animal origin as the defining source relationship of zoonotic parasitic disease.',
    pitfalls: 'Zoonoses are not restricted to protozoa or vector-only transmission and are not diseases found only in humans.',
    rejected: [],
  },
  {
    q: 23, conceptId: 'CON-INF-D13F9697E5B95F', canonicalKey: 'parasitology.classification.taxonomy-and-habitat',
    label: 'Parasites classified by taxonomy and human-body habitat', aliases: ['Scientific and habitat classification of parasites', 'Parasite classification approaches'], conceptType: 'classification',
    article: 'classification', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite classification', page: 32, assessmentPage: 7,
    stem: 'What is the purpose of classifying parasites based on their taxonomy?', key: 'A', options: ['For laboratory identification', 'For killing the parasite', 'For clinical diagnosis', 'For vector control'],
    claim: 'Scientific taxonomic classification of parasites supports laboratory identification and diagnosis.',
    support: 'Based on their taxonomy (scientific classification). Purpose: for their laboratory identification and diagnosis.',
    objective: 'Recognise laboratory identification as the purpose of taxonomy-based parasite classification in the local curriculum.',
    pitfalls: 'Clinical diagnosis is assigned to habitat classification; taxonomy is not a method for killing parasites or controlling vectors.',
    rejected: [],
  },
  {
    q: 24, conceptId: 'CON-INF-A5D19C7E204BF3', canonicalKey: 'parasitology.transmission.entry-routes',
    label: 'Parasite entry routes include ingestion, skin penetration and vectors', aliases: ['Routes of parasite entry', 'Parasite transmission entry routes'], conceptType: 'classification',
    article: 'transmission', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Routes of entry', page: 21, teachingPages: '21–22', assessmentPage: 7,
    stem: 'Which of the following is(are) routes of entry of parasites?', key: 'D', options: ['Ingestion', 'Skin penetration', 'Vectors', 'All of the above'],
    claim: 'Parasites can enter hosts through ingestion, skin penetration and vector transmission.',
    support: 'The primary modes of entry include ingestion and penetration of skin; the next teaching slide lists vector transmission.',
    objective: 'Identify ingestion, skin penetration and vectors as routes by which parasites enter hosts.',
    pitfalls: 'Each listed route is taught; do not select one route while excluding the other two.',
    rejected: [],
  },
  {
    q: 25, conceptId: 'CON-INF-6E41B8C3F902AD', canonicalKey: 'parasitology.foundations.obligatory-parasite',
    label: 'Obligatory parasite depends on a host', aliases: ['Obligate parasite', 'Host-dependent parasite'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite living habits', page: 7, assessmentPage: 7,
    stem: 'An obligatory parasite:', key: 'A', options: ['Is always dependent on a host', 'Can live both as a parasite and free-living', 'Is always an endoparasite', 'Requires multiple hosts for survival'],
    claim: 'An obligatory parasite is completely dependent on its host and cannot exist without it.',
    support: 'An obligatory parasite lives completely dependent on its host and cannot exist without it.',
    objective: 'Identify complete host dependence as the defining feature of an obligatory parasite.',
    pitfalls: 'Obligatory does not mean facultative, necessarily endoparasitic, or dependent on multiple hosts.',
    rejected: ['concept_b976208980c6167c35ff80fa — broader list of endoparasite categories; not the complete host-dependence definition.'],
  },
  {
    q: 31, bankQ: 1, conceptId: 'CON-INF-A4C8D2136F90B7', canonicalKey: 'parasitology.arthropods.insecta-arachnida-leg-count',
    label: 'Insecta and Arachnida differ by leg-pair count', aliases: ['Insect and arachnid leg counts', 'Three versus four pairs of arthropod legs'], conceptType: 'classification',
    article: 'arthropodClasses', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Arthropod classification', page: 3, assessmentPage: 10,
    teachingResourceId: myiasisResourceId,
    stem: 'How many pairs of legs do insects typically have?', key: 'C', options: ['1', '2', '3', '4'],
    claim: 'Insects typically have three pairs of legs.',
    support: 'Class Insecta: 3 pairs of legs.',
    objective: 'Identify three pairs of legs as the typical Class Insecta pattern.',
    pitfalls: 'Four pairs of legs identifies Arachnida in the local classification; one or two pairs do not match either taught class.',
    rejected: [],
  },
  {
    q: 32, bankQ: 2, conceptId: 'CON-INF-A4C8D2136F90B7', canonicalKey: 'parasitology.arthropods.insecta-arachnida-leg-count',
    label: 'Insecta and Arachnida differ by leg-pair count', aliases: ['Insect and arachnid leg counts', 'Three versus four pairs of arthropod legs'], conceptType: 'classification',
    article: 'arthropodClasses', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Arthropod classification', page: 4, assessmentPage: 10,
    teachingResourceId: myiasisResourceId,
    stem: 'How many pairs of legs do arachnids have?', key: 'C', options: ['2', '3', '4', '5'],
    claim: 'Arachnids have four pairs of legs.',
    support: 'Class Arachnida: 4 pairs of legs.',
    objective: 'Identify four pairs of legs as the Class Arachnida pattern.',
    pitfalls: 'Three pairs of legs identifies Insecta; two or five pairs do not match the local arthropod-classification slide.',
    rejected: [],
  },
  {
    q: 33, bankQ: 3, conceptId: 'CON-INF-1E7B4A9D306FC2', canonicalKey: 'parasitology.arthropods.complete-metamorphosis-holometabolous',
    label: 'Complete metamorphosis is holometabolous', aliases: ['Holometabolous metamorphosis', 'Complete arthropod metamorphosis'], conceptType: 'definition',
    article: 'arthropodMetamorphosis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Metamorphosis', page: 8, teachingPages: '7–8', assessmentPage: 10,
    teachingResourceId: myiasisResourceId,
    stem: 'What type of metamorphosis is called complete metamorphosis?', key: 'A', options: ['Holometabolous', 'Hemimetabolous', 'Both of them', 'None of the above'],
    claim: 'Complete metamorphosis is called holometabolous metamorphosis.',
    support: 'Complete metamorphosis: Holometabolous.',
    objective: 'Identify holometabolous as the term for complete metamorphosis.',
    pitfalls: 'Hemimetabolous describes incomplete metamorphosis and is not interchangeable with holometabolous.',
    rejected: ['concept_ee09278739800fd98031c61a — Chrysops-specific complete-metamorphosis example; not the general holometabolous definition.', 'concept_3f0bf457e07d8f6c5ffebc19 — sand-fly-specific complete-metamorphosis example; not the general definition.', 'concept_5ff9a835b91d24b057877b28 — housefly-specific complete-metamorphosis example; not the general definition.'],
  },
  {
    q: 40, bankQ: 10, conceptId: 'CON-INF-7C2E91B4F805AD', canonicalKey: 'parasitology.vector-transmission.transovarian',
    label: 'Transovarian transmission passes pathogens to offspring', aliases: ['Vertical arthropod transmission', 'Pathogen passage through arthropod eggs'], conceptType: 'definition',
    article: 'transovarian', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Transovarian transmission', page: 15, assessmentPage: 12,
    teachingResourceId: myiasisResourceId,
    stem: 'What is the term for arthropods transmitting pathogens to offspring?', key: 'C', options: ['Propagative', 'Cyclo-propagative', 'Transovarian', 'Cyclo-developmental'],
    claim: 'Transovarian transmission passes a pathogen from an arthropod to its offspring.',
    support: 'Trans-ovarian transmission: the infective agent is passed to the offspring.',
    objective: 'Identify transovarian transmission as arthropod-to-offspring pathogen passage.',
    pitfalls: 'Propagative, cyclopropagative and cyclodevelopmental describe events in the vector rather than transmission to offspring.',
    rejected: ['concept_649287c6052c87091710dd54 — narrower hard-tick transovarian-maintenance example; not the general offspring-transmission definition.'],
  },
  {
    q: 41, bankQ: 11, conceptId: 'CON-INF-5D8A2F31C7E604', canonicalKey: 'parasitology.muscidae.stomoxys-piercing-sucking-proboscis',
    label: 'Stomoxys has a piercing and sucking proboscis', aliases: ['Stable-fly proboscis', 'Stomoxys calcitrans mouthparts'], conceptType: 'morphology',
    article: 'muscidIdentification', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Muscidae identification', page: 23, teachingPages: '22–23', assessmentPage: 13,
    teachingResourceId: myiasisResourceId,
    stem: 'What is the distinguishing feature of Stomoxys calcitrans (Stable fly)?', key: 'A', options: ['Piercing and sucking proboscis', 'Biting without sucking blood', 'Proboscis adapted for nectar feeding', 'Absence of wings'],
    claim: 'Stomoxys calcitrans has a piercing and sucking proboscis.',
    support: 'Stomoxys calcitrans: proboscis piercing and sucking.',
    objective: 'Identify the piercing and sucking proboscis as a distinguishing Stomoxys feature.',
    pitfalls: 'The stable fly is winged and blood-feeding; its proboscis is not adapted only for nectar and does not bite without sucking.',
    rejected: [],
  },
  {
    q: 44, bankQ: 14, conceptId: 'CON-INF-9B3C7E21A5D840', canonicalKey: 'parasitology.muscidae.musca-posterior-spiracle',
    label: 'Musca larva has a D-shaped posterior spiracle', aliases: ['Housefly posterior spiracle', 'Musca domestica larval spiracle morphology'], conceptType: 'morphology',
    article: 'muscidIdentification', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Muscidae identification', page: 28, assessmentPage: 14,
    teachingResourceId: myiasisResourceId,
    stem: 'What is the shape of Musca domestica larva’s posterior spiracle?', key: 'B', options: ['Triangular with complete peritreme, 3 long. slits', 'D-shape, medial button 3 M-shaped sinuous slits', 'Rounded with incomplete peritreme, 3 long. slits', 'None of them'],
    claim: 'Musca domestica larva has a D-shaped posterior spiracle with a medial button and three M-shaped sinuous slits.',
    support: 'Musca posterior spiracles: D-shaped, medial button, 3 M-shaped sinuous slits.',
    objective: 'Recognise the D-shaped posterior spiracle, medial button and three M-shaped sinuous slits of Musca larvae.',
    pitfalls: 'Triangular complete-peritreme and rounded incomplete-peritreme patterns belong to other fly larvae in the comparison table.',
    rejected: ['concept_c5d51a3d11cc596d324e5761 — broader posterior-spiracle morphology identity; not the Musca-specific D-shaped pattern.'],
  },
  {
    q: 47, bankQ: 17, conceptId: 'CON-INF-0A47C19D5E2B84', canonicalKey: 'parasitology.myiasis.cutaneous-cordylobia-dermatobia-hypoderma',
    label: 'Cordylobia, Dermatobia and Hypoderma cause cutaneous myiasis', aliases: ['Cutaneous myiasis fly genera', 'Cutaneous myiasis causes'], conceptType: 'classification',
    article: 'cutaneousMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Cutaneous myiasis', page: 46, teachingPages: '37, 42 and 46', assessmentPage: 14,
    teachingResourceId: myiasisResourceId,
    stem: 'Which of the following causes cutaneous myiasis:', key: 'D', options: ['Cordylobia', 'Dermatobia', 'Hypoderma', 'All of the above'],
    claim: 'Cordylobia, Dermatobia and Hypoderma can each cause cutaneous myiasis.',
    support: 'The deck identifies Dermatobia and Cordylobia as obligatory cutaneous myiasis flies and lists Hypoderma among flies causing cutaneous myiasis.',
    objective: 'Recognise Cordylobia, Dermatobia and Hypoderma as causes of cutaneous myiasis.',
    pitfalls: 'All three offered genera are associated with cutaneous myiasis in the governed teaching; do not exclude two by selecting only one.',
    rejected: ['concept_9da141963fe4f773b6431e12 — broader classification of cutaneous-myiasis types; not the three-genus cause set.', 'concept_1ffd40812a4df1ef0eb6ca09 — obligatory living-tissue requirement; not the three-genus cutaneous-myiasis classification.'],
  },
  {
    q: 48, bankQ: 18, conceptId: 'CON-INF-1B48D20E6F3C95', canonicalKey: 'parasitology.myiasis.dermatobia-phoresis',
    label: 'Dermatobia uses another insect to carry its eggs', aliases: ['Dermatobia phoresis', 'Human botfly egg carriage'], conceptType: 'mechanism',
    article: 'cutaneousMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Cutaneous myiasis', page: 38, teachingPages: '37–38', assessmentPage: 14,
    teachingResourceId: myiasisResourceId,
    stem: 'Which method is used by Dermatobia hominis (human botfly) for transmission?', key: 'B', options: ['Direct deposition of eggs on the skin', 'It uses another insect to carry eggs', 'Ingestion of larvae', 'Deposition in water sources'],
    claim: 'Dermatobia hominis uses another insect to carry and deliver its eggs.',
    support: 'Dermatobia uses phoresis: eggs are attached to another insect, which carries them to the host.',
    objective: 'Identify carriage by another insect as the Dermatobia transmission method.',
    pitfalls: 'The governed mechanism is insect carriage, not direct skin deposition, larval ingestion or deposition in water.',
    rejected: [],
  },
  {
    q: 49, bankQ: 19, conceptId: 'CON-INF-2C49E31F704DA6', canonicalKey: 'parasitology.myiasis.wound-sarcophagidae-calliphoridae',
    label: 'Sarcophagidae and Calliphoridae cause wound myiasis', aliases: ['Wound-myiasis fly families', 'Flesh flies and blowflies in wound myiasis'], conceptType: 'classification',
    article: 'sarcophaga', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Wound myiasis', page: 46, teachingPages: '32, 39 and 46', assessmentPage: '14–15',
    teachingResourceId: myiasisResourceId,
    stem: 'Which fly family is responsible for wound myiasis?', key: 'D', options: ['Sarcophagidae', 'Calliphoridae', 'Glossinidae', 'A & B'],
    claim: 'Sarcophagidae and Calliphoridae are fly families associated with wound myiasis.',
    support: 'The governed deck places Sarcophaga/Sarcophagidae and Calliphora/Lucilia of Calliphoridae among flies invading wounds and causing traumatic cutaneous myiasis.',
    objective: 'Recognise both Sarcophagidae and Calliphoridae as wound-myiasis families.',
    pitfalls: 'Both A and B are supported; Glossinidae is not presented as a wound-myiasis family in the governed comparison.',
    rejected: ['concept_8ffbe95c3b6704234743614c — broader list of myiasis-associated fly families; not the focused two-family wound-myiasis identity.', 'CON-INF-7400B05B6501D2 — existing Sarcophaga-only wound-myiasis concept covers only half of the combined keyed answer.'],
  },
  {
    q: 51, bankQ: 21, conceptId: 'CON-INF-3D51F420815EB7', canonicalKey: 'parasitology.myiasis.urogenital-fannia',
    label: 'Fannia causes urogenital myiasis', aliases: ['Fannia urogenital myiasis association', 'Urogenital myiasis fly'], conceptType: 'fact',
    article: 'clinicalSiteMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Clinical myiasis', page: 45, teachingPages: '42 and 45', assessmentPage: 15,
    teachingResourceId: myiasisResourceId,
    stem: 'Which of the following causes Urogenital myiasis?', key: 'B', options: ['Sarcophaga', 'Fannia', 'Musca domestica', 'Cordylobia'],
    claim: 'Fannia is associated with urogenital myiasis.',
    support: 'The clinical-site classification lists Fannia under urogenital myiasis.',
    objective: 'Identify Fannia as the offered fly associated with urogenital myiasis.',
    pitfalls: 'The governed site-specific association selects Fannia rather than Sarcophaga, Musca domestica or Cordylobia.',
    rejected: ['concept_25a7c6c1a0f6c476622cf674 — describes urogenital-myiasis manifestations; not the Fannia association.'],
  },
  {
    q: 52, bankQ: 22, conceptId: 'CON-INF-4E52A531926FC8', canonicalKey: 'parasitology.myiasis.aural-sarcophaga',
    label: 'Sarcophaga is associated with aural myiasis', aliases: ['Sarcophaga aural myiasis association', 'Aural myiasis fly'], conceptType: 'fact',
    article: 'clinicalSiteMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Clinical myiasis', page: 51, teachingPages: '42 and 51', assessmentPage: 15,
    teachingResourceId: myiasisResourceId,
    stem: 'Aural myiasis commonly occurs due to:', key: 'A', options: ['Sarcophaga', 'Anopheles', 'Calliphora', 'Stomoxys'],
    claim: 'Sarcophaga is associated with aural myiasis in the local curriculum.',
    support: 'The governed clinical-site material identifies Sarcophaga in association with aural myiasis.',
    objective: 'Identify Sarcophaga as the offered fly associated with aural myiasis.',
    pitfalls: 'The local site-specific association selects Sarcophaga, not the mosquito Anopheles, Calliphora or Stomoxys.',
    rejected: ['concept_0e16a8f3a380e17ec90d2ba6 — describes aural-myiasis complications; not the Sarcophaga association.', 'concept_25690ce10dd47faf309ae1f3 — defines external-ear myiasis; not the Sarcophaga association.'],
  },
  {
    q: 53, bankQ: 23, conceptId: 'CON-INF-5F53B642A370D9', canonicalKey: 'parasitology.forensics.lucilia-sarcophaga',
    label: 'Lucilia and Sarcophaga are used in forensic parasitology', aliases: ['Forensic myiasis-associated flies', 'Lucilia and Sarcophaga in forensic work'], conceptType: 'fact',
    article: 'forensicMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Forensic entomology', page: 40, teachingPages: '39–40', assessmentPage: '15–16',
    teachingResourceId: myiasisResourceId,
    stem: 'Which fly species is commonly involved in forensic parasitology?', key: 'D', options: ['Glossina', 'Lucilia', 'Sarcophaga', 'B & C'],
    claim: 'Lucilia and Sarcophaga are used in forensic parasitology and entomology.',
    support: 'The forensic teaching names Lucilia and Sarcophaga among the flies used to assess decomposing remains.',
    objective: 'Recognise Lucilia and Sarcophaga as the two offered forensic fly taxa.',
    pitfalls: 'Both Lucilia and Sarcophaga are supported. The source calls them “species” in the stem although the offered names are genera; preserve that wording without changing the answer.',
    rejected: ['concept_eff95f557102c66a6ce45d64 — covers Lucilia morphology only; not its forensic association or the combined Lucilia/Sarcophaga identity.'],
  },
  {
    q: 54, bankQ: 24, conceptId: 'CON-INF-6054C753B481EA', canonicalKey: 'parasitology.myiasis.mdt-diabetic-foot',
    label: 'Maggot debridement therapy treats diabetic foot ulcers', aliases: ['MDT for diabetic foot', 'Larval therapy for diabetic ulcers'], conceptType: 'management',
    article: 'myiasisTherapyPrevention', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Myiasis management', page: 41, assessmentPage: 16,
    teachingResourceId: myiasisResourceId,
    stem: 'Which condition is treated using Maggot Debridement Therapy (MDT)?', key: 'B', options: ['Tuberculosis', 'Diabetes foot ulcers', 'Malaria', 'Pneumonia'],
    claim: 'Maggot debridement therapy is used to treat diabetic foot ulcers.',
    support: 'The deck describes maggot debridement therapy for diabetic foot.',
    objective: 'Identify diabetic foot ulcers as the condition treated with maggot debridement therapy.',
    pitfalls: 'The governed therapeutic use is diabetic foot wound debridement, not tuberculosis, malaria or pneumonia.',
    rejected: [],
  },
  {
    q: 56, bankQ: 26, conceptId: 'CON-INF-7156D864C592FB', canonicalKey: 'parasitology.calliphoridae.triangular-complete-peritreme',
    label: 'Calliphoridae larva has a triangular complete-peritreme posterior spiracle', aliases: ['Calliphoridae posterior spiracle', 'Blowfly larval spiracle morphology'], conceptType: 'morphology',
    article: 'sarcophaga', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Fly larval identification', page: 32, assessmentPage: 16,
    teachingResourceId: myiasisResourceId,
    stem: 'What is the shape of Calliphoridae larva’s posterior spiracle?', key: 'A', options: ['Triangular with complete peritreme, 3 long. slits', 'D-shape, medial button 3 M-shaped sinuous slits', 'Rounded with incomplete peritreme, 3 long. slits', 'None of them'],
    claim: 'Calliphoridae larvae have triangular posterior spiracles with a complete peritreme and three long slits.',
    support: 'The comparison table gives the Calliphoridae larval posterior spiracle as triangular, with complete peritreme and three long slits.',
    objective: 'Recognise the triangular complete-peritreme three-slit Calliphoridae larval pattern.',
    pitfalls: 'The D-shaped M-slit pattern belongs to Musca, while the rounded incomplete-peritreme pattern belongs to Sarcophaga in the governed table.',
    rejected: ['concept_c5d51a3d11cc596d324e5761 — broader posterior-spiracle diagnostic identity; not the family-specific Calliphoridae morphology.'],
  },
  {
    q: 57, bankQ: 27, conceptId: 'CON-INF-8257E975D6A30C', canonicalKey: 'parasitology.myiasis.prevention-wound-hygiene',
    label: 'Proper wound hygiene helps prevent myiasis', aliases: ['Myiasis wound prevention', 'Clean wound prevention measure'], conceptType: 'prevention',
    article: 'myiasisTherapyPrevention', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Myiasis prevention', page: 56, assessmentPage: '16–17',
    teachingResourceId: myiasisResourceId,
    stem: 'What is a common preventive measure for myiasis?', key: 'A', options: ['Proper wound hygiene', 'Keeping flies as pets', 'Increasing humidity in homes', 'Avoiding antibiotics'],
    claim: 'Proper wound hygiene and covering a clean wound help prevent myiasis.',
    support: 'The prevention slide instructs cleaning the wound and closing it with surgical dressing.',
    objective: 'Identify proper wound hygiene as a preventive measure for myiasis.',
    pitfalls: 'Keeping flies, increasing indoor humidity and avoiding antibiotics are not the wound-protection measure taught in the governed deck.',
    rejected: ['concept_82a88b95daa10ff6ae935fff — broader myiasis and housefly control scope; not the specific wound-hygiene action.', 'concept_a5e0413816dbec96b1178762 — neglected-wound risk factor; not the prevention action itself.'],
  },
  {
    q: 58, bankQ: 28, conceptId: 'CON-INF-9358FA86E7B41D', canonicalKey: 'parasitology.forensics.postmortem-interval-flies',
    label: 'Forensic entomology estimates post-mortem interval', aliases: ['Fly-based time-of-death estimation', 'Forensic post-mortem interval'], conceptType: 'application',
    article: 'forensicMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Forensic entomology', page: 40, assessmentPage: 17,
    teachingResourceId: myiasisResourceId,
    stem: 'How can forensic entomology assist in criminal investigations?', key: 'B', options: ['Identifying toxic substances in blood', 'Determining time of death (Post-mortem Interval)', 'Diagnosing malaria', 'Detecting bacteria in wounds'],
    claim: 'Forensic entomology can estimate the post-mortem interval from fly evidence.',
    support: 'The forensic-entomology slide explains using fly larvae and succession to estimate the post-mortem interval or time since death.',
    objective: 'Identify post-mortem interval estimation as a forensic-entomology contribution to criminal investigation.',
    pitfalls: 'The governed application is time-since-death estimation, not blood toxicology, malaria diagnosis or bacterial wound detection.',
    rejected: ['concept_a603c60e0c6a1022ef020314 — estimates time of death through rigor mortis, a different mechanism from forensic entomology.'],
  },
]

const mosquitoItems = [
  { q: 1, conceptId: 'CON-INF-4EEE8525216319', canonicalKey: 'parasitology.mosquitoes.taxonomy-insecta-diptera', label: 'Mosquitoes are insects in the order Diptera', aliases: ['Mosquito taxonomy', 'Insecta Diptera mosquitoes'], conceptType: 'classification', article: 'mosquitoBiology', microtopic: 'Mosquito taxonomy', teachingPages: '3–4', assessmentPage: 1, stem: 'Which class do mosquitoes belong to?', key: 'B', options: ['Arachnida', 'Insecta', 'Crustacea', 'Siphonaptera'], claim: 'Mosquitoes belong to class Insecta and order Diptera.', support: 'The official deck places mosquitoes in class Insecta and lists mosquitoes under order Diptera.', objective: 'Identify Insecta as the class containing mosquitoes.', pitfalls: 'Diptera is the order, while Arachnida and Crustacea are different arthropod classes and Siphonaptera is the flea order.', rejected: [] },
  { q: 2, conceptId: 'CON-INF-4EEE8525216319', canonicalKey: 'parasitology.mosquitoes.taxonomy-insecta-diptera', label: 'Mosquitoes are insects in the order Diptera', aliases: ['Mosquito taxonomy', 'Insecta Diptera mosquitoes'], conceptType: 'classification', article: 'mosquitoBiology', microtopic: 'Mosquito taxonomy', teachingPages: '3–4', assessmentPage: 1, stem: 'Which order do mosquitoes belong to?', key: 'C', options: ['Hemiptera', 'Siphonaptera', 'Diptera', 'Anoplura'], claim: 'Mosquitoes belong to class Insecta and order Diptera.', support: 'The official deck places mosquitoes and flies in order Diptera.', objective: 'Identify Diptera as the order containing mosquitoes.', pitfalls: 'Hemiptera contains bugs, Siphonaptera contains fleas and Anoplura contains lice in the governed classification.', rejected: [] },
  { q: 3, conceptId: 'CON-INF-FABEF04D8E14A7', canonicalKey: 'parasitology.mosquitoes.complete-metamorphosis', label: 'Mosquitoes undergo complete metamorphosis', aliases: ['Mosquito complete metamorphosis', 'Holometabolous mosquito life cycle'], conceptType: 'life cycle', article: 'mosquitoBiology', microtopic: 'Mosquito life cycle', teachingPage: 8, assessmentPage: '1–2', stem: 'What type of metamorphosis do mosquitoes undergo?', key: 'B', options: ['Incomplete', 'Complete', 'Partial', 'None'], claim: 'Mosquitoes undergo complete metamorphosis.', support: 'The official mosquito life-cycle slide explicitly labels the mosquito cycle as complete metamorphosis.', objective: 'Identify complete metamorphosis as the mosquito developmental pattern.', pitfalls: 'Mosquitoes are not presented as having incomplete, partial or absent metamorphosis.', rejected: [] },
  { q: 4, conceptId: 'CON-INF-1FB0421D44FF97', canonicalKey: 'parasitology.mosquitoes.aquatic-immature-stages', label: 'Mosquito eggs larvae and pupae are aquatic stages', aliases: ['Aquatic mosquito stages', 'Immature mosquito stages'], conceptType: 'life cycle', article: 'mosquitoBiology', microtopic: 'Mosquito life cycle', teachingPages: '8, 11', assessmentPage: 2, stem: 'Which of the following is an aquatic stage of the mosquito lifecycle?', key: 'D', options: ['Larvae', 'Pupae', 'Eggs', 'All of the above'], claim: 'Mosquito eggs, larvae and pupae are aquatic immature stages.', support: 'The official deck states that immature mosquito stages—eggs, larvae and pupae—are aquatic.', objective: 'Recognise eggs, larvae and pupae as aquatic mosquito stages.', pitfalls: 'All three listed immature stages are aquatic, so selecting only one omits other directly taught aquatic stages.', rejected: [] },
  { q: 6, conceptId: 'CON-INF-449076BA8EA921', canonicalKey: 'parasitology.mosquitoes.anopheles-resting-angle', label: 'Anopheles rests at a 45-degree angle', aliases: ['Anopheles resting position', 'Mosquito resting angle'], conceptType: 'morphology', article: 'mosquitoBiology', microtopic: 'Mosquito morphology', teachingPage: 7, assessmentPage: 2, stem: 'Which mosquito species rests at a 45-degree angle to the surface?', key: 'C', options: ['Culex', 'Aedes', 'Anopheles', 'None of the above'], claim: 'Adult Anopheles rests at a 45-degree angle to the surface.', support: 'The official deck contrasts Anopheles at 45 degrees with Culex and Aedes parallel to the surface.', objective: 'Identify Anopheles from its 45-degree resting position.', pitfalls: 'Culex and Aedes rest parallel to the surface in the governed comparison.', rejected: [] },
  { q: 7, conceptId: 'CON-INF-CD80FDDAADB0C0', canonicalKey: 'parasitology.mosquitoes.female-temporary-obligate-ectoparasite', label: 'Female mosquitoes are temporary obligatory ectoparasites', aliases: ['Female mosquito parasitic habit', 'Temporary obligatory ectoparasite'], conceptType: 'classification', article: 'mosquitoBiology', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 3, stem: 'Female mosquitos are:', key: 'A', options: ['Temporary obligatory ectoparasites', 'Permanent obligatory endoparasites', 'Temporary facultative ectoparasites', 'Permanent facultative endoparasites'], claim: 'Female mosquitoes are temporary obligatory ectoparasites.', support: 'The official bionomics slide directly classifies female mosquitoes as temporary obligatory ectoparasites.', objective: 'Classify female mosquitoes by duration, dependence and host location.', pitfalls: 'They are not permanent, endoparasitic or facultative in the governed classification.', rejected: [] },
  { q: 8, conceptId: 'CON-INF-3D4CC9A1238C61', canonicalKey: 'parasitology.mosquitoes.culex-annoying-hum', label: 'Culex produces an annoying hum in flight', aliases: ['Culex flight hum', 'Mosquito acoustic behaviour'], conceptType: 'behaviour', article: 'mosquitoBiology', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 3, stem: 'Which mosquito species produces an annoying hum while flying?', key: 'B', options: ['Anopheles', 'Culex', 'Aedes', 'None of the above'], claim: 'Culex produces an annoying hum, whereas Anopheles approaches silently.', support: 'The official bionomics slide states that Culex has an annoying hum while Anopheles has a silent approach.', objective: 'Identify Culex from the annoying flight hum.', pitfalls: 'The governed contrast assigns the silent approach to Anopheles, not the annoying hum.', rejected: [] },
  { q: 9, conceptId: 'CON-INF-17EA50AF2F923C', canonicalKey: 'parasitology.mosquitoes.pupa-nonfeeding', label: 'The mosquito pupa is non-feeding', aliases: ['Non-feeding mosquito stage', 'Mosquito pupa feeding status'], conceptType: 'life cycle', article: 'mosquitoBiology', microtopic: 'Mosquito life cycle', teachingPage: 11, assessmentPage: 3, stem: 'Which of the following mosquito stage(s) is(are) non-feeding?', key: 'B', options: ['Larve', 'Pupae', 'Adult', 'A & C'], claim: 'The mosquito pupa is the non-feeding stage, while the larva feeds.', support: 'The official deck states that larvae are feeding stages and pupae are non-feeding.', objective: 'Identify the mosquito pupa as the non-feeding stage.', pitfalls: 'The source typo “Larve” is preserved; larva is feeding and the governed answer is Pupae.', rejected: [] },
  { q: 10, conceptId: 'CON-INF-D40D6E6C25F7C4', canonicalKey: 'parasitology.mosquitoes.blood-meal-stimulates-ovulation', label: 'A blood meal stimulates ovulation in female mosquitoes', aliases: ['Mosquito ovulation trigger', 'Blood meal and egg laying'], conceptType: 'physiology', article: 'mosquitoBiology', microtopic: 'Mosquito bionomics', teachingPage: 10, assessmentPage: 3, stem: 'What stimulates ovulation in female mosquitoes?', key: 'C', options: ['Presence of water', 'Exposure to sunlight', 'Blood meal', 'Mating'], claim: 'A blood meal stimulates the hormone production necessary for ovulation in female mosquitoes.', support: 'The official deck states that the blood meal stimulates production of a hormone necessary for ovulation.', objective: 'Identify a blood meal as the ovulation stimulus in female mosquitoes.', pitfalls: 'Water, sunlight and mating are not the stimulus named by the governed teaching statement.', rejected: [] },
  { q: 15, conceptId: 'CON-INF-C78116FCC3B754', canonicalKey: 'parasitology.mosquitoes.zika-congenital-microcephaly', label: 'Maternal Zika infection is associated with congenital microcephaly', aliases: ['Zika congenital microcephaly', 'Mosquito-borne microcephaly association'], conceptType: 'clinical association', article: 'mosquitoDiseases', microtopic: 'Aedes-borne disease', teachingPages: '19, 24', assessmentPage: 5, stem: 'Which mosquito-borne disease is associated with congenital microcephaly?', key: 'B', options: ['Malaria', 'Zika virus', 'Yellow fever', 'Rift Valley fever'], claim: 'Zika virus infection during pregnancy is associated with congenital microcephaly.', support: 'The official Aedes disease table and congenital case slide associate maternal Zika infection with congenital microcephaly.', objective: 'Identify Zika virus as the mosquito-borne infection associated with congenital microcephaly.', pitfalls: 'The governed association is Zika, not malaria, yellow fever or Rift Valley fever.', rejected: ['concept_2f42dd8709456d0836771eb0 — broader raw arboviral microcephaly wording does not preserve the explicit Zika identity tested here.'] },
  { q: 17, conceptId: 'CON-INF-84CF3B2FCF546F', canonicalKey: 'parasitology.mosquitoes.anopheles-larva-surface-feeding', label: 'Anopheles larvae are the most surface-feeding mosquito larvae', aliases: ['Anopheles surface feeder', 'Mosquito larval siphon comparison'], conceptType: 'behaviour', article: 'mosquitoBiology', microtopic: 'Mosquito larvae', teachingPage: 11, assessmentPage: 5, stem: 'Which of the following is the most surface feeder?', key: 'B', options: ['Aedes', 'Anopheles', 'Culex', 'All of the above'], claim: 'Anopheles larvae are more surface-feeding because they lack a siphon.', support: 'The official deck explicitly calls Anopheles larvae more surface feeders due to lack of a siphon.', objective: 'Identify Anopheles as the most surface-feeding offered mosquito larva.', pitfalls: 'The singular source wording is preserved; Culex is described as farthest from the surface because of its long siphon.', rejected: [] },
  { q: 18, conceptId: 'CON-INF-476CFE4CB1DE34', canonicalKey: 'parasitology.mosquitoes.culex-filariasis-cyclodevelopmental', label: 'Culex transmits Wuchereria bancrofti cyclodevelopmentally', aliases: ['Culex filariasis transmission type', 'Wuchereria cyclodevelopmental transmission'], conceptType: 'mechanism', article: 'mosquitoDiseases', microtopic: 'Culex-borne filariasis', teachingPages: '27–28', assessmentPage: '5–6', stem: 'What type of transmission does Culex use for filariasis?', key: 'C', options: ['Propagative', 'Cyclo-propagative', 'Cyclo-developmental', 'None of the above'], claim: 'Culex transmits Wuchereria bancrofti by cyclodevelopmental transmission.', support: 'The official Culex table and life-cycle slide label Wuchereria transmission as cyclodevelopmental.', objective: 'Identify cyclodevelopmental transmission for Culex-borne filariasis.', pitfalls: 'Wuchereria develops without the multiplication pattern that defines cyclopropagative transmission.', rejected: ['concept_a0aff0c30fa4c2646a6e9ddf — broader raw Culex/Wuchereria vector association does not preserve the transmission-type identity tested here.'] },
  { q: 19, conceptId: 'CON-INF-38226C7CAC7BE1', canonicalKey: 'parasitology.mosquitoes.attraction-bright-light-dark-clothes', label: 'Mosquitoes are attracted by bright light and dark clothes', aliases: ['Mosquito attractants', 'Bright light and dark clothing'], conceptType: 'behaviour', article: 'mosquitoBiology', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 6, stem: 'What is the primary attractant for mosquitoes?', key: 'D', options: ['Dark clothes', 'Bright light', 'Sweet smells', 'A & B'], claim: 'Mosquitoes are attracted by bright light and dark clothes.', support: 'The official bionomics slide directly lists bright light and dark clothes as attractants.', objective: 'Select the combined bright-light and dark-clothes option.', pitfalls: 'Both A and B are directly supported, so selecting only one makes the response incomplete.', rejected: [] },
  { q: 21, conceptId: 'CON-INF-863856AB7138F8', canonicalKey: 'parasitology.mosquitoes.control-gambusia-biological', label: 'Gambusia fish provide biological mosquito control', aliases: ['Gambusia mosquito control', 'Larvivorous fish control'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Biological mosquito control', teachingPage: 38, assessmentPage: 6, stem: 'Which of the following is a biological control method for mosquitoes?', key: 'A', options: ['Using Gambusia fish', 'Spraying insecticides', 'Removing breeding sites', 'Using mosquito nets'], claim: 'Using Gambusia fish is a biological mosquito-control method.', support: 'The official control slide lists Gambusia affinis among natural enemies used for biological control.', objective: 'Identify Gambusia fish as biological mosquito control.', pitfalls: 'Insecticides are chemical, breeding-site removal is physical and mosquito nets are mechanical protection.', rejected: [] },
  { q: 22, conceptId: 'CON-INF-BDA58A5572D741', canonicalKey: 'parasitology.mosquitoes.control-bacillus-thuringiensis', label: 'Bacillus thuringiensis is used in biological mosquito control', aliases: ['Bacterial mosquito control', 'Bacillus thuringiensis larval control'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Biological mosquito control', teachingPage: 38, assessmentPage: '6–7', stem: 'Which bacteria is used in biological mosquito control?', key: 'A', options: ['Bacillus thuringiensis', 'Clostridium botulinum', 'Escherichia coli', 'Mycobacterium tuberculosis'], claim: 'Bacillus thuringiensis is used as a bacterial biological control against mosquito larvae.', support: 'The official slide identifies Bacillus thuringiensis spores as highly toxic to mosquito larvae.', objective: 'Identify Bacillus thuringiensis as the bacterial biological-control agent.', pitfalls: 'The other offered bacteria are not listed as biological mosquito-control agents.', rejected: [] },
  { q: 23, conceptId: 'CON-INF-65E5061E3821D1', canonicalKey: 'parasitology.mosquitoes.control-ddt-chemical', label: 'Spraying DDT is chemical mosquito control', aliases: ['DDT mosquito control', 'Chemical vector control'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Chemical mosquito control', teachingPages: '40, 43', assessmentPage: 7, stem: 'Which of the following is a chemical control method?', key: 'B', options: ['Using mosquito nets', 'Spraying DDT', 'Introducing dragonflies', 'Removing stagnant water'], claim: 'Spraying DDT is a chemical mosquito-control method.', support: 'The official deck lists DDT among chemical residual insecticides.', objective: 'Identify DDT spraying as chemical mosquito control.', pitfalls: 'Nets are mechanical, dragonflies are biological and stagnant-water removal is physical control.', rejected: [] },
  { q: 24, conceptId: 'CON-INF-F255517C50045A', canonicalKey: 'parasitology.mosquitoes.ddt-persistence-toxicity', label: 'DDT use is discouraged because of environmental persistence and toxicity', aliases: ['DDT environmental persistence', 'Organochlorine accumulation risk'], conceptType: 'safety', article: 'mosquitoControl', microtopic: 'Chemical mosquito control', teachingPages: '39–40', assessmentPage: 7, stem: 'Why has the use of DDT been discouraged?', key: 'B', options: ['High cost', 'Environmental persistence and toxicity', 'Ineffectiveness against mosquitoes', 'Short-lasting effect'], claim: 'DDT use is discouraged because organochlorines persist in the environment, accumulate in tissues and are toxic chemicals.', support: 'The official deck describes mosquito-control chemicals as poisonous and says DDT should be avoided because of persistence and tissue accumulation.', objective: 'Identify environmental persistence and toxicity as the reason DDT use is discouraged.', pitfalls: 'The governed concern is not high cost, ineffectiveness or a short-lasting effect.', rejected: [] },
  { q: 26, conceptId: 'CON-INF-526EC45FD5407A', canonicalKey: 'parasitology.mosquitoes.control-drainage-physical', label: 'Draining swamps is physical mosquito control', aliases: ['Swamp drainage mosquito control', 'Physical breeding-site control'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Physical mosquito control', teachingPage: 37, assessmentPage: 8, stem: 'Which mosquito control method involves draining swamps?', key: 'B', options: ['Chemical', 'Physical', 'Biological', 'Genetic'], claim: 'Draining or filling swampy breeding sites is physical mosquito control.', support: 'The official physical-control slide lists filling swampy areas and draining water collections.', objective: 'Classify swamp drainage as physical mosquito control.', pitfalls: 'Drainage does not use a chemical, biological enemy or genetic method.', rejected: [] },
  { q: 27, conceptId: 'CON-INF-2C5809D3326AEE', canonicalKey: 'parasitology.mosquitoes.malathion-residual-insecticide', label: 'Malathion is a residual mosquito insecticide', aliases: ['Malathion residual control', 'Organophosphorus mosquito insecticide'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Chemical mosquito control', teachingPage: 43, assessmentPage: 8, stem: 'Which of the following is an example of a residual insecticide?', key: 'B', options: ['Pyrethrum', 'Malathion', 'Citronella oil', 'Eucalyptus oil'], claim: 'Malathion is listed as a residual organophosphorus mosquito insecticide.', support: 'The official adult-control slide contrasts non-residual Pyrethrum with residual Malathion.', objective: 'Identify Malathion as the residual insecticide in the offered set.', pitfalls: 'Pyrethrum is non-residual, while citronella and eucalyptus oils are repellents.', rejected: [] },
  { q: 28, conceptId: 'CON-INF-7DD1BECF36B7C0', canonicalKey: 'parasitology.mosquitoes.control-window-screens-mechanical', label: 'Window screens are mechanical mosquito control', aliases: ['Mosquito window screening', 'Mechanical adult mosquito control'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Mechanical mosquito control', teachingPage: 41, assessmentPage: 8, stem: 'Which of the following is an example of mechanical mosquito control?', key: 'C', options: ['Spraying insecticides', 'Using fish to eat larvae', 'Installing window screens', 'Using Bacillus thuringiensis'], claim: 'Installing window screens is a mechanical mosquito-control measure.', support: 'The official adult-control slide lists screening windows and doors with wire screens.', objective: 'Identify window screens as mechanical mosquito control.', pitfalls: 'Spraying is chemical, while fish and Bacillus thuringiensis are biological controls.', rejected: [] },
  { q: 30, conceptId: 'CON-INF-DE8BA9EC7D8688', canonicalKey: 'parasitology.mosquitoes.paris-green-larvicidal-only', label: 'Paris green is larvicidal and does not affect non-feeding pupae', aliases: ['Paris green larvicide', 'Stomach-poison mosquito larvicide'], conceptType: 'intervention', article: 'mosquitoControl', microtopic: 'Chemical mosquito control', teachingPage: 39, assessmentPage: 9, stem: 'Which of the following is larvicidal only?', key: 'A', options: ['Paris green (stomach poison)', 'Non-volatile oils', 'Fish', 'DDT'], claim: 'Paris green is a stomach poison that is larvicidal and does not affect non-feeding pupae.', support: 'The official deck states that Paris green is larvicidal and that pupae are not affected because they do not feed.', objective: 'Identify Paris green as the larvicidal-only option.', pitfalls: 'Non-volatile oils poison eggs, larvae and pupae; fish consume aquatic stages; DDT is not described as larvicidal only.', rejected: ['concept_93621f76281954bdf8c77e72 — broader raw control list does not preserve the larvicidal-only and pupa-exclusion identity.'] },
].map((item) => ({
  idPrefix: 'MOSQ2', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  answerPage: 9, bankLabel: 'Parasitology — Mosquitoes', teachingResourceId: mosquitoResourceId,
  teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
  primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', ...item,
}))

introItems.push(...mosquitoItems)

const sandflyItems = [
  { q: 1, conceptId: 'CON-INF-04788D75905E81', canonicalKey: 'parasitology.sandfly.name-sandy-yellow', label: 'Sandflies are named for their sandy yellow colour', aliases: ['Sandfly name', 'Sandy yellow sandfly'], conceptType: 'morphology', article: 'sandflyBiology', microtopic: 'Sandfly morphology', teachingPage: 2, assessmentPage: 10, stem: 'Why are sandflies called "sandflies"?', key: 'B', options: ['They breed in sand', 'They have a sandy yellow color', 'They live in deserts only', 'They are found in beaches'], claim: 'Sandflies are called sandflies because they have a sandy yellow colour.', support: 'The official deck directly describes sandflies as sandy yellow.', objective: 'Identify sandy yellow colour as the basis of the sandfly name.', pitfalls: 'The governed naming feature is colour, not breeding substrate, desert restriction or beach habitat.', rejected: [] },
  { q: 2, conceptId: 'CON-INF-51472DA1BC2690', canonicalKey: 'parasitology.sandfly.genera-phlebotomus-lutzomyia', label: 'Phlebotomus and Lutzomyia are sandfly genera', aliases: ['Sandfly genera', 'Phlebotomus and Lutzomyia'], conceptType: 'classification', article: 'sandflyBiology', microtopic: 'Sandfly taxonomy', teachingPage: 4, assessmentPage: 10, stem: 'Which of the following genera belong to sandflies?', key: 'C', options: ['Culex and Aedes', 'Anopheles and Culex', 'Phlebotomus and Lutzomyia', 'Aedes and Phlebotomus'], claim: 'Phlebotomus and Lutzomyia are sandfly genera.', support: 'The official deck lists Phlebotomus in the Old World and Lutzomyia in the New World.', objective: 'Recognise Phlebotomus and Lutzomyia as sandfly genera.', pitfalls: 'Culex, Aedes and Anopheles are mosquito genera rather than the complete sandfly pair offered here.', rejected: [] },
  { q: 3, conceptId: 'CON-INF-F4702893869E6F', canonicalKey: 'parasitology.sandfly.complete-metamorphosis-30-days', label: 'Sandflies complete metamorphosis in about thirty days', aliases: ['Sandfly metamorphosis', 'Thirty-day sandfly development'], conceptType: 'life cycle', article: 'sandflyBiology', microtopic: 'Sandfly life cycle', teachingPage: 6, assessmentPage: 10, stem: 'What type of metamorphosis do sandflies undergo?', key: 'B', options: ['Incomplete metamorphosis', 'Complete metamorphosis', 'Direct development', 'None of the above'], claim: 'Sandflies undergo complete metamorphosis.', support: 'The official life-cycle slide directly states complete metamorphosis.', objective: 'Identify complete metamorphosis as the sandfly developmental pattern.', pitfalls: 'The governed deck does not describe incomplete metamorphosis, direct development or absent metamorphosis.', rejected: [] },
  { q: 4, conceptId: 'CON-INF-F4702893869E6F', canonicalKey: 'parasitology.sandfly.complete-metamorphosis-30-days', label: 'Sandflies complete metamorphosis in about thirty days', aliases: ['Sandfly metamorphosis', 'Thirty-day sandfly development'], conceptType: 'life cycle', article: 'sandflyBiology', microtopic: 'Sandfly life cycle', teachingPage: 6, assessmentPage: 11, stem: 'What is the lifespan of sandfly development from egg to adult?', key: 'B', options: ['15 days', '30 days', '45 days', '60 days'], claim: 'Sandfly development from egg to adult takes about 30 days.', support: 'The official life-cycle slide gives approximately 30 days from egg through larva and pupa to adult.', objective: 'Recall the approximately thirty-day sandfly developmental period.', pitfalls: 'The governed deck gives 30 days, not 15, 45 or 60 days.', rejected: [] },
  { q: 5, conceptId: 'CON-INF-D1A1215A337B4F', canonicalKey: 'parasitology.sandfly.papatasi-egypt', label: 'Phlebotomus papatasi is prevalent in Egypt', aliases: ['Egyptian sandfly species', 'Phlebotomus papatasi'], conceptType: 'epidemiology', article: 'sandflyBiology', microtopic: 'Sandfly distribution', teachingPage: 4, assessmentPage: 11, stem: 'Which species of sandfly is prevalent in Egypt?', key: 'B', options: ['Lutzomyia longipalpis', 'Phlebotomus papatasi', 'Anopheles gambiae', 'Culex quinquefasciatus'], claim: 'Phlebotomus papatasi is the sandfly species identified as prevalent in Egypt.', support: 'The official deck identifies Phlebotomus papatasii as the species prevalent in Egypt; the assessment spelling papatasi is retained unchanged.', objective: 'Identify Phlebotomus papatasi as the locally prevalent sandfly species.', pitfalls: 'Lutzomyia longipalpis is a New World sandfly, while Anopheles and Culex are mosquito genera.', rejected: [] },
  { q: 6, conceptId: 'CON-INF-3E498A4DEF942C', canonicalKey: 'parasitology.sandfly.phlebotomus-sucks-blood-veins', label: 'Phlebotomus is named for sucking blood from veins', aliases: ['Phlebotomus name meaning', 'Vein blood feeding'], conceptType: 'definition', article: 'sandflyBiology', microtopic: 'Sandfly terminology', teachingPage: 2, assessmentPage: 11, stem: 'Which of the following sucks blood from veins?', key: 'B', options: ['Lutzomyia', 'Phlebotomus', 'Musca domestica', 'Culex'], claim: 'The name Phlebotomus refers to sucking blood from veins.', support: 'The official deck explains Phlebotomus as sucking blood from veins.', objective: 'Associate vein blood-feeding terminology with Phlebotomus.', pitfalls: 'The offered Lutzomyia, Musca and Culex names are not given this meaning in the governed deck.', rejected: [] },
  { q: 7, conceptId: 'CON-INF-D794E6CF4268C2', canonicalKey: 'parasitology.sandfly.daytime-hiding-burrows-cracks', label: 'Adult sandflies hide in burrows and building cracks by day', aliases: ['Sandfly daytime hiding places', 'Burrow and crack resting sites'], conceptType: 'behaviour', article: 'sandflyBiology', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 11, stem: 'During the daytime, where are adult sandflies most likely to hide?', key: 'D', options: ['In rodent burrows', 'Inside cracks or crevices in buildings', 'Inside water', 'A & B'], claim: 'Adult sandflies hide in rodent burrows and in cracks or crevices in buildings during the daytime.', support: 'The official bionomics slide lists rodent burrows and cracks or crevices in buildings as daytime resting sites.', objective: 'Select both governed daytime hiding habitats.', pitfalls: 'Both A and B are supported; sandflies do not use water as the governed daytime hiding site.', rejected: [] },
  { q: 8, conceptId: 'CON-INF-E09D0599F15B92', canonicalKey: 'parasitology.sandfly.female-nocturnal-feeder', label: 'Female sandflies feed at night', aliases: ['Nocturnal female sandfly', 'Sandfly feeding time'], conceptType: 'behaviour', article: 'sandflyBiology', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 12, stem: 'What type of feeder is a female sandfly?', key: 'B', options: ['Diurnal (feeds during the day)', 'Nocturnal (feeds at night)', 'Crepuscular (feeds at dawn)', 'Non-feeding'], claim: 'Female sandflies are nocturnal feeders.', support: 'The official bionomics slide directly states that females feed at night.', objective: 'Identify the female sandfly as a nocturnal feeder.', pitfalls: 'The governed statement is nocturnal, not diurnal, dawn-only or non-feeding.', rejected: [] },
  { q: 9, conceptId: 'CON-INF-D884D3F6076D08', canonicalKey: 'parasitology.sandfly.harrara-bite-reaction', label: 'Sandfly bites cause the painful itchy Harrara reaction', aliases: ['Harrara', 'Sandfly bite papule'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Sandfly bite reaction', teachingPage: 11, assessmentPage: 12, stem: 'What type of reaction is typically seen at the bite site of a sandfly?', key: 'C', options: ['A painless mark with no symptoms', 'A small bruise that quickly fades', 'A painful and itchy red papule surrounded by erythema', 'Immediate blister formation'], claim: 'A sandfly bite typically causes a painful and itchy red papule surrounded by erythema.', support: 'The official clinical slide directly describes a painful itchy red papule surrounded by erythema.', objective: 'Recognise the characteristic local sandfly-bite reaction.', pitfalls: 'The governed reaction is symptomatic papular erythema rather than a painless mark, fading bruise or immediate blister.', rejected: [] },
  { q: 10, conceptId: 'CON-INF-509BF395C5EBF9', canonicalKey: 'parasitology.sandfly.weak-hopping-flight', label: 'Sandflies are weak fliers with hopping movement', aliases: ['Sandfly movement', 'Weak hopping flight'], conceptType: 'behaviour', article: 'sandflyBiology', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 12, stem: 'How do sandflies typically move?', key: 'C', options: ['Long-distance flight', 'Strong, continuous flight', 'Weak fliers, hopping movement', 'Underground burrowing'], claim: 'Sandflies are weak fliers and characteristically move by hopping.', support: 'The official bionomics slide directly describes weak flight and hopping movement.', objective: 'Identify weak hopping movement as characteristic sandfly locomotion.', pitfalls: 'The deck does not describe strong continuous or long-distance flight, and burrows are resting habitat rather than movement.', rejected: [] },
  { q: 11, conceptId: 'CON-INF-D884D3F6076D08', canonicalKey: 'parasitology.sandfly.harrara-bite-reaction', label: 'Sandfly bites cause the painful itchy Harrara reaction', aliases: ['Harrara', 'Sandfly bite papule'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Sandfly bite reaction', teachingPages: '10–11', assessmentPage: 12, stem: 'What is the local reaction caused by a sandfly bite called?', key: 'C', options: ['Oroya fever', 'Leishmaniasis', 'Harrara', 'Sandfly fever'], claim: 'The local reaction caused by a sandfly bite is called Harrara.', support: 'The official deck names the direct bite reaction Harrara and describes its painful itchy papule.', objective: 'Name Harrara as the local sandfly-bite reaction.', pitfalls: 'Oroya fever, leishmaniasis and sandfly fever are transmitted diseases rather than the local bite reaction.', rejected: [] },
  { q: 13, conceptId: 'CON-INF-F538E763E1260E', canonicalKey: 'parasitology.sandfly.disease-profile', label: 'Sandflies transmit leishmaniasis, Oroya fever and viral sandfly fever', aliases: ['Sandfly-transmitted diseases', 'Sandfly fever virus'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Sandfly-transmitted disease', teachingPages: '10, 26', assessmentPage: 13, stem: 'What is the causative agent of sandfly fever?', key: 'C', options: ['Leishmania spp.', 'Bartonella bacilliformis', 'Virus', 'Protozoa'], claim: 'Sandfly fever is caused by a virus.', support: 'The official deck lists viral sandfly fever and directly states that sandfly fever is caused by a virus.', objective: 'Identify a virus as the cause of sandfly fever.', pitfalls: 'Leishmania causes leishmaniasis and Bartonella bacilliformis causes Oroya fever; neither is the sandfly-fever agent.', rejected: [] },
  { q: 14, conceptId: 'CON-INF-F538E763E1260E', canonicalKey: 'parasitology.sandfly.disease-profile', label: 'Sandflies transmit leishmaniasis, Oroya fever and viral sandfly fever', aliases: ['Sandfly-transmitted diseases', 'Sandfly fever virus'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Sandfly-transmitted disease', teachingPage: 10, assessmentPage: 13, stem: 'Which of the following diseases is NOT transmitted by sandflies?', key: 'B', options: ['Leishmaniasis', 'Malaria', 'Oroya fever', 'Sandfly fever'], claim: 'Sandflies transmit leishmaniasis, Oroya fever and sandfly fever, but malaria is not in the governed sandfly disease list.', support: 'The official disease list includes leishmaniasis, Oroya fever and viral sandfly fever and does not include malaria.', objective: 'Identify malaria as outside the governed sandfly-transmitted disease list.', pitfalls: 'Leishmaniasis, Oroya fever and sandfly fever are all explicitly listed as sandfly-transmitted diseases.', rejected: [] },
  { q: 21, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile', label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Oroya fever', teachingPage: 28, assessmentPage: 15, stem: 'What is the causative agent of Oroya fever?', key: 'B', options: ['Leishmania donovani', 'Bartonella bacilliformis', 'Plasmodium falciparum', 'Trypanosoma cruzi'], claim: 'Oroya fever is caused by Bartonella bacilliformis.', support: 'The official deck directly names Bartonella bacilliformis as the cause of Oroya fever.', objective: 'Identify Bartonella bacilliformis as the Oroya-fever agent.', pitfalls: 'Leishmania, Plasmodium and Trypanosoma are not the causative agent named for Oroya fever.', rejected: [] },
  { q: 23, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile', label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'clinical association', article: 'sandflyDiseases', microtopic: 'Oroya fever', teachingPages: '12, 28', assessmentPage: 16, stem: 'What type of anemia is associated with Oroya fever?', key: 'B', options: ['Iron deficiency anemia', 'Hemolytic anemia', 'Megaloblastic anemia', 'Aplastic anemia'], claim: 'Oroya fever is associated with acute hemolytic anemia.', support: 'The official deck directly associates Oroya fever with severe acute hemolytic anemia.', objective: 'Identify hemolytic anemia as the anemia associated with Oroya fever.', pitfalls: 'The governed association is hemolysis, not iron deficiency, megaloblastic or aplastic anemia.', rejected: [] },
  { q: 24, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile', label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'mechanism', article: 'sandflyDiseases', microtopic: 'Oroya fever', teachingPages: '10, 28', assessmentPage: 16, stem: 'What type of transmission occurs in Bartonellosis?', key: 'B', options: ['Cyclo-propagative', 'Propagative', 'Mechanical', 'None of the above'], claim: 'Bartonellosis is transmitted propagatively by sandflies.', support: 'The official deck labels Bartonella bacilliformis transmission as propagative.', objective: 'Identify propagative transmission in sandfly-borne bartonellosis.', pitfalls: 'The governed deck distinguishes this propagative pattern from cyclopropagative leishmaniasis and mechanical transmission.', rejected: [] },
  { q: 26, conceptId: 'CON-INF-D5B09C8CE384D6', canonicalKey: 'parasitology.sandfly.narrow-mesh-net-prevention', label: 'Narrow-mesh nets help prevent sandfly bites', aliases: ['Sandfly bed-net prevention', 'Narrow-mesh mosquito nets'], conceptType: 'prevention', article: 'sandflyControl', microtopic: 'Sandfly bite prevention', teachingPage: 32, assessmentPage: 16, stem: 'What is an effective method to prevent sandfly bites?', key: 'A', options: ['Sleeping under mosquito nets with narrow meshes', 'Stop using repellents', 'Burning dried plants indoors', 'Wearing dark-colored clothes'], claim: 'Sleeping under mosquito nets with narrow meshes helps prevent sandfly bites.', support: 'The official control slide recommends narrow-mesh mosquito nets and repellents.', objective: 'Identify narrow-mesh bed nets as a sandfly-bite prevention measure.', pitfalls: 'Stopping repellents, burning plants and dark clothing are not the governed prevention recommendation.', rejected: [] },
  { q: 27, conceptId: 'CON-INF-C6B9B514C3AC20', canonicalKey: 'parasitology.sandfly.control-not-stagnant-water', label: 'Sandfly control does not rely on draining stagnant water', aliases: ['Sandfly habitat control', 'Non-aquatic sandfly breeding'], conceptType: 'prevention', article: 'sandflyControl', microtopic: 'Sandfly control', teachingPages: '9, 32', assessmentPage: 17, stem: 'Which of the following is NOT a method of sandfly control?', key: 'D', options: ['Filling cracks in walls', 'Spraying insecticides', 'Using bed nets', 'Draining stagnant water'], claim: 'Filling cracks, spraying insecticides and using bed nets are sandfly-control measures, whereas draining stagnant water is not in the governed sandfly-control set because sandflies do not breed in water.', support: 'The official deck states that sandflies do not breed in water and recommends filling cracks, insecticides and narrow-mesh nets.', objective: 'Identify stagnant-water drainage as outside the governed sandfly-control measures.', pitfalls: 'Crack filling, insecticide spraying and bed nets are each explicitly recommended.', rejected: [] },
  { q: 30, conceptId: 'CON-INF-3D7119FED6F45C', canonicalKey: 'parasitology.sandfly.exophilic-indoor-adaptation', label: 'Sandflies are more exophilic than endophilic but use indoor refuges', aliases: ['Sandfly exophily', 'Indoor and outdoor sandfly habitats'], conceptType: 'behaviour', article: 'sandflyBiology', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 17, stem: 'Why do sandfly control measures focus on indoor and outdoor habitats?', key: 'B', options: ['Sandflies are only found indoors', 'Sandflies are highly exophilic but can adapt to indoor environments', 'Sandflies breed in water', 'Sandflies only bite humans'], claim: 'Sandflies are more exophilic than endophilic but also use indoor cracks and crevices as refuges.', support: 'The official deck describes sandflies as more exophilic than endophilic while listing cracks and crevices in buildings among resting sites.', objective: 'Connect sandfly exophily and indoor refuges to control of both habitat settings.', pitfalls: 'Sandflies are not restricted to indoors, do not breed in water and are not defined as biting only humans.', rejected: [] },
].map((item) => ({
  idPrefix: 'SAND2', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  answerPage: 18, bankLabel: 'Parasitology — Sandfly', teachingResourceId: sandflyResourceId,
  teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
  primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', ...item,
}))

introItems.push(...sandflyItems)

const mucizeParasitologyItems = [
  {
    q: 3, conceptId: 'CON-INF-04A996DBD345A9', canonicalKey: 'parasitology.foundations.parasite-definition',
    label: 'Parasite as a host-associated harmful organism', aliases: ['Parasite definition', 'Parasitic organism'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite definition', teachingPage: 5, assessmentPage: 6, answerPage: 6,
    stem: 'Which of the following correctly defines a parasite?', key: 'B', options: ['An organism that benefits the host', 'An organism that lives at the expense of another organism', 'A free-living organism', 'A non-living infectious agent'],
    claim: 'A parasite lives at the expense of another living organism.',
    support: 'A parasite is a living organism that lives in or on another living organism and harms it.',
    objective: 'Recognise the harmful host-associated relationship that defines a parasite.',
    pitfalls: 'A parasite does not benefit the host, is not defined as free-living, and is a living organism rather than a non-living infectious agent.', rejected: [],
  },
  {
    q: 5, conceptId: 'CON-INF-829EB6EC11CC8F', canonicalKey: 'parasitology.habitat.malaria-blood',
    label: 'Malaria parasites inhabit human blood', aliases: ['Malaria blood habitat', 'Haemopoietic habitat of malaria parasites'], conceptType: 'fact',
    article: 'classification', primaryNode: 'DIS-PAR-T01', subtopic: 'Protozoology', microtopic: 'Parasite habitat', teachingPage: 16, assessmentPage: 6, answerPage: 6,
    stem: 'Where do blood parasites primarily reside?', key: 'C', options: ['Skin', 'Lungs', 'Blood', 'Stomach'],
    claim: 'Malaria parasites are blood parasites in the human haemopoietic system.',
    support: 'Haemopoietic system: blood parasites e.g. Malaria parasite.',
    objective: 'Identify blood as the primary habitat named for blood parasites in the governed local teaching.',
    pitfalls: 'The governed habitat is blood, not skin, lungs or stomach.', rejected: [],
  },
  {
    q: 8, conceptId: 'CON-INF-C79E84EB999C31', canonicalKey: 'parasitology.foundations.opportunistic-parasite',
    label: 'Opportunistic parasite in immunocompromised hosts', aliases: ['Opportunistic parasitism', 'Parasite causing severe disease in immunocompromised hosts'], conceptType: 'definition',
    article: 'definitions', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Host susceptibility', teachingPage: 9, assessmentPage: 7, answerPage: 7,
    stem: 'Which type of parasite causes disease in immuno-compromised individuals?', key: 'A', options: ['Opportunistic parasite', 'Temporary parasite', 'Permanent parasite', 'Ectoparasite'],
    claim: 'An opportunistic parasite may cause severe disease in an immunocompromised host.',
    support: 'An opportunistic parasite causes severe disease in immunocompromised hosts.',
    objective: 'Identify an opportunistic parasite from the immunocompromised-host context.',
    pitfalls: 'Temporary, permanent and ectoparasite describe different parasite relationships and do not name the governed immunocompromised-host association.', rejected: [],
  },
  {
    q: 9, conceptId: 'CON-INF-D13F9697E5B95F', canonicalKey: 'parasitology.classification.taxonomy-and-habitat',
    label: 'Parasites classified by taxonomy and human-body habitat', aliases: ['Scientific and habitat classification of parasites', 'Parasite classification approaches'], conceptType: 'classification',
    article: 'classification', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite classification', teachingPage: 32, assessmentPage: 7, answerPage: 7,
    stem: 'How are parasites classified in medical parasitology?', key: 'C', options: ['Based on their DNA structure', 'Based on their host’s immune response', 'Based on taxonomy and habitat', 'Based on their antibiotic resistance'],
    claim: 'Parasites may be classified scientifically by taxonomy or clinically by their habitat in the human host.',
    support: 'Classification of parasites: based on their taxonomy (scientific classification) and based on their habitat (where they live in human host).',
    objective: 'Recognise taxonomy and habitat as the two governed approaches to parasite classification.',
    pitfalls: 'The local classification slide does not use DNA structure, host immune response or antibiotic resistance as the offered classification pair.', rejected: [],
  },
  {
    q: 11, conceptId: 'CON-INF-DF11AEE644F4AF', canonicalKey: 'parasitology.helminths.flatworms-trematodes-cestodes',
    label: 'Parasitic flatworms include trematodes and cestodes', aliases: ['Flatworm helminth groups', 'Platyhelminths: trematodes and cestodes'], conceptType: 'classification',
    article: 'helminths', primaryNode: 'DIS-PAR-T02', subtopic: 'Helminthology', microtopic: 'Helminth classification', teachingPage: 34, assessmentPage: 7, answerPage: 7,
    stem: 'Which group of parasites includes tapeworms?', key: 'C', options: ['Protozoa', 'Trematoda', 'Cestoda', 'Nematoda'],
    claim: 'Tapeworms belong to class Cestoda.',
    support: 'Class Cestoda (the tapeworms): flat, segmented.',
    objective: 'Identify Cestoda as the helminth class that includes tapeworms.',
    pitfalls: 'Trematoda are flukes, Nematoda are roundworms, and Protozoa are unicellular parasites rather than tapeworms.',
    rejected: ['concept_b80a272b4cd80d7b91bc7ee6 — raw tapeworm/Cestoda wording overlaps this governed local identity and is retained as rejected merge provenance.'],
  },
  {
    q: 15, conceptId: 'CON-INF-4EEE8525216319', canonicalKey: 'parasitology.mosquitoes.taxonomy-insecta-diptera',
    label: 'Mosquitoes are insects in the order Diptera', aliases: ['Mosquito taxonomy', 'Insecta Diptera mosquitoes'], conceptType: 'classification',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito taxonomy', teachingPages: '3–4', assessmentPage: 8, answerPage: 8,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the correct classification of a mosquito?', key: 'A', options: ['Class Insecta, Order Diptera', 'Class Arachnida, Order Scorpiones', 'Class Crustacea, Order Decapoda', 'Class Platyhelminthes, Order Trematoda'],
    claim: 'Mosquitoes belong to class Insecta and order Diptera.',
    support: 'The official deck places mosquitoes in class Insecta and lists mosquitoes under order Diptera.',
    objective: 'Identify class Insecta and order Diptera as the complete mosquito classification offered.',
    pitfalls: 'Arachnida, Crustacea and Platyhelminthes are not the mosquito class, and Scorpiones, Decapoda and Trematoda are not the mosquito order.', rejected: [],
  },
  {
    q: 28, conceptId: 'CON-INF-3D51F420815EB7', canonicalKey: 'parasitology.myiasis.urogenital-fannia',
    label: 'Fannia causes urogenital myiasis', aliases: ['Fannia urogenital myiasis association', 'Urogenital myiasis fly'], conceptType: 'fact',
    article: 'clinicalSiteMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Clinical myiasis', teachingPages: '42 and 45', assessmentPage: 10, answerPage: 10,
    teachingResourceId: myiasisResourceId, teachingTitle: 'Flies and Myiasis',
    stem: 'What is the larva revealed by urine examination of a myiasis patient who frequently uses public toilets?', key: 'D', options: ['Sarcophaga species', 'Dermatobia species', 'Chrysomia species', 'Fannia species'],
    claim: 'Fannia is associated with urogenital myiasis.',
    support: 'The clinical-site classification lists Fannia under urogenital myiasis.',
    objective: 'Identify Fannia from the urine-examination and public-toilet urogenital-myiasis context.',
    pitfalls: 'The governed site association selects Fannia rather than Sarcophaga, Dermatobia or Chrysomia.',
    rejected: ['concept_25a7c6c1a0f6c476622cf674 — describes urogenital-myiasis manifestations; not the Fannia association.'],
  },
  {
    q: 29, conceptId: 'CON-INF-1B48D20E6F3C95', canonicalKey: 'parasitology.myiasis.dermatobia-phoresis',
    label: 'Dermatobia uses another insect to carry its eggs', aliases: ['Dermatobia phoresis', 'Human botfly egg carriage'], conceptType: 'mechanism',
    article: 'cutaneousMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Cutaneous myiasis', teachingPages: '37–38', assessmentPage: 10, answerPage: 10,
    teachingResourceId: myiasisResourceId, teachingTitle: 'Flies and Myiasis',
    stem: 'Which fly is known to deposit its eggs on another insect, which then carries them to the host?', key: 'B', options: ['Calliphora', 'Dermatobia hominis', 'Sarcophaga', 'Glossina'],
    claim: 'Dermatobia hominis uses another insect to carry and deliver its eggs.',
    support: 'Dermatobia uses phoresis: eggs are attached to another insect, which carries them to the host.',
    objective: 'Identify Dermatobia hominis from its use of another insect to carry its eggs to the host.',
    pitfalls: 'The governed phoretic carriage mechanism belongs to Dermatobia hominis, not Calliphora, Sarcophaga or Glossina.', rejected: [],
  },
  {
    q: 31, conceptId: 'CON-INF-CD8A632D0E68EF', canonicalKey: 'parasitology.myiasis.mdt-greenbottle-flies',
    label: 'Greenbottle fly larvae are used in maggot therapy', aliases: ['Greenbottle maggot therapy', 'Maggot debridement fly'], conceptType: 'management',
    article: 'myiasisTherapyPrevention', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Maggot debridement therapy', teachingPage: 41, assessmentPage: 10, answerPage: 10,
    teachingResourceId: myiasisResourceId, teachingTitle: 'Flies and Myiasis',
    stem: 'The larvae of which fly are used in maggot therapy?', key: 'A', options: ['Greenbottle fly', 'Tsetse fly', 'Stable fly', 'Black fly'],
    claim: 'Greenbottle fly larvae are usually used in maggot debridement therapy.',
    support: 'Usually Greenbottle flies are used.',
    objective: 'Identify greenbottle fly larvae as the larvae used in maggot therapy.',
    pitfalls: 'The governed teaching identifies greenbottle flies rather than tsetse, stable or black flies for maggot therapy.', rejected: [],
  },
  {
    q: 38, conceptId: 'CON-INF-476CFE4CB1DE34', canonicalKey: 'parasitology.mosquitoes.culex-filariasis-cyclodevelopmental',
    label: 'Culex transmits Wuchereria bancrofti cyclodevelopmentally', aliases: ['Culex filariasis transmission type', 'Wuchereria cyclodevelopmental transmission'], conceptType: 'mechanism',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Culex-borne filariasis', teachingPages: '27–28', assessmentPage: 11, answerPage: 11,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Which fly primarily transmits Wuchereria bancrofti?', key: 'B', options: ['Anopheles', 'Culex', 'Glossina', 'Musca'],
    claim: 'Culex is the mosquito vector of Wuchereria bancrofti in the governed local curriculum.',
    support: 'The official Culex table identifies Wuchereria bancrofti among diseases transmitted by female Culex.',
    objective: 'Identify Culex as the offered vector of Wuchereria bancrofti.',
    pitfalls: 'The governed vector association selects Culex rather than Anopheles, Glossina or Musca.', rejected: ['concept_a0aff0c30fa4c2646a6e9ddf — broader raw Culex/Wuchereria vector association is retained as rejected merge provenance.'],
  },
  {
    q: 41, conceptId: 'CON-INF-3D4CC9A1238C61', canonicalKey: 'parasitology.mosquitoes.culex-annoying-hum',
    label: 'Culex produces an annoying hum in flight', aliases: ['Culex flight hum', 'Mosquito acoustic behaviour'], conceptType: 'behaviour',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Which mosquito species has a silent approach?', key: 'C', options: ['Aedes', 'Culex', 'Anopheles', 'Mansonia'],
    claim: 'Anopheles has a silent approach, whereas Culex produces an annoying hum.',
    support: 'Culex has an annoying hum while Anopheles has a silent approach.',
    objective: 'Identify Anopheles from its silent approach.',
    pitfalls: 'The governed contrast assigns the annoying hum to Culex and the silent approach to Anopheles.', rejected: [],
  },
  {
    q: 42, conceptId: 'CON-INF-2D0A5960736100', canonicalKey: 'parasitology.mosquitoes.male-nectar-feeding',
    label: 'Male mosquitoes feed on plant juice and nectar', aliases: ['Male mosquito nectar feeding', 'Vegetarian male mosquitoes'], conceptType: 'behaviour',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito feeding', teachingPage: 6, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the feeding habit of male mosquitoes?', key: 'C', options: ['Blood feeding', 'Sucking human sweat', 'Nectar feeding', 'Feeding on fungi'],
    claim: 'Male mosquitoes suck plant juice and feed on nectar.',
    support: 'Male mosquito mouthparts are adapted for sucking plant juice; males are nectar feeders or vegetarian.',
    objective: 'Identify nectar feeding as the feeding habit of male mosquitoes.',
    pitfalls: 'The governed male feeding habit is plant juice or nectar, not blood, sweat or fungi.', rejected: [],
  },
  {
    q: 43, conceptId: 'CON-INF-137835388110E5', canonicalKey: 'parasitology.arthropods.ticks-arachnida-not-insecta',
    label: 'Ticks belong to Arachnida rather than Insecta', aliases: ['Tick arthropod class', 'Arachnida ticks'], conceptType: 'classification',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Arthropod classification', teachingPage: 3, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Which of the following does NOT belong to Class Insecta?', key: 'C', options: ['Mosquitoes', 'Fleas', 'Ticks', 'Lice'],
    claim: 'Ticks belong to class Arachnida, while mosquitoes, fleas and lice belong to class Insecta.',
    support: 'The official classification slide places mosquitoes, fleas and lice in Insecta and ticks in Arachnida.',
    objective: 'Distinguish ticks as Arachnida from the offered insects.',
    pitfalls: 'Mosquitoes, fleas and lice are insects in the governed classification; ticks are arachnids.', rejected: [],
  },
  {
    q: 44, conceptId: 'CON-INF-84CF3B2FCF546F', canonicalKey: 'parasitology.mosquitoes.anopheles-larva-surface-feeding',
    label: 'Anopheles larvae are the most surface-feeding mosquito larvae', aliases: ['Anopheles surface feeder', 'Mosquito larval siphon comparison'], conceptType: 'behaviour',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito larvae', teachingPage: 11, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What distinguishes Anopheles larvae from other mosquito larvae?', key: 'A', options: ['Lack of siphon (respiratory tube)', 'Presence of long proboscis', 'Larvae do not feed', 'Larvae are red in color'],
    claim: 'Anopheles larvae lack a siphon and therefore remain closer to the water surface.',
    support: 'Anopheles larvae are more surface feeders due to lack of siphon (respiratory tube).',
    objective: 'Identify lack of a siphon as the distinguishing offered Anopheles larval feature.',
    pitfalls: 'Anopheles larvae feed; the governed distinction is lack of a siphon, not proboscis length or colour.', rejected: [],
  },
  {
    q: 45, conceptId: 'CON-INF-EBC6A5A33FF6AA', canonicalKey: 'parasitology.mosquitoes.stagnant-water-life-cycle',
    label: 'The mosquito life cycle is completed in stagnant water', aliases: ['Mosquito stagnant-water life cycle', 'Mosquito breeding water'], conceptType: 'life cycle',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito life cycle', teachingPage: 8, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'The mosquito life cycle is completed in:', key: 'A', options: ['Stagnant water', 'Fast-moving water', 'Soil', 'Dry tree bark'],
    claim: 'The mosquito life cycle is completed in stagnant water.',
    support: 'Life cycle of mosquitoes: completed in stagnant water.',
    objective: 'Identify stagnant water as the governed mosquito life-cycle habitat.',
    pitfalls: 'The governed slide names stagnant water rather than fast-moving water, soil or dry bark.', rejected: [],
  },
  {
    q: 46, conceptId: 'CON-INF-17EA50AF2F923C', canonicalKey: 'parasitology.mosquitoes.pupa-nonfeeding',
    label: 'The mosquito pupa is non-feeding', aliases: ['Non-feeding mosquito stage', 'Mosquito pupa feeding status'], conceptType: 'life cycle',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito life cycle', teachingPage: 11, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Which of the following is the non-feeding stage of mosquitoes?', key: 'B', options: ['Larva', 'Pupa', 'Egg', 'Adult'],
    claim: 'The mosquito pupa is the non-feeding stage, while the larva feeds.',
    support: 'Larvae are feeding stage while pupae are non-feeding.',
    objective: 'Identify the mosquito pupa as the non-feeding stage.',
    pitfalls: 'The governed comparison states that larvae feed and pupae do not.', rejected: [],
  },
  {
    q: 47, conceptId: 'CON-INF-1C69CD2C41026C', canonicalKey: 'parasitology.mosquitoes.female-lifespan-six-eight-weeks',
    label: 'Female mosquitoes usually live six to eight weeks', aliases: ['Female mosquito lifespan', 'Mosquito six-to-eight-week lifespan'], conceptType: 'bionomics',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 12, answerPage: 12,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'The lifespan of a female mosquito is usually:', key: 'C', options: ['1-2 days', '1-2 weeks', '6-8 weeks', '6 months'],
    claim: 'The usual female mosquito lifespan is six to eight weeks and may increase in winter.',
    support: 'Life span of 6-8 weeks increased in winter.',
    objective: 'Recall the governed six-to-eight-week female mosquito lifespan.',
    pitfalls: 'The official bionomics slide gives six to eight weeks, not days, one to two weeks or six months.', rejected: [],
  },
  {
    q: 48, conceptId: 'CON-INF-D40D6E6C25F7C4', canonicalKey: 'parasitology.mosquitoes.blood-meal-stimulates-ovulation',
    label: 'A blood meal stimulates ovulation in female mosquitoes', aliases: ['Mosquito ovulation trigger', 'Blood meal and egg laying'], conceptType: 'physiology',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito bionomics', teachingPage: 10, assessmentPage: 13, answerPage: 13,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Female mosquitoes require a blood meal for:', key: 'C', options: ['Energy', 'Digestion', 'Egg production', 'Body growth'],
    claim: 'A blood meal stimulates hormone production necessary for ovulation and egg laying in female mosquitoes.',
    support: 'After a blood meal the female lays eggs because the meal stimulates a hormone necessary for ovulation.',
    objective: 'Link the female mosquito blood meal to egg production.',
    pitfalls: 'The governed purpose is ovulation and egg laying rather than digestion or body growth.', rejected: [],
  },
  {
    q: 49, conceptId: 'CON-INF-E7CE29355ADA44', canonicalKey: 'parasitology.mosquitoes.flight-range-two-kilometres',
    label: 'Mosquitoes normally fly about two kilometres', aliases: ['Mosquito flight range', 'Two-kilometre mosquito range'], conceptType: 'bionomics',
    article: 'mosquitoBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito bionomics', teachingPage: 9, assessmentPage: 13, answerPage: 13,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the flight range of mosquitoes under normal conditions?', key: 'B', options: ['500 meters', '2 kilometers', '10 kilometers', '50 kilometers'],
    claim: 'The normal mosquito flight range is about two kilometres and may increase to ten kilometres with wind.',
    support: 'Flight range is 2 kilometers increased to 10 Km by the wind.',
    objective: 'Identify two kilometres as the governed normal mosquito flight range.',
    pitfalls: 'Ten kilometres is the wind-assisted range, not the normal range.', rejected: [],
  },
  {
    q: 54, conceptId: 'CON-INF-DF00AF29E78092', canonicalKey: 'parasitology.mosquitoes.pharoensis-chief-egypt-vector',
    label: 'Anopheles pharoensis is the chief malaria vector in Egypt', aliases: ['Egypt chief malaria vector', 'Anopheles pharoensis malaria'], conceptType: 'epidemiology',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Malaria vectors', teachingPage: 17, assessmentPage: 13, answerPage: 13,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'The chief malaria vector in Egypt is:', key: 'A', options: ['Anopheles pharoensis', 'Aedes aegypti', 'Anopheles gambiae', 'Culex pipiens'],
    claim: 'Anopheles pharoensis is the chief malaria vector in Egypt.',
    support: 'Anopheles pharoensis: chief malaria vector; geographical distribution: Nile valley.',
    objective: 'Identify Anopheles pharoensis as the chief malaria vector in Egypt.',
    pitfalls: 'The deck states that Anopheles gambiae is not found in Egypt and does not assign the chief-vector role to Aedes or Culex.', rejected: [],
  },
  {
    q: 57, conceptId: 'CON-INF-43040B7549A6C2', canonicalKey: 'parasitology.filariasis.elephantiasis-limb-swelling',
    label: 'Elephantiasis causes marked swelling of affected limbs', aliases: ['Elephantiasis limb swelling', 'Lymphatic filariasis swelling'], conceptType: 'clinical association',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Culex-borne filariasis', teachingPage: 27, assessmentPage: 14, answerPage: 14,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the main symptom of elephantiasis?', key: 'C', options: ['Skin rash', 'Liver failure', 'Swelling of limbs', 'Jaundice'],
    claim: 'Elephantiasis from lymphatic filariasis produces marked swelling of affected limbs.',
    support: 'Untreated Wuchereria infection may be complicated by elephantiasis of the lower limb and external genitalia.',
    objective: 'Identify limb swelling as the characteristic offered manifestation of elephantiasis.',
    pitfalls: 'The governed complication is lymphatic swelling rather than liver failure, jaundice or a simple rash.', rejected: [],
  },
  {
    q: 58, conceptId: 'CON-INF-C78116FCC3B754', canonicalKey: 'parasitology.mosquitoes.zika-congenital-microcephaly',
    label: 'Maternal Zika infection is associated with congenital microcephaly', aliases: ['Zika congenital microcephaly', 'Mosquito-borne microcephaly association'], conceptType: 'clinical association',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Aedes-borne disease', teachingPages: '19, 24', assessmentPage: 14, answerPage: 14,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Zika virus can cause:', key: 'B', options: ['Yellow fever', 'Microcephaly in newborns', 'Elephantiasis', 'Anemia'],
    claim: 'Zika virus infection during pregnancy is associated with congenital microcephaly.',
    support: 'The official Aedes disease table associates maternal Zika infection with congenital microcephaly.',
    objective: 'Identify microcephaly in newborns as the offered Zika-associated condition.',
    pitfalls: 'The governed association is congenital microcephaly, not yellow fever, elephantiasis or anaemia.', rejected: ['concept_2f42dd8709456d0836771eb0 — broader raw arboviral microcephaly wording remains rejected merge provenance.'],
  },
  {
    q: 59, conceptId: 'CON-INF-F08BDC422993D8', canonicalKey: 'parasitology.mosquitoes.west-nile-propagative',
    label: 'West Nile virus is transmitted propagatively by Culex', aliases: ['West Nile propagative transmission', 'Culex West Nile transmission type'], conceptType: 'mechanism',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Culex-borne arboviruses', teachingPage: 27, assessmentPage: 14, answerPage: 14,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the mode of transmission for West Nile virus?', key: 'C', options: ['Cyclo-developmental', 'Cyclo-propagative', 'Propagative', 'Mechanical'],
    claim: 'West Nile virus is transmitted propagatively by Culex mosquitoes.',
    support: 'The official Culex table labels West Nile viral encephalitis transmission as propagative.',
    objective: 'Identify propagative transmission for West Nile virus in Culex.',
    pitfalls: 'The governed table labels West Nile transmission propagative rather than cyclodevelopmental, cyclopropagative or mechanical.', rejected: [],
  },
  {
    q: 60, conceptId: 'CON-INF-863856AB7138F8', canonicalKey: 'parasitology.mosquitoes.control-gambusia-biological',
    label: 'Gambusia fish provide biological mosquito control', aliases: ['Gambusia mosquito control', 'Larvivorous fish control'], conceptType: 'intervention',
    article: 'mosquitoControl', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Biological mosquito control', teachingPage: 38, assessmentPage: 14, answerPage: 14,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Which method is an example of biological control of mosquitoes?', key: 'B', options: ['DDT spraying', 'Using Gambusia fish', 'Installing window screens', 'Burning mosquito coils'],
    claim: 'Using Gambusia fish is a biological mosquito-control method.',
    support: 'The official control slide lists Gambusia affinis among natural enemies used for biological control.',
    objective: 'Identify use of Gambusia fish as biological mosquito control.',
    pitfalls: 'DDT is chemical control, window screens are mechanical control and mosquito coils are repellents.', rejected: [],
  },
  {
    q: 62, conceptId: 'CON-INF-DE8BA9EC7D8688', canonicalKey: 'parasitology.mosquitoes.paris-green-larvicidal-only',
    label: 'Paris green is larvicidal and does not affect non-feeding pupae', aliases: ['Paris green larvicide', 'Stomach-poison mosquito larvicide'], conceptType: 'intervention',
    article: 'mosquitoControl', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Chemical mosquito control', teachingPage: 39, assessmentPage: 14, answerPage: 14,
    teachingResourceId: mosquitoResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'Paris green insecticide mainly affects:', key: 'C', options: ['Mosquito pupae', 'Adult mosquitoes', 'Mosquito larvae', 'Mosquito eggs'],
    claim: 'Paris green is a stomach poison that mainly affects feeding mosquito larvae and does not affect non-feeding pupae.',
    support: 'The official deck states that Paris green is larvicidal and that pupae are not affected because they do not feed.',
    objective: 'Identify mosquito larvae as the principal stage affected by Paris green.',
    pitfalls: 'Paris green is not presented as an adulticide or ovicide, and non-feeding pupae are not affected.', rejected: ['concept_93621f76281954bdf8c77e72 — broader raw control list does not preserve the larvicidal and pupa-exclusion identity.'],
  },
  {
    q: 67, conceptId: 'CON-INF-04788D75905E81', canonicalKey: 'parasitology.sandfly.name-sandy-yellow',
    label: 'Sandflies are named for their sandy yellow colour', aliases: ['Sandfly name', 'Sandy yellow sandfly'], conceptType: 'morphology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly morphology', teachingPage: 2, assessmentPage: 15, answerPage: 15,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'Why are sandflies called "sandflies"?', key: 'A', options: ['Due to their sandy yellow color', 'Because they live in desert areas', 'Since they lay eggs in the sand', 'Due to their ability to jump in sand'],
    claim: 'Sandflies are called sandflies because of their sandy yellow colour.', support: 'The official deck directly describes the name Sand Fly as arising from sandy yellow colour.',
    objective: 'Identify sandy yellow colour as the basis of the sandfly name.', pitfalls: 'The governed naming feature is colour, not desert habitat, egg-laying substrate or hopping in sand.', rejected: [],
  },
  {
    q: 68, conceptId: 'CON-INF-51472DA1BC2690', canonicalKey: 'parasitology.sandfly.genera-phlebotomus-lutzomyia',
    label: 'Phlebotomus and Lutzomyia are sandfly genera', aliases: ['Sandfly genera', 'Phlebotomus and Lutzomyia'], conceptType: 'classification',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly taxonomy', teachingPage: 4, assessmentPage: 15, answerPage: 15,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the scientific name for sandflies in the Old World?', key: 'D', options: ['Aedes', 'Anopheles', 'Lutzomyia', 'Phlebotomus'],
    claim: 'Old World sandflies belong to Phlebotomus species.', support: 'The official distribution slide lists Phlebotomus species in the Old World and Lutzomyia species in the New World.',
    objective: 'Identify Phlebotomus as the Old World sandfly genus.', pitfalls: 'Lutzomyia is the New World sandfly genus, while Aedes and Anopheles are mosquito genera.', rejected: [],
  },
  {
    q: 69, conceptId: 'CON-INF-51472DA1BC2690', canonicalKey: 'parasitology.sandfly.genera-phlebotomus-lutzomyia',
    label: 'Phlebotomus and Lutzomyia are sandfly genera', aliases: ['Sandfly genera', 'Phlebotomus and Lutzomyia'], conceptType: 'classification',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly taxonomy', teachingPage: 4, assessmentPage: 15, answerPage: 15,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the scientific name for sandflies in the New World?', key: 'A', options: ['Lutzomyia', 'Culex', 'Anopheles', 'Phlebotomus'],
    claim: 'New World sandflies belong to Lutzomyia species.', support: 'The official distribution slide lists Lutzomyia species in the New World and Phlebotomus species in the Old World.',
    objective: 'Identify Lutzomyia as the New World sandfly genus.', pitfalls: 'Phlebotomus is the Old World sandfly genus, while Culex and Anopheles are mosquito genera.', rejected: [],
  },
  {
    q: 70, conceptId: 'CON-INF-999163730B9587', canonicalKey: 'parasitology.sandfly.temperature-above-15-6-celsius',
    label: 'Sandflies are distributed where temperatures exceed 15.6°C', aliases: ['Sandfly temperature threshold', 'Sandfly distribution above 15.6°C'], conceptType: 'ecology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly ecology', teachingPage: 7, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'In which temperature range do sandflies thrive?', key: 'B', options: ['Below 10°C', 'Above 15.6°C', '5°C - 20°C', 'Any temperature range'],
    claim: 'Sandfly distribution is limited to areas with temperatures above 15.6°C.', support: 'The official bionomics slide states that sandfly distribution is limited to areas with temperatures above 15.6°C.',
    objective: 'Recall the governed temperature threshold for sandfly distribution.', pitfalls: 'The deck does not support below 10°C, a 5–20°C range or unrestricted temperatures.', rejected: [],
  },
  {
    q: 71, conceptId: 'CON-INF-D794E6CF4268C2', canonicalKey: 'parasitology.sandfly.daytime-hiding-burrows-cracks',
    label: 'Adult sandflies hide in burrows and building cracks by day', aliases: ['Sandfly daytime hiding places', 'Burrow and crack resting sites'], conceptType: 'behaviour',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'Where do adult sandflies hide during the daytime?', key: 'C', options: ['In water bodies', 'In tree canopies', 'In rodent burrows, cracks, and crevices', 'On human skin'],
    claim: 'Adult sandflies hide in rodent burrows and in cracks and crevices of buildings during daytime.', support: 'The official bionomics slide lists rodent burrows and building cracks and crevices as daytime hiding places.',
    objective: 'Identify burrows, cracks and crevices as adult sandfly daytime refuges.', pitfalls: 'Water, tree canopies and human skin are not the governed daytime hiding sites.', rejected: [],
  },
  {
    q: 72, conceptId: 'CON-INF-F4702893869E6F', canonicalKey: 'parasitology.sandfly.complete-metamorphosis-30-days',
    label: 'Sandflies complete metamorphosis in about thirty days', aliases: ['Sandfly metamorphosis', 'Thirty-day sandfly development'], conceptType: 'life cycle',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly life cycle', teachingPage: 6, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What type of metamorphosis do sandflies undergo?', key: 'A', options: ['Complete metamorphosis', 'Incomplete metamorphosis', 'Mixed metamorphosis', 'No metamorphosis'],
    claim: 'Sandflies undergo complete metamorphosis.', support: 'The official development slide directly states complete metamorphosis.',
    objective: 'Identify complete metamorphosis as sandfly development.', pitfalls: 'The governed deck does not describe incomplete, mixed or absent metamorphosis.', rejected: [],
  },
  {
    q: 74, conceptId: 'CON-INF-509BF395C5EBF9', canonicalKey: 'parasitology.sandfly.weak-hopping-flight',
    label: 'Sandflies are weak fliers with hopping movement', aliases: ['Sandfly movement', 'Weak hopping flight'], conceptType: 'behaviour',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'How do sandflies move while flying?', key: 'C', options: ['Strong fliers like mosquitoes', 'Hover in one place', 'Weak fliers with a hopping movement', 'Glide in a straight line'],
    claim: 'Sandflies are weak fliers with a tendency to hop.', support: 'The official bionomics slide directly describes weak flight and a tendency to hop.',
    objective: 'Identify weak hopping flight as characteristic sandfly movement.', pitfalls: 'The deck does not describe strong flight, hovering or straight-line gliding.', rejected: [],
  },
  {
    q: 75, conceptId: 'CON-INF-93E9B181184A6B', canonicalKey: 'parasitology.sandfly.female-blood-feeding',
    label: 'Female sandflies are the blood-sucking sex', aliases: ['Female sandfly blood feeding', 'Sandfly sex-specific blood feeding'], conceptType: 'behaviour',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly feeding', teachingPage: 8, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the main blood-feeding behavior of sandflies?', key: 'C', options: ['Both males and females suck blood', 'Only males suck blood', 'Only females suck blood', 'Neither suck blood'],
    claim: 'As a rule, female sandflies are the blood-sucking sex.', support: 'The official bionomics slide states that adults feed on mammals and, as a rule, females are the blood-sucking sex.',
    objective: 'Identify female sandflies as the blood-sucking sex.', pitfalls: 'The governed statement does not assign blood feeding to males or to neither sex.', rejected: [],
  },
  {
    q: 76, conceptId: 'CON-INF-F4101FB9DECB61', canonicalKey: 'parasitology.sandfly.weak-flight-localized-diseases',
    label: 'Weak sandfly flight localises Phlebotomus-borne diseases', aliases: ['Localized sandfly-borne disease', 'Weak flight limits disease distribution'], conceptType: 'epidemiology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly bionomics', teachingPage: 8, assessmentPage: 16, answerPage: 16,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is a common characteristic of Phlebotomus-borne diseases?', key: 'B', options: ['They have a worldwide distribution', 'They are often localized due to weak flying ability', 'They are spread through contaminated food', 'They are only found in urban areas'],
    claim: 'Phlebotomus-borne diseases tend to be localized because sandflies are weak fliers.', support: 'The official bionomics slide links weak hopping flight with the rather limited, localized nature of Phlebotomus-borne diseases.',
    objective: 'Connect weak sandfly flight with localized Phlebotomus-borne disease distribution.', pitfalls: 'The governed explanation is not contaminated food, urban restriction or universal worldwide distribution.', rejected: [],
  },
  {
    q: 80, conceptId: 'CON-INF-F58AE2DFC9E4A1', canonicalKey: 'parasitology.leishmaniasis.visceral-hepatosplenomegaly',
    label: 'Visceral leishmaniasis causes hepatosplenomegaly', aliases: ['Visceral leishmaniasis organ enlargement', 'Kala-azar hepatosplenomegaly'], conceptType: 'clinical association',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Visceral leishmaniasis', teachingPage: 22, assessmentPage: 17, answerPage: 17,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the main symptom of visceral leishmaniasis?', key: 'B', options: ['Skin ulcers', 'Hepatosplenomegaly', 'Chronic diarrhea', 'Paralysis'],
    claim: 'Visceral leishmaniasis is associated with hepatosplenomegaly.', support: 'The official visceral-leishmaniasis slide directly labels hepatosplenomegaly due to Leishmania donovani.',
    objective: 'Identify hepatosplenomegaly as the offered visceral-leishmaniasis manifestation.', pitfalls: 'Skin ulcers belong to cutaneous disease, while chronic diarrhoea and paralysis are not the governed manifestation.', rejected: [],
  },
  {
    q: 82, conceptId: 'CON-INF-F538E763E1260E', canonicalKey: 'parasitology.sandfly.disease-profile',
    label: 'Sandflies transmit leishmaniasis, Oroya fever and viral sandfly fever', aliases: ['Sandfly-transmitted diseases', 'Sandfly fever virus'], conceptType: 'clinical association',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly fever', teachingPage: 26, assessmentPage: 17, answerPage: 17,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the causative agent of Sandfly fever?', key: 'B', options: ['Bacteria', 'Virus', 'Protozoa', 'Fungi'],
    claim: 'Sandfly fever is caused by a virus.', support: 'The official sandfly-fever slide directly states that the causative organism is a virus.',
    objective: 'Identify a virus as the causative agent of sandfly fever.', pitfalls: 'Bacteria, protozoa and fungi are not the governed causative-agent class.', rejected: [],
  },
  {
    q: 83, conceptId: 'CON-INF-F538E763E1260E', canonicalKey: 'parasitology.sandfly.disease-profile',
    label: 'Sandflies transmit leishmaniasis, Oroya fever and viral sandfly fever', aliases: ['Sandfly-transmitted diseases', 'Sandfly fever virus'], conceptType: 'mechanism',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly fever', teachingPage: 26, assessmentPage: 17, answerPage: 17,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the mode of transmission of Sandfly fever?', key: 'C', options: ['Mechanical transmission', 'Cyclopropagative transmission', 'Propagative transmission', 'Cyclodevelopmental transmission'],
    claim: 'Sandfly fever is transmitted propagatively by sandflies.', support: 'The official sandfly-fever slide states that transmission by the bite of the sandfly is propagative.',
    objective: 'Identify propagative transmission as the governed sandfly-fever mode.', pitfalls: 'The deck distinguishes this from mechanical, cyclopropagative and cyclodevelopmental transmission.', rejected: [],
  },
  {
    q: 84, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile',
    label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'clinical association',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Oroya fever', teachingPage: 28, assessmentPage: 18, answerPage: 18,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'Which disease is caused by Bartonella bacilliformis?', key: 'C', options: ['Malaria', 'Dengue fever', 'Oroya fever', 'Leishmaniasis'],
    claim: 'Bartonella bacilliformis causes Oroya fever.', support: 'The official Oroya-fever slide directly names Bartonella bacilliformis as the causative bacterium.',
    objective: 'Identify Oroya fever as the disease caused by Bartonella bacilliformis.', pitfalls: 'Malaria, dengue and leishmaniasis are not caused by Bartonella bacilliformis.', rejected: [],
  },
  {
    q: 85, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile',
    label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'mechanism',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Oroya fever', teachingPage: 28, assessmentPage: 18, answerPage: 18,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the type of transmission for Bartonella bacilliformis in sandflies?', key: 'A', options: ['Propagative', 'Cyclodevelopmental', 'Mechanical', 'None of the above'],
    claim: 'Bartonella bacilliformis is transmitted propagatively inside sandflies.', support: 'The official Oroya-fever slide directly states that the type of transmission inside the sandfly is propagative.',
    objective: 'Identify propagative transmission for Bartonella bacilliformis in sandflies.', pitfalls: 'The governed deck does not label this cyclodevelopmental or mechanical.', rejected: [],
  },
  {
    q: 87, conceptId: 'CON-INF-C6B9B514C3AC20', canonicalKey: 'parasitology.sandfly.control-not-stagnant-water',
    label: 'Sandfly control does not rely on draining stagnant water', aliases: ['Sandfly habitat control', 'Non-aquatic sandfly breeding'], conceptType: 'prevention',
    article: 'sandflyControl', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly control', teachingPages: '9, 32', assessmentPage: 18, answerPage: 18,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is a key strategy in sandfly control?', key: 'B', options: ['Destroying stagnant water sources', 'Filling cracks and crevices', 'Using antibiotics regularly', 'Planting more trees'],
    claim: 'Filling cracks and crevices is a sandfly-control strategy.', support: 'The official control slide recommends plastering wall cracks and filling holes; sandflies do not breed in water.',
    objective: 'Identify filling cracks and crevices as the offered sandfly-control strategy.', pitfalls: 'The governed strategy is not antibiotics, tree planting or mosquito-style stagnant-water control.', rejected: [],
  },
  {
    q: 88, conceptId: 'CON-INF-CC1A40F9CF6129', canonicalKey: 'parasitology.sandfly.control-ddt',
    label: 'DDT is used as a residual insecticide against sandflies', aliases: ['DDT sandfly control', 'Residual insecticide for sandflies'], conceptType: 'intervention',
    article: 'sandflyControl', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly control', teachingPage: 32, assessmentPage: 18, answerPage: 18,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'Which of the following insecticides is effective against sandflies?', key: 'A', options: ['DDT', 'Penicillin', 'Amoxicillin', 'Chloroquine'],
    claim: 'DDT is listed as a potent residual insecticide for sandfly control.', support: 'The official integrated-control slide recommends spraying a potent residual insecticide and names DDT.',
    objective: 'Identify DDT as the offered sandfly insecticide.', pitfalls: 'Penicillin and amoxicillin are antibiotics, while chloroquine is not the sandfly insecticide listed in the governed slide.', rejected: [],
  },
  {
    q: 89, conceptId: 'CON-INF-D5B09C8CE384D6', canonicalKey: 'parasitology.sandfly.narrow-mesh-net-prevention',
    label: 'Narrow-mesh nets help prevent sandfly bites', aliases: ['Sandfly bed-net prevention', 'Narrow-mesh mosquito nets'], conceptType: 'prevention',
    article: 'sandflyControl', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly bite prevention', teachingPage: 32, assessmentPage: 18, answerPage: 18,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is an effective preventive measure against sandfly bites?', key: 'A', options: ['Sleeping under mosquito nets with fine mesh', 'Wearing bright-colored clothing', 'Avoiding drinking tap water', 'Eating vitamin-rich food'],
    claim: 'Sleeping under mosquito nets with fine or narrow mesh helps prevent sandfly bites.', support: 'The official integrated-control slide recommends mosquito nets with narrow meshes.',
    objective: 'Identify fine-mesh bed nets as an effective sandfly-bite prevention measure.', pitfalls: 'Bright clothing, tap-water avoidance and vitamin intake are not the governed bite-prevention measures.', rejected: [],
  },
  {
    q: 91, conceptId: 'CON-INF-4FA4163EEF10FF', canonicalKey: 'parasitology.sandfly.breeding-humid-cracks-crevices',
    label: 'Sandflies breed in humid cracks and crevices', aliases: ['Sandfly breeding sites', 'Humid crack sandfly habitat'], conceptType: 'ecology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly breeding habitat', teachingPage: 9, assessmentPage: 19, answerPage: 19,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the main breeding site of sandflies?', key: 'B', options: ['Open water', 'Humid cracks and crevices', 'Animal waste', 'Stagnant pools'],
    claim: 'Sandfly breeding habitat includes humid cracks and crevices rather than open water.', support: 'The official breeding-site slide identifies humid cracks and crevices of buildings and states that sandflies are not aquatic breeders like mosquitoes.',
    objective: 'Identify humid cracks and crevices as the offered sandfly breeding habitat.', pitfalls: 'Open water and stagnant pools are mosquito-style aquatic habitats, and animal waste is not the governed answer.', rejected: [],
  },
  {
    q: 92, conceptId: 'CON-INF-F25D45A3C5F542', canonicalKey: 'parasitology.sandfly.bite-pathogen-inoculation',
    label: 'Sandflies transmit pathogens through infective bites', aliases: ['Sandfly bite transmission', 'Pathogen inoculation by sandflies'], conceptType: 'mechanism',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly-borne transmission', teachingPages: '10, 15, 26, 28', assessmentPage: 19, answerPage: 19,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'How do sandflies transmit diseases?', key: 'B', options: ['Through contaminated food', 'By biting humans and injecting pathogens', 'By direct contact', 'By inhalation'],
    claim: 'Sandflies transmit governed protozoal, bacterial and viral pathogens through infective bites.', support: 'The official deck describes Leishmania deposition through an infected sandfly bite and injection of sandfly-fever virus or Bartonella with saliva.',
    objective: 'Identify infective biting and pathogen inoculation as the sandfly transmission route.', pitfalls: 'The governed diseases are not transmitted through food, direct contact or inhalation.', rejected: [],
  },
  {
    q: 93, conceptId: 'CON-INF-A460148960888B', canonicalKey: 'parasitology.sandfly.phlebotomus-desert-savanna',
    label: 'Old World Phlebotomus inhabits deserts and savannas', aliases: ['Phlebotomus habitat', 'Old World sandfly ecology'], conceptType: 'ecology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly ecology', teachingPage: 7, assessmentPage: 19, answerPage: 19,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What type of environment does Phlebotomus prefer?', key: 'B', options: ['Forested areas', 'Deserts and savannas', 'Frozen tundras', 'Marshlands'],
    claim: 'Old World Phlebotomus species are associated with savanna and desert environments.', support: 'The official habits slide describes Old World Phlebotomus as savanna and desert species with low rainfall.',
    objective: 'Identify deserts and savannas as the offered Phlebotomus environment.', pitfalls: 'The governed Old World habitat is not forest, frozen tundra or marshland.', rejected: [],
  },
  {
    q: 94, conceptId: 'CON-INF-D1A1215A337B4F', canonicalKey: 'parasitology.sandfly.papatasi-egypt',
    label: 'Phlebotomus papatasi is prevalent in Egypt', aliases: ['Egyptian sandfly species', 'Phlebotomus papatasi'], conceptType: 'epidemiology',
    article: 'sandflyBiology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly distribution', teachingPage: 4, assessmentPage: 19, answerPage: 19,
    teachingResourceId: sandflyResourceId, teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'Which species of sandfly is prevalent in Egypt?', key: 'C', options: ['Lutzomyia longipalpis', 'Anopheles pharoensis', 'Phlebotomus papatasii', 'Aedes aegypti'],
    claim: 'Phlebotomus papatasii is the sandfly species identified as prevalent in Egypt.', support: 'The official distribution slide directly identifies Phlebotomus papatasii as prevalent in Egypt.',
    objective: 'Identify Phlebotomus papatasii as the locally prevalent sandfly species.', pitfalls: 'Lutzomyia longipalpis is a New World sandfly, while Anopheles pharoensis and Aedes aegypti are mosquitoes.', rejected: [],
  },
].map((item) => ({
  idPrefix: 'MUCIZE', bankQ: item.q, assessmentResourceId: mucizeAssessmentResourceId,
  bankLabel: 'Mucize Parasitology core', ...item,
}))

introItems.push(...mucizeParasitologyItems)

const mucizeCaseItems = [
  {
    q: 2, bankQ: 2, caseNumber: 4, conceptId: 'CON-INF-326CB7EB4934C6', canonicalKey: 'parasitology.mosquitoes.aedes-zika-vector',
    label: 'Aedes mosquitoes transmit Zika virus', aliases: ['Zika mosquito vector', 'Aedes-borne Zika'], conceptType: 'clinical association',
    article: 'mosquitoDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Aedes-borne disease',
    assessmentPage: 21, answerPage: 21, teachingPages: '19, 24', teachingResourceId: mosquitoResourceId,
    teachingTitle: 'Arthropod Vectors for Disease Transmission — Mosquitoes',
    stem: 'What is the vector responsible for the disease transmission?', key: 'B',
    options: ['Anopheles mosquito', 'Aedes mosquito', 'Culex mosquito', 'Sandfly'],
    claim: 'Aedes mosquitoes transmit Zika virus.',
    support: 'The official Aedes disease table lists Zika virus under female Aedes, and the congenital-microcephaly case slide asks for the vector responsible.',
    objective: 'Identify Aedes mosquito as the vector in the congenital Zika case.',
    pitfalls: 'The governed Zika vector is Aedes, not Anopheles, Culex or sandfly.',
    rejected: ['concept_67e667ad81d088a8265cb35b — raw Aedes identity covers yellow fever and dengue but does not include Zika.'],
  },
  {
    q: 1, bankQ: 1, caseNumber: 6, conceptId: 'CON-INF-F538E763E1260E', canonicalKey: 'parasitology.sandfly.disease-profile',
    label: 'Sandflies transmit leishmaniasis, Oroya fever and viral sandfly fever', aliases: ['Sandfly-transmitted diseases', 'Sandfly fever virus'], conceptType: 'clinical association',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly-transmitted disease',
    assessmentPage: 22, answerPage: 23, teachingPages: '10, 26', teachingResourceId: sandflyResourceId,
    teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the vector?', key: 'A',
    options: ['Sandfly', 'Anopheles mosquito', 'Aedes mosquito', 'Culex mosquito'],
    claim: 'Sandflies transmit viral sandfly fever.',
    support: 'The official disease overview lists viral sandfly fever among diseases transmitted by sandflies, and the dedicated sandfly-fever slide states that the virus is transmitted by the bite of the sandfly.',
    objective: 'Identify sandfly as the vector in the governed sandfly-fever vignette.',
    pitfalls: 'Anopheles, Aedes and Culex are mosquitoes and are not the governed vector for sandfly fever.',
    rejected: [],
  },
  {
    q: 2, bankQ: 2, caseNumber: 7, conceptId: 'CON-INF-482144C092C2DD', canonicalKey: 'parasitology.sandfly.oroya-profile',
    label: 'Oroya fever is propagative Bartonella bacilliformis infection with hemolytic anemia', aliases: ['Oroya fever profile', 'Bartonella sandfly transmission'], conceptType: 'clinical association',
    article: 'sandflyDiseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Oroya fever',
    assessmentPage: 22, answerPage: 23, teachingPage: 28, teachingResourceId: sandflyResourceId,
    teachingTitle: 'Arthropod Vectors for Disease Transmission — Sandflies',
    stem: 'What is the vector?', key: 'A',
    options: ['Sandfly (Lutzomyia)', 'Anopheles mosquito', 'Aedes mosquito', 'Culex mosquito'],
    claim: 'Oroya fever is transmitted by the sandfly Lutzomyia.',
    support: 'The official Oroya-fever slide directly states that the South American disease is transmitted by the sandfly Lutzomyia.',
    objective: 'Identify Sandfly (Lutzomyia) as the vector in the governed Oroya-fever vignette.',
    pitfalls: 'Anopheles, Aedes and Culex are mosquitoes and are not the governed vector for Oroya fever.',
    rejected: [],
  },
].map((item) => ({
  idPrefix: `MUCIZECASE${item.caseNumber}`, assessmentResourceId: mucizeAssessmentResourceId,
  bankLabel: `Mucize case-based learning Case ${item.caseNumber}`, ...item,
}))

introItems.push(...mucizeCaseItems)

const mucizeAdvancedItems = [
  {
    q: 11, bankQ: 11, conceptId: 'CON-INF-1E7B4A9D306FC2', canonicalKey: 'parasitology.arthropods.complete-metamorphosis-holometabolous',
    label: 'Complete metamorphosis is holometabolous', aliases: ['Holometabolous metamorphosis', 'Complete arthropod metamorphosis'], conceptType: 'definition',
    article: 'arthropodMetamorphosis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Metamorphosis',
    assessmentPage: 25, answerPage: 28, teachingPages: '7–8', teachingResourceId: myiasisResourceId,
    teachingTitle: 'Flies and Myiasis',
    stem: 'What is the key difference between complete and incomplete metamorphosis in arthropods?', key: 'A',
    options: ['Complete metamorphosis involves a pupal stage, while incomplete metamorphosis does not', 'Incomplete metamorphosis involves a pupal stage, while complete metamorphosis does not', 'Complete metamorphosis involves only nymph stages, while incomplete metamorphosis involve larvae', 'Incomplete metamorphosis involves only adult stages, while complete metamorphosis involves larvae'],
    claim: 'Complete metamorphosis includes a pupal stage, whereas incomplete metamorphosis has a nymph stage and no pupa.',
    support: 'The official comparison diagram shows egg, larva, pupa and adult for complete metamorphosis, versus egg, nymph and adult for incomplete metamorphosis; the following slide repeats egg → larva → pupa → adult versus egg → nymph → adult.',
    objective: 'Identify the pupal stage as the offered distinction between complete and incomplete arthropod metamorphosis.',
    pitfalls: 'Incomplete metamorphosis proceeds through nymphs without a pupal stage; it is not the pattern with a pupa, and complete metamorphosis is not nymph-only.',
    rejected: [],
  },
  {
    q: 13, bankQ: 13, conceptId: 'CON-INF-6D13C7A920B4EF', canonicalKey: 'parasitology.myiasis.cutaneous-skin-lesions-nodules',
    label: 'Cutaneous myiasis produces lesions or nodules in the skin', aliases: ['Cutaneous-myiasis skin lesions', 'Cutaneous-myiasis nodules'], conceptType: 'clinical feature',
    article: 'cutaneousMyiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Cutaneous myiasis',
    assessmentPage: 25, answerPage: 28, teachingPages: '37, 42', teachingResourceId: myiasisResourceId,
    teachingTitle: 'Flies and Myiasis',
    stem: 'Which of the following is a key feature of cutaneous myiasis?', key: 'B',
    options: ['The larvae invade the gastrointestinal tract', 'The larvae cause lesions or nodules in the skin', 'The larvae are transmitted through contaminated water', 'The larvae are ingested and cause systemic infections'],
    claim: 'Cutaneous myiasis produces lesions or nodules in the skin as fly larvae penetrate and develop in living cutaneous tissue.',
    support: 'The official deck classifies cutaneous myiasis as obligatory myiasis of living tissue and shows Cordylobia larvae penetrating skin to produce swellings or boils and Dermatobia larvae penetrating skin to cause cutaneous myiasis.',
    objective: 'Recognise skin lesions or nodules as the offered clinical feature of cutaneous myiasis.',
    pitfalls: 'The governed presentation is cutaneous tissue involvement, not gastrointestinal invasion, contaminated-water transmission, or ingested larvae causing systemic infection.',
    sourceCandidates: ['concept_3965ff3ac0ffc63c51c97f38'],
    rejected: ['concept_3965ff3ac0ffc63c51c97f38 — raw furuncular-myiasis wording about maggots protruding from boil-like swellings is narrower than this generic cutaneous-myiasis lesion-or-nodule identity and is retained only as lineage.'],
  },
].map((item) => ({
  idPrefix: 'MUCIZEADV', assessmentResourceId: mucizeAssessmentResourceId,
  bankLabel: `Mucize Advanced MCQ Q${item.bankQ}`, ...item,
}))

introItems.push(...mucizeAdvancedItems)

const microArticles = {
  foundations: 'ART-INF-MUST-FHB1022-MICROBIOLOGY-FOUNDATIONS',
  organisation: 'ART-INF-MUST-FHB1022-MICROBIAL-CELL-ORGANISATION',
  colonizationCarriage: 'ART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE',
  virulenceEvasion: 'ART-INF-MUST-FHB1022-VIRULENCE-EVASION',
  cellWallAntibiotics: 'ART-INF-MUST-FHB1022-CELL-WALL-ANTIBIOTICS',
  penicillins: 'ART-INF-MUST-FHB1022-PENICILLIN-CLASSES-USE-SAFETY',
  mycologyFoundations: 'ART-INF-MUST-FHB1022-MYCOLOGY-FOUNDATIONS',
  mycologyDisease: 'ART-INF-MUST-FHB1022-MYCOLOGY-DISEASE-SPORES',
  mycologyDiagnosis: 'ART-INF-MUST-FHB1022-MYCOLOGY-DIAGNOSIS',
  virusSusceptibility: 'ART-INF-MUST-FHB1022-VIRUS-SUSCEPTIBILITY-COMPONENTS',
  viralCarrier: 'ART-INF-MUST-FHB1022-VIRAL-CARRIER-INFECTION',
  staphylococci: 'ART-INF-MUST-FHB1022-STAPHYLOCOCCI-IDENTIFICATION',
  streptococci: 'ART-INF-MUST-FHB1022-STREPTOCOCCI-CLASSIFICATION',
  branchingGramPositive: 'ART-INF-MUST-FHB1022-BRANCHING-GRAM-POSITIVE-BACTERIA',
  cephalosporins: 'ART-INF-MUST-FHB1022-CEPHALOSPORIN-GENERATIONS',
  otherBetaLactams: 'ART-INF-MUST-FHB1022-CARBAPENEM-MONOBACTAM',
  vancomycinClinical: 'ART-INF-MUST-FHB1022-VANCOMYCIN-CLINICAL-PROFILE',
}

const microArticleRelations = {
  foundations: ['organisation'],
  organisation: ['foundations'],
  colonizationCarriage: ['virulenceEvasion'],
  virulenceEvasion: ['colonizationCarriage'],
  cellWallAntibiotics: ['penicillins'],
  penicillins: ['cellWallAntibiotics'],
  mycologyFoundations: ['mycologyDisease', 'mycologyDiagnosis'],
  mycologyDisease: ['mycologyFoundations', 'mycologyDiagnosis'],
  mycologyDiagnosis: ['mycologyFoundations', 'mycologyDisease'],
  virusSusceptibility: ['viralCarrier'],
  viralCarrier: ['virusSusceptibility'],
  staphylococci: ['streptococci'],
  streptococci: ['staphylococci', 'branchingGramPositive'],
  branchingGramPositive: ['streptococci'],
  cephalosporins: ['otherBetaLactams', 'vancomycinClinical'],
  otherBetaLactams: ['cephalosporins', 'vancomycinClinical'],
  vancomycinClinical: ['cephalosporins', 'otherBetaLactams'],
}

const microItems = [
  {
    q: 62, bankQ: 2, conceptId: 'CON-INF-CC62854BEC55D3', canonicalKey: 'microbiology.classification.microorganism-groups-exclude-plants',
    label: 'Major microorganism groups exclude plants', aliases: ['Microorganism groups', 'Plants are not microorganisms'], conceptType: 'classification',
    article: 'foundations', microtopic: 'Scope of microbiology', assessmentPage: 19, teachingPage: 9,
    stem: 'Which of the following is NOT considered a microorganism?', key: 'D', options: ['Bacteria', 'Viruses', 'Protozoa', 'Plants'],
    claim: 'The major microorganism groups include bacteria, fungi, protozoa, helminths and viruses; plants are not in that microorganism list.',
    annotationQuote: 'The five major groups listed in the governed MUST deck are bacteria, fungi, protozoa, helminths and viruses; plants are not in that closed list.',
    support: 'Microorganisms are minute living things, and the five major groups listed are bacteria, fungi, protozoa, helminths and viruses.',
    objective: 'Identify plants as outside the closed list of major microorganism groups in the local curriculum.',
    pitfalls: 'Bacteria, viruses and protozoa are each explicitly included in the governed microorganism list; plants are not.',
    rejected: [],
  },
  {
    q: 63, bankQ: 3, conceptId: 'CON-INF-4D65B20EBBAE83', canonicalKey: 'microbiology.saprophytes.dead-organic-matter',
    label: 'Saprophytes feed on dead organic material', aliases: ['Saprophyte function', 'Decomposition of dead organic matter'], conceptType: 'definition',
    article: 'foundations', microtopic: 'Saprophytes', assessmentPage: 19, teachingPage: 10,
    stem: 'What is the main function of saprophytes?', key: 'B', options: ['Cause diseases in humans', 'Decompose dead organic matter', 'Reproduce inside living cells', 'Produce antibiotics'],
    claim: 'Saprophytes feed on dead animal or plant material and thereby decompose dead organic matter.',
    annotationQuote: 'Saprophytes feed on dead animal or plant material and thereby decompose dead organic matter.',
    support: 'The majority of microorganisms feed on dead animal or plant material, are harmless to humans, and are labelled saprophytes.',
    objective: 'Recognise decomposition of dead organic matter as the function associated with saprophytes.',
    pitfalls: 'Saprophytes are not defined by causing human disease, obligate intracellular replication or antibiotic production.',
    rejected: [],
  },
  {
    q: 64, bankQ: 4, conceptId: 'CON-INF-02A3740FAEFDAD', canonicalKey: 'microbiology.nomenclature.genus-capitalized-species-lowercase',
    label: 'Scientific names capitalize the genus, not the species', aliases: ['Genus capitalization', 'Binomial nomenclature capitalization'], conceptType: 'definition',
    article: 'foundations', microtopic: 'Scientific nomenclature', assessmentPage: '19–20', teachingPage: 11,
    stem: 'In the scientific nomenclature, which part of the name is capitalized?', key: 'B', options: ['Species', 'Genus', 'Family', 'Class'],
    claim: 'In scientific nomenclature the genus is the first name and is capitalized, while the following species name is not capitalized.',
    annotationQuote: 'The genus is the first name and is always capitalized; the species name follows and is not capitalized.',
    support: 'Scientific nomenclature assigns two names: the genus is first and always capitalized, while the species name follows and is not capitalized.',
    objective: 'Identify the genus as the capitalized part of a scientific binomial name.',
    pitfalls: 'The species name follows the genus and is not capitalized; family and class are not the two-name position asked by this item.',
    rejected: [],
  },
  {
    q: 65, bankQ: 5, conceptId: 'CON-INF-98A3DF2E20880C', canonicalKey: 'microbiology.classification.viruses-acellular-bacteria-prokaryotic',
    label: 'Viruses are acellular while bacteria are prokaryotic', aliases: ['Cellular classification of microorganisms', 'Viruses acellular and bacteria prokaryotic'], conceptType: 'classification',
    article: 'organisation', microtopic: 'Cellular classification', assessmentPage: 20, teachingPage: 12,
    stem: 'Viruses are classified as:', key: 'C', options: ['Prokaryotic cells', 'Eukaryotic cells', 'Acellular agents', 'Multicellular organisms'],
    claim: 'Viruses are acellular agents rather than prokaryotic, eukaryotic or multicellular organisms.',
    annotationQuote: 'Viruses are acellular agents and are not true cells.',
    support: 'The types-of-microorganisms chart places viruses under acellular and states that they are not true cells.',
    objective: 'Classify viruses as acellular agents.',
    pitfalls: 'Viruses are not placed under either cellular branch and therefore are not prokaryotic, eukaryotic or multicellular cells.',
    rejected: ['CON-INF-1165F8B9564697 — covers viral genome, antibiotic non-susceptibility and obligate intracellular existence, not the acellular classification tested here.'],
  },
  {
    q: 66, bankQ: 6, conceptId: 'CON-INF-98A3DF2E20880C', canonicalKey: 'microbiology.classification.viruses-acellular-bacteria-prokaryotic',
    label: 'Viruses are acellular while bacteria are prokaryotic', aliases: ['Cellular classification of microorganisms', 'Viruses acellular and bacteria prokaryotic'], conceptType: 'classification',
    article: 'organisation', microtopic: 'Cellular classification', assessmentPage: 20, teachingPage: 12,
    stem: 'Which of the following is a prokaryotic microorganism?', key: 'B', options: ['Fungi', 'Bacteria', 'Protozoa', 'Algae'],
    claim: 'Bacteria are the prokaryotic microorganisms among fungi, bacteria, protozoa and algae.',
    annotationQuote: 'Bacteria occupy the prokaryotic branch, while fungi occupy the eukaryotic branch.',
    support: 'The cellular microorganism chart places bacteria under prokaryotic and fungi under eukaryotic.',
    objective: 'Identify bacteria as prokaryotic microorganisms.',
    pitfalls: 'Fungi, protozoa and algae are eukaryotic groups in this comparison; bacteria are prokaryotic.',
    rejected: ['CON-INF-29351FD540E214 — covers 70S bacterial ribosomes and protein synthesis, not the base cellular classification tested here.'],
  },
  {
    q: 67, bankQ: 7, conceptId: 'CON-INF-9680A199504CCA', canonicalKey: 'microbiology.cells.prokaryote-vs-eukaryote-nucleus',
    label: 'A true nucleus distinguishes eukaryotic from prokaryotic cells', aliases: ['Prokaryotic versus eukaryotic nucleus', 'True nucleus distinction'], conceptType: 'classification',
    article: 'organisation', microtopic: 'Prokaryotic and eukaryotic cells', assessmentPage: 20, teachingPage: 15,
    stem: 'The main structural difference between prokaryotic and eukaryotic cells is:', key: 'A', options: ['Presence of a nucleus', 'Presence of a cell wall', 'Ability to reproduce', 'None of the above'],
    claim: 'Prokaryotic cells lack a true nucleus and nuclear membrane, whereas eukaryotic cells have a true membrane-bound nucleus.',
    annotationQuote: 'Prokaryotic cells lack a true nucleus, nuclear membrane and nucleolus.',
    support: 'The comparison table states that the true nucleus is absent in prokaryotic cells, with no nuclear membrane or nucleolus, and present with a nuclear membrane in eukaryotic cells.',
    objective: 'Use the presence of a true membrane-bound nucleus to distinguish eukaryotic from prokaryotic cells.',
    pitfalls: 'A cell wall is not the universal separator in the offered comparison, and both cell types can reproduce.',
    rejected: ['CON-FND-54F59770FE61B9 — concerns fungi specifically as eukaryotes, not the general prokaryote/eukaryote nucleus distinction.', 'concept_a4992569b1751dff3ed9ded3 — a fungi-specific true-nucleus raw identity, not this general cellular comparison.'],
  },
  {
    q: 85, bankQ: 25, conceptId: 'CON-INF-95F04C0956E08A', canonicalKey: 'microbiology.gram-stain.cell-wall-structure-determines-reaction',
    label: 'Gram stain differentiates bacteria by cell-wall structure', aliases: ['Gram-stain cell-wall basis', 'Cell-wall basis of Gram differentiation'], conceptType: 'classification',
    article: 'organisation', microtopic: 'Gram-stain cell-wall basis', assessmentPage: 25, teachingPage: 28,
    stem: 'The Gram stain differentiates bacteria based on:', key: 'B', options: ['Capsule composition', 'Cell wall structure', 'Nucleoid shape', 'Growth pattern'],
    claim: 'The Gram stain differentiates bacteria according to differences in bacterial cell-wall structure.',
    annotationQuote: 'Gram-positive and Gram-negative bacteria differ in cell-wall structure, including peptidoglycan thickness',
    support: 'The governed teaching compares Gram-positive and Gram-negative bacterial cell walls and their different peptidoglycan thicknesses.',
    objective: 'Identify cell-wall structure as the basis used by the Gram stain to differentiate bacteria.',
    pitfalls: 'Capsule composition, nucleoid shape and growth pattern are not the structural basis of Gram differentiation presented in the governed comparison.',
    rejected: ['concept_0678baa786a55cfe68dc9d7f — broader cell-wall shape, osmotic-protection, division and staining identity; not the exact Gram-stain differentiation basis tested here.'],
  },
  {
    q: 88, bankQ: 28, conceptId: 'CON-INF-BED5519A81949A', canonicalKey: 'microbiology.classification.molecular-biology-and-genetic-composition',
    label: 'Modern bacterial classification uses molecular biology and genetic composition', aliases: ['Molecular-genetic bacterial classification', 'New bacterial classification basis'], conceptType: 'classification',
    article: 'foundations', microtopic: 'Modern bacterial classification', assessmentPage: 26, teachingPage: 24,
    stem: 'The new system of classification is based on:', key: 'A', options: ['Molecular biology and genetics composition', 'Nature of the cell wall', 'Staining characteristics', 'Ability to form spores:'],
    claim: 'The new system of bacterial classification is based on molecular biology and genetic composition.',
    annotationQuote: 'The new system of classification is based on molecular biology and genetic composition.',
    support: 'The governed teaching states that the new system of classification is based on molecular biology and genetic composition.',
    objective: 'Recognise molecular biology and genetic composition as the basis of the new classification system.',
    pitfalls: 'Cell-wall nature, staining characteristics and spore formation are useful bacterial characteristics but are not the new-system basis stated on the governed page.',
    rejected: [],
  },
  {
    q: 90, bankQ: 30, conceptId: 'CON-INF-491A10DF6B6C1E', canonicalKey: 'microbiology.beta-lactams.peptidoglycan-layer-target',
    label: 'Penicillin targets bacterial peptidoglycan synthesis', aliases: ['Penicillin peptidoglycan-layer target', 'Beta-lactam cell-wall target'], conceptType: 'mechanism',
    article: 'organisation', microtopic: 'Peptidoglycan as an antibacterial target', assessmentPage: 26, teachingPage: 32,
    stem: 'Which of the following is the primary target of antibiotics like penicillin?', key: 'B', options: ['Ribosomes', 'Peptidoglycan layer', 'Plasmids', 'Cytoplasmic membrane'],
    claim: 'Penicillin acts against bacterial cell-wall peptidoglycan synthesis, making the peptidoglycan layer the supported source-level target among the offered options.',
    annotationQuote: 'The deck also lists penicillins among agents that prevent synthesis of the bacterial peptidoglycan layer',
    support: 'The governed teaching lists penicillins among drugs that prevent synthesis of the peptidoglycan layer of the bacterial cell wall.',
    objective: 'Select the peptidoglycan layer as the source-level bacterial target of penicillin among the offered structures.',
    pitfalls: 'The governed teaching links penicillin to peptidoglycan synthesis rather than to ribosomes, plasmids or the cytoplasmic membrane; the literal option wording is preserved without expanding it into an uncited molecular-target claim.',
    rejected: ['concept_2ea5d75f7d95e485adc3d8ef — covers carbapenem-specific PBP binding and cell-wall inhibition, not the broader source-level penicillin prompt.'],
  },
  {
    q: 94, bankQ: 4, conceptId: 'CON-INF-17893AA3303251', canonicalKey: 'microbiology.opportunism.opportunistic-pathogen-definition',
    label: 'An opportunistic pathogen causes disease under permissive host or habitat conditions', aliases: ['Opportunistic pathogen definition', 'Normally non-disease-causing microorganism becoming pathogenic'], conceptType: 'definition',
    article: 'colonizationCarriage', microtopic: 'Opportunistic pathogens', assessmentPage: '28–29', teachingPage: '7–8', teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'What is the term for a microorganism that normally does not cause disease but can do so under certain conditions?', key: 'A', options: ['Opportunistic pathogen', 'Obligate pathogen', 'Commensal microbe', 'Parasitic microbe'],
    claim: 'An opportunistic pathogen is a microorganism that normally does not cause disease but can become pathogenic when host defenses weaken or its normal habitat changes.',
    annotationQuote: 'Normal flora may produce harmful effects when host resistance is lowered or organisms move from their normal habitat.',
    support: 'The governed teaching identifies normally harmless flora becoming harmful after weakened host defenses or a change from their natural habitat.',
    objective: 'Identify an opportunistic pathogen from the condition-dependent ability of a normally harmless microorganism to cause disease.',
    pitfalls: 'Obligate pathogens are not defined by conditional disease, commensal describes a relationship without harm, and parasitic describes benefit at the host’s expense rather than this conditional state.',
    rejected: [],
  },
  {
    q: 95, bankQ: 5, conceptId: 'CON-INF-00A6805689B2B8', canonicalKey: 'microbiology.normal-flora.harmful-change-antibiotics-immunosuppression',
    label: 'Habitat change, broad-spectrum antibiotics and weak immunity can make normal flora harmful', aliases: ['Harmful effects of normal flora', 'Conditions disrupting normal flora'], conceptType: 'risk factor',
    article: 'colonizationCarriage', microtopic: 'Normal-flora disruption', assessmentPage: 29, teachingPage: '7–8', teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Which factor can lead to harmful effects of normal flora?', key: 'D', options: ['Change in natural habitat', 'Use of broad-spectrum antibiotics', 'Weak immune system', 'All of the above'],
    claim: 'Normal flora can become harmful after a change in natural habitat, broad-spectrum antimicrobial disruption or weakening of host immunity.',
    annotationQuote: 'Harmful effects may follow a change in natural habitat, broad-spectrum antimicrobial use or lowered host resistance.',
    support: 'The governed teaching lists habitat change, broad-spectrum antimicrobial use and weak host defenses as conditions under which normal flora may cause harm.',
    objective: 'Recognise all three governed conditions that can turn normal flora into a source of harm.',
    pitfalls: 'Each of the three listed conditions is supported, so selecting only one omits other governed causes and does not satisfy the all-of-the-above item.',
    rejected: [],
  },
  {
    q: 99, bankQ: 9, conceptId: 'CON-INF-EF7040395A6C7A', canonicalKey: 'microbiology.colonization.without-clinical-infection',
    label: 'Colonization is microbial establishment without clinical infection', aliases: ['Colonization without disease', 'Microbial presence without clinical infection'], conceptType: 'definition',
    article: 'colonizationCarriage', microtopic: 'Colonization', assessmentPage: 30, teachingPage: 14, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'What is the term for the presence of microbes on a host without causing disease?', key: 'B', options: ['Infection', 'Colonization', 'Pathogenesis', 'Invasion'],
    claim: 'Colonization is the establishment of proliferating microorganisms on skin or mucous membranes without clinical evidence of infection.',
    annotationQuote: 'Colonization is the establishment of proliferating microorganisms on skin or mucous membranes without clinical evidence of infection.',
    support: 'The governed teaching defines colonization as proliferating microorganisms established on skin or mucous membranes without clinical evidence of infection.',
    objective: 'Identify colonization as microbial presence and proliferation without clinical disease.',
    pitfalls: 'Infection, pathogenesis and invasion imply a different or later host–microbe state than the no-clinical-infection state defined here.',
    sourceCandidates: ['concept_25930191933ec8ce06dbcc36'],
    rejected: ['concept_25930191933ec8ce06dbcc36 — raw corpus wording supports the same fact and is retained as extraction lineage; it is not an import-ready concept record and does not replace the governed MUST identity.'],
  },
  {
    q: 102, bankQ: 12, conceptId: 'CON-INF-C4C74A0874FF61', canonicalKey: 'microbiology.infection.carrier-state-asymptomatic-shedding',
    label: 'Carrier state permits asymptomatic pathogen shedding', aliases: ['Asymptomatic carrier state', 'Pathogen shedding without symptoms'], conceptType: 'definition',
    article: 'colonizationCarriage', microtopic: 'Carrier state', assessmentPage: 31, teachingPage: 16, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'The carrier state refers to:', key: 'A', options: ['A state where the individual has no symptoms but still sheds pathogens', 'An infection that rapidly progresses to disease', 'The complete elimination of microbes from the body', 'The host resisting infection successfully'],
    claim: 'In the carrier state an infected individual has no apparent symptoms but may shed the organism.',
    annotationQuote: 'Carrier state: no apparent symptoms, but organisms may shed.',
    support: 'The governed infection-outcomes slide defines the carrier state as no apparent symptoms while organisms may shed.',
    objective: 'Recognise asymptomatic organism shedding as the defining carrier-state feature.',
    pitfalls: 'Carrier state is not rapid symptomatic progression, complete microbial elimination or successful resistance without infection.',
    sourceCandidates: ['concept_a2b4b11a538e270f6ec8c386'],
    rejected: ['concept_4c87e58ab0ec70b18fc6482e — organism-specific asymptomatic cyst shedding is narrower than the general carrier-state identity.'],
  },
  {
    q: 104, bankQ: 14, conceptId: 'CON-INF-73DB8EF3A6C468', canonicalKey: 'microbiology.virulence.degree-of-pathogenicity',
    label: 'Virulence is the degree of pathogenicity', aliases: ['Virulence definition', 'Degree of disease-causing ability'], conceptType: 'definition',
    article: 'virulenceEvasion', microtopic: 'Virulence', assessmentPage: 31, teachingPage: 18, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Virulence is:', key: 'A', options: ['The degree of pathogenicity', 'The ability of bacteria to live inside a host', 'A type of mutualistic relationship', 'The inability of bacteria to cause disease'],
    claim: 'Virulence is the degree of pathogenicity of a microorganism.',
    annotationQuote: 'Virulence is the degree of pathogenicity.',
    support: 'The governed teaching directly defines virulence as the degree of pathogenicity.',
    objective: 'Define virulence as the degree, rather than the mere presence, of pathogenicity.',
    pitfalls: 'Intrahost residence, mutualism and inability to cause disease do not express the degree of pathogenicity.',
    sourceCandidates: ['concept_392ea19120acaefcbc4900f1'],
    rejected: ['concept_392ea19120acaefcbc4900f1 — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'],
  },
  {
    q: 105, bankQ: 15, conceptId: 'CON-INF-7569E187E87C2C', canonicalKey: 'microbiology.virulence.factor-categories',
    label: 'Virulence factors support adherence, immune evasion, survival and host damage', aliases: ['Bacterial virulence-factor categories', 'Adherence immune evasion and toxin virulence factors'], conceptType: 'classification',
    article: 'virulenceEvasion', microtopic: 'Virulence factors', assessmentPage: 31, teachingPage: 19, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Which of the following is NOT a bacterial virulence factor?', key: 'C', options: ['Ability to adhere to host cells', 'Ability to resist host immune defenses', 'Inability to survive in the environment', 'Ability to produce toxins'],
    claim: 'Bacterial virulence factors include adherence, resistance to host defenses and toxin-mediated damage; inability to survive is not a virulence factor.',
    annotationQuote: 'Virulence factors include ability to adhere, resist host immune defense and damage host cells by toxins.',
    support: 'The governed teaching lists adherence, resistance to host immune defense, intracellular survival, antigenic variation, iron competition and toxin or inflammatory damage as virulence factors.',
    objective: 'Exclude inability to survive from the governed list of positive bacterial virulence capabilities.',
    pitfalls: 'Adherence, immune-defense resistance and toxin production are each explicitly listed virulence capabilities; the negatively worded inability-to-survive option is not.',
    sourceCandidates: ['concept_b346ddd4b96640338b4ed62b'],
    rejected: ['concept_b346ddd4b96640338b4ed62b — broader raw five-stage taxonomy is retained as lineage without replacing this exact option-set identity.'],
  },
  {
    q: 110, bankQ: 20, conceptId: 'CON-INF-DC0BD5BA2F6A45', canonicalKey: 'microbiology.virulence.antigenic-variation-immune-evasion',
    label: 'Antigenic variation changes surface antigens to evade immune destruction', aliases: ['Antigenic variation immune evasion', 'Changing bacterial surface antigens'], conceptType: 'mechanism',
    article: 'virulenceEvasion', microtopic: 'Antigenic variation', assessmentPage: 33, teachingPage: 31, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Which of the following is an example of antigenic variation?', key: 'A', options: ['Bacteria changing their surface proteins to evade the immune system', 'Bacteria producing enzymes to break down host tissue', 'Bacteria forming spores to survive harsh conditions', 'Bacteria developing resistance to antibiotics'],
    claim: 'Antigenic variation enables bacteria to change surface antigens and avoid immune destruction.',
    annotationQuote: 'Antigenic variation changes surface antigens to avoid immune destruction.',
    support: 'The governed teaching defines antigenic variation as changing surface antigens to avoid immune destruction.',
    objective: 'Identify immune-evasive alteration of bacterial surface antigens as antigenic variation.',
    pitfalls: 'Tissue-degrading enzymes, spore formation and antibiotic resistance are different mechanisms from immune evasion by changing surface antigens.',
    rejected: ['concept_011a8b112c2e6d90b35b02dd — gonococcal-pilus-specific antigenic variation is narrower than this general bacterial mechanism.', 'concept_e56d865081d328eda954a6dc — influenza-specific surface-glycoprotein variation is a viral identity, not this bacterial question.'],
  },
  {
    q: 115, bankQ: 25, conceptId: 'CON-INF-D777E19C7E75DB', canonicalKey: 'microbiology.virulence.antiphagocytic-coagulase-leukocidin-protein-a',
    label: 'Coagulase, leukocidin and Protein A help bacteria escape phagocytosis', aliases: ['Antiphagocytic bacterial virulence factors', 'Coagulase leukocidin and Protein A'], conceptType: 'classification',
    article: 'virulenceEvasion', microtopic: 'Antiphagocytic factors', assessmentPage: 34, teachingPage: '27, 30', teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Which of the following virulence factors helps bacteria escape phagocytosis?', key: 'D', options: ['Coagulase', 'Leukocidin', 'Protein A', 'All of the above'],
    claim: 'Coagulase, leukocidin and staphylococcal Protein A each contribute to escape from phagocytosis.',
    annotationQuote: 'Protein A is antiphagocytic; coagulase protects organisms from phagocytes; leukocidin destroys neutrophils and macrophages.',
    support: 'The governed teaching identifies Protein A as antiphagocytic and states that coagulase-mediated fibrin deposition and leukocidin-mediated phagocyte destruction help organisms escape phagocytosis.',
    objective: 'Recognise coagulase, leukocidin and Protein A as three antiphagocytic virulence factors.',
    pitfalls: 'All three named factors are supported, so selecting only one does not satisfy the all-of-the-above item.',
    rejected: ['concept_5cfb260de37ac8a03997e635 — Protein A alone is narrower than the compound three-factor identity.', 'concept_968ea0ffa6916e64f08e13f2 — a Staphylococcus aureus product list does not itself encode the shared antiphagocytic function.', 'concept_dd998ed010a69462c6739f01 — capsule/M-protein/coagulase grouping is a different factor set.'],
  },
  {
    q: 116, bankQ: 26, conceptId: 'CON-INF-650AF5666E18A2', canonicalKey: 'microbiology.virulence.siderophore-iron-acquisition',
    label: 'Siderophores acquire host-sequestered iron for bacterial growth', aliases: ['Bacterial siderophore iron acquisition', 'Iron competition by siderophores'], conceptType: 'mechanism',
    article: 'virulenceEvasion', microtopic: 'Iron acquisition', assessmentPage: 34, teachingPage: 32, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Bacteria obtain iron in the host using:', key: 'B', options: ['Pili', 'Siderophores', 'Exotoxins', 'Capsule'],
    claim: 'Bacteria produce iron-chelating siderophores to obtain iron sequestered by host iron-binding proteins.',
    annotationQuote: 'Bacteria obtain iron by producing iron chelators called siderophores.',
    support: 'The governed teaching states that bacteria produce iron chelators called siderophores to trap iron sequestered by body iron-binding proteins.',
    objective: 'Identify siderophores as the bacterial mechanism for obtaining host-sequestered iron.',
    pitfalls: 'Pili, exotoxins and capsule are not the iron-chelating molecules named in the governed teaching.',
    sourceCandidates: ['concept_ef140fbdea83f0ad8f632b5e'],
    rejected: ['concept_ef140fbdea83f0ad8f632b5e — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'],
  },
  {
    q: 117, bankQ: 27, conceptId: 'CON-INF-8C390C9DA26E6D', canonicalKey: 'microbiology.virulence.coagulase-fibrin-protection',
    label: 'Coagulase converts fibrinogen to protective fibrin around bacteria', aliases: ['Coagulase fibrin protection', 'Fibrin deposition around bacteria'], conceptType: 'mechanism',
    article: 'virulenceEvasion', microtopic: 'Coagulase', assessmentPage: '34–35', teachingPage: 30, teachingResourceId: hostMicrobeResourceId,
    teachingTitle: 'Host-Microbe Relationship', bankLabel: 'Microbiology Chapter 6', answerPage: 36,
    stem: 'Which bacterial enzyme converts fibrinogen into fibrin to protect bacteria from phagocytosis?', key: 'B', options: ['Hyaluronidase', 'Coagulase', 'Collagenase', 'Lecithinase'],
    claim: 'Coagulase converts plasma fibrinogen to fibrin, depositing fibrin on the organism and protecting it from phagocytes.',
    annotationQuote: 'Coagulase converts fibrinogen in plasma to fibrin and protects the organism from phagocytes.',
    support: 'The governed teaching states that coagulase converts plasma fibrinogen to fibrin, causing surface fibrin deposition that protects the organism from phagocytes.',
    objective: 'Identify coagulase as the enzyme producing a protective fibrin coat around bacteria.',
    pitfalls: 'Hyaluronidase and collagenase spread through connective tissue, while lecithinase disrupts phospholipid membranes; none performs the fibrinogen-to-fibrin step.',
    sourceCandidates: ['concept_7e50394238ac7cb476935db2'],
    rejected: ['concept_7e50394238ac7cb476935db2 — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'],
  },
  {
    q: 126, bankQ: 6, conceptId: 'CON-INF-AF1A323DC43B0A', canonicalKey: 'pharmacology.beta-lactams.cell-wall-inhibition',
    label: 'Beta-lactams inhibit bacterial cell-wall synthesis', aliases: ['Beta-lactam cell-wall inhibition', 'Penicillin and cephalosporin cell-wall mechanism'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Beta-lactam mechanism', assessmentPage: 38, teachingPage: 30, teachingResourceId: antibioticsIntroResourceId,
    teachingTitle: 'Antibiotics Introd Mechan', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Beta-lactam antibiotics work by inhibiting:', key: 'D', options: ['DNA replication', 'RNA synthesis', 'Protein synthesis', 'Cell wall synthesis'],
    claim: 'Beta-lactam antibiotics inhibit bacterial cell-wall synthesis.', annotationQuote: 'Cell-wall-active antibacterial drugs are bactericidal agents that include the beta-lactam group.',
    support: 'The governed mechanism deck lists beta-lactams among cell-wall synthesis inhibitors.', objective: 'Identify bacterial cell-wall synthesis as the process inhibited by beta-lactam antibiotics.',
    pitfalls: 'Beta-lactams do not answer this item through inhibition of DNA replication, RNA synthesis or protein synthesis.',
    sourceCandidates: ['concept_94077f144bd452aeaa123adf'], rejected: ['concept_94077f144bd452aeaa123adf — broad raw beta-lactam mechanism candidate retained as lineage rather than imported as a governed record.'],
  },
  {
    q: 127, bankQ: 7, conceptId: 'CON-INF-D152917B8E5B0C', canonicalKey: 'pharmacology.beta-lactams.pbp-transpeptidation',
    label: 'PBPs catalyze peptidoglycan transpeptidation', aliases: ['Penicillin-binding protein transpeptidase activity', 'PBP cell-wall cross-linking'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Penicillin-binding proteins', assessmentPage: 38, teachingPage: 31, teachingResourceId: antibioticsIntroResourceId,
    teachingTitle: 'Antibiotics Introd Mechan', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'What is the function of Penicillin-Binding Proteins (PBPs)?', key: 'B', options: ['Inhibit bacterial ribosomes', 'Catalyze transpeptidation for cell wall synthesis', 'Destroy bacterial DNA', 'Promote antibiotic resistance'],
    claim: 'Penicillin-binding proteins catalyze the transpeptidase reaction that cross-links bacterial peptidoglycan.', annotationQuote: 'PBPs catalyze the transpeptidase reaction used in peptidoglycan cross-linking.',
    support: 'The governed mechanism deck states that PBPs catalyze the transpeptidase reaction.', objective: 'Recognise transpeptidation for cell-wall synthesis as a PBP function.',
    pitfalls: 'PBPs are not ribosomal inhibitors, DNA-destroying enzymes or a generic label for antibiotic resistance.', rejected: ['concept_2ea5d75f7d95e485adc3d8ef — carbapenem-specific PBP raw candidate is narrower than the class-level function tested here.'],
  },
  {
    q: 128, bankQ: 8, conceptId: 'CON-INF-ED16D39441C89B', canonicalKey: 'pharmacology.cell-wall.vancomycin-non-beta-lactam',
    label: 'Vancomycin is a non-beta-lactam cell-wall inhibitor', aliases: ['Vancomycin non-beta-lactam classification', 'Glycopeptide cell-wall inhibitor'], conceptType: 'classification',
    article: 'cellWallAntibiotics', microtopic: 'Cell-wall inhibitor classes', assessmentPage: '38–39', teachingPage: 6, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which of the following drugs is NOT a beta-lactam?', key: 'C', options: ['Penicillin', 'Cephalosporin', 'Vancomycin', 'Carbapenem'],
    claim: 'Vancomycin is a non-beta-lactam cell-wall inhibitor, whereas penicillins, cephalosporins and carbapenems are beta-lactams.', annotationQuote: 'The governed classification separates beta-lactams from non-beta-lactams such as vancomycin.',
    support: 'The governed deck classifies penicillins, cephalosporins and carbapenems as beta-lactams and vancomycin as a non-beta-lactam.', objective: 'Distinguish vancomycin from the beta-lactam groups in the option set.',
    pitfalls: 'Penicillins, cephalosporins and carbapenems are all beta-lactams in the governed classification.', rejected: ['concept_1add06a78a1c70b54159a262 — broader glycopeptide raw identity does not preserve this exact beta-lactam contrast.'],
  },
  {
    q: 129, bankQ: 9, conceptId: 'CON-INF-B87838294C76F5', canonicalKey: 'pharmacology.beta-lactamase-inhibitors.protect-penicillins',
    label: 'Beta-lactamase inhibitors protect partner penicillins', aliases: ['Beta-lactamase inhibitor partner protection', 'Protection from beta-lactam degradation'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Beta-lactamase inhibitors', assessmentPage: 39, teachingPage: 33, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Why are beta-lactamase inhibitors combined with some penicillins?', key: 'B', options: ['To increase bacterial resistance', 'To block beta-lactamase enzymes that degrade antibiotics', 'To reduce adverse effects', 'To inhibit bacterial DNA replication'],
    claim: 'Beta-lactamase inhibitors block beta-lactamase and protect susceptible partner penicillins from degradation.', annotationQuote: 'Beta-lactamase inhibitors protect beta-lactam antibiotics from enzymatic hydrolysis.',
    support: 'The governed deck states that beta-lactamase inhibitors protect beta-lactam antibiotics from bacterial beta-lactamases.', objective: 'Explain why a beta-lactamase inhibitor is paired with a susceptible penicillin.',
    pitfalls: 'The combination is not intended to increase resistance, reduce all adverse effects or inhibit bacterial DNA replication.', sourceCandidates: ['concept_2702d2a68f2fa4a8f84067f4'], rejected: ['concept_2702d2a68f2fa4a8f84067f4 — exact raw extraction retained as lineage but not imported as a governed concept.'],
  },
  {
    q: 130, bankQ: 10, conceptId: 'CON-INF-6A330B9A78514F', canonicalKey: 'pharmacology.penicillins.natural-penicillin-g',
    label: 'Penicillin G is a natural penicillin', aliases: ['Natural penicillin G', 'Natural penicillin classification'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Natural penicillins', assessmentPage: 39, teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which of the following is a natural penicillin?', key: 'C', options: ['Nafcillin', 'Amoxicillin', 'Penicillin G', 'Piperacillin'],
    claim: 'Penicillin G belongs to the natural penicillin group.', annotationQuote: 'The penicillin classification table lists Penicillin G among natural penicillins.', support: 'The governed penicillin table places Penicillin G in the natural group.',
    objective: 'Identify Penicillin G as the natural penicillin among the offered agents.', pitfalls: 'Nafcillin is antistaphylococcal, amoxicillin is an aminopenicillin and piperacillin is extended-spectrum.', rejected: [],
  },
  {
    q: 131, bankQ: 11, conceptId: 'CON-INF-D5C29272FC4BC9', canonicalKey: 'pharmacology.penicillins.benzathine-rheumatic-fever-prophylaxis',
    label: 'Benzathine penicillin prevents recurrent rheumatic fever', aliases: ['Benzathine penicillin rheumatic-fever prophylaxis', 'Long-acting penicillin prophylaxis'], conceptType: 'clinical use',
    article: 'penicillins', microtopic: 'Long-acting penicillins', assessmentPage: 39, teachingPage: 22, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'What is the main use of benzathine penicillin?', key: 'C', options: ['Treating viral infections', 'Treating fungal infections', 'Prophylaxis for rheumatic fever', 'Treating tuberculosis'],
    claim: 'Benzathine penicillin is used for prophylaxis against recurrent rheumatic fever.', annotationQuote: 'Benzathine penicillin is listed for rheumatic-fever prophylaxis.', support: 'The governed deck lists benzathine penicillin for prophylaxis of rheumatic fever.',
    objective: 'Identify rheumatic-fever prophylaxis as the stated use of benzathine penicillin.', pitfalls: 'The governed use is not treatment of viral infection, fungal infection or tuberculosis.', sourceCandidates: ['concept_37b12448aaf7607dcef25f69'], rejected: ['concept_37b12448aaf7607dcef25f69 — broad raw long-acting prophylaxis candidate retained as lineage.'],
  },
  {
    q: 132, bankQ: 12, conceptId: 'CON-INF-D09939F6D566ED', canonicalKey: 'pharmacology.penicillins.dicloxacillin-oral-resistant-antistaphylococcal',
    label: 'Dicloxacillin is an oral beta-lactamase-resistant antistaphylococcal penicillin', aliases: ['Dicloxacillin classification', 'Oral antistaphylococcal penicillin'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Antistaphylococcal penicillins', assessmentPage: '39–40', teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which of these penicillins is resistant to beta-lactamase?', key: 'B', options: ['Amoxicillin', 'Dicloxacillin', 'Penicillin G', 'Ampicillin'],
    claim: 'Dicloxacillin is classified as a beta-lactamase-resistant antistaphylococcal penicillin.', annotationQuote: 'The penicillin table lists dicloxacillin among enzyme-resistant antistaphylococcal penicillins.', support: 'The governed table places dicloxacillin among beta-lactamase-resistant antistaphylococcal penicillins.',
    objective: 'Identify dicloxacillin as beta-lactamase resistant.', pitfalls: 'Amoxicillin and ampicillin are aminopenicillins, while Penicillin G is natural rather than enzyme-resistant.', rejected: [],
  },
  {
    q: 133, bankQ: 13, conceptId: 'CON-INF-3AA4D2A99A6811', canonicalKey: 'pharmacology.penicillins.amoxicillin-aminopenicillin',
    label: 'Amoxicillin is an aminopenicillin', aliases: ['Amoxicillin class', 'Broad-spectrum aminopenicillin'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Aminopenicillins', assessmentPage: 40, teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Amoxicillin belongs to which group of penicillins?', key: 'B', options: ['Natural penicillins', 'Aminopenicillins', 'Carboxypenicillins', 'Ureidopenicillins'],
    claim: 'Amoxicillin belongs to the aminopenicillin group.', annotationQuote: 'The penicillin classification table groups amoxicillin with aminopenicillins.', support: 'The governed table places amoxicillin in the aminopenicillin or broad-spectrum group.',
    objective: 'Classify amoxicillin as an aminopenicillin.', pitfalls: 'Amoxicillin is not classified as natural, carboxy- or ureidopenicillin in the governed table.', rejected: [],
  },
  {
    q: 134, bankQ: 14, conceptId: 'CON-INF-CF391031D13D70', canonicalKey: 'pharmacology.penicillins.piperacillin-extended-antipseudomonal',
    label: 'Piperacillin is an extended-spectrum antipseudomonal penicillin', aliases: ['Piperacillin classification', 'Antipseudomonal extended-spectrum penicillin'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Extended-spectrum penicillins', assessmentPage: 40, teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Piperacillin belongs to which category of penicillins?', key: 'A', options: ['Extended-spectrum penicillins', 'Natural penicillins', 'Penicillinase-resistant penicillins', 'Carboxypenicillins'],
    claim: 'Piperacillin is classified as an extended-spectrum antipseudomonal penicillin.', annotationQuote: 'The penicillin table places piperacillin in the antipseudomonal extended-spectrum group.', support: 'The governed table identifies piperacillin as an antipseudomonal broad or extended-spectrum penicillin.',
    objective: 'Classify piperacillin as an extended-spectrum penicillin.', pitfalls: 'Piperacillin is not natural or penicillinase-resistant, and the deck distinguishes it from the carboxypenicillin subgroup.', rejected: [],
  },
  {
    q: 135, bankQ: 15, conceptId: 'CON-INF-3BBF6AEA4C5AB4', canonicalKey: 'pharmacology.penicillins.amoxicillin-clavulanate',
    label: 'Amoxicillin is combined with clavulanate', aliases: ['Co-amoxiclav combination', 'Amoxicillin clavulanic acid'], conceptType: 'drug combination',
    article: 'penicillins', microtopic: 'Beta-lactamase inhibitor combinations', assessmentPage: 40, teachingPage: 33, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which beta-lactamase inhibitor is commonly combined with amoxicillin?', key: 'A', options: ['Clavulanate', 'Vancomycin', 'Teicoplanin', 'Nafcillin'],
    claim: 'Clavulanate is the beta-lactamase inhibitor combined with amoxicillin.', annotationQuote: 'The governed combination table lists amoxicillin plus clavulanic acid as Augmentin.', support: 'The governed deck lists amoxicillin plus clavulanic acid among beta-lactamase-inhibitor combinations.',
    objective: 'Pair amoxicillin with clavulanate.', pitfalls: 'Vancomycin and teicoplanin are glycopeptides, while nafcillin is a penicillin rather than the inhibitor paired with amoxicillin.', sourceCandidates: ['concept_550a06f2f8cdb1283f34bc9b'], rejected: ['concept_550a06f2f8cdb1283f34bc9b — exact raw extraction retained as lineage but not imported as a governed record.'],
  },
  {
    q: 136, bankQ: 16, conceptId: 'CON-INF-A23FC59A677DB6', canonicalKey: 'pharmacology.penicillins.ampicillin-sulbactam',
    label: 'Unasyn combines ampicillin with sulbactam', aliases: ['Ampicillin sulbactam', 'Unasyn composition'], conceptType: 'drug combination',
    article: 'penicillins', microtopic: 'Beta-lactamase inhibitor combinations', assessmentPage: '40–41', teachingPage: 33, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Unasyn is a combination of:', key: 'C', options: ['Amoxicillin + clavulanate', 'Piperacillin + tazobactam', 'Ampicillin + sulbactam', 'Nafcillin + dicloxacillin'],
    claim: 'Unasyn is the combination of ampicillin and sulbactam.', annotationQuote: 'The combination table identifies Unasyn as ampicillin plus sulbactam.', support: 'The governed deck lists Unasyn as ampicillin plus sulbactam.',
    objective: 'Identify the two components of Unasyn.', pitfalls: 'Amoxicillin-clavulanate and piperacillin-tazobactam are different named combinations; nafcillin-dicloxacillin is not Unasyn.', sourceCandidates: ['concept_ac6dc41e45d23db7b00bcdc0'], rejected: ['concept_ac6dc41e45d23db7b00bcdc0 — exact raw extraction retained as lineage but not imported as a governed record.'],
  },
  {
    q: 137, bankQ: 17, conceptId: 'CON-INF-2EF55DB215EF9D', canonicalKey: 'pharmacology.cell-wall.vancomycin-d-ala-d-ala',
    label: 'Vancomycin binds D-alanyl-D-alanyl peptidoglycan precursors', aliases: ['Vancomycin D-Ala-D-Ala binding', 'Glycopeptide precursor binding'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Vancomycin mechanism', assessmentPage: 41, teachingPage: 32, teachingResourceId: antibioticsIntroResourceId,
    teachingTitle: 'Antibiotics Introd Mechan', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which antibiotic binds to the D-alanyl-D-alanyl portion of peptidoglycan precursors?', key: 'B', options: ['Bacitracin', 'Vancomycin', 'Amoxicillin', 'Ceftriaxone'],
    claim: 'Vancomycin binds the D-alanyl-D-alanyl terminus of peptidoglycan precursors.', annotationQuote: 'Vancomycin binds to D-Ala-D-Ala on peptidoglycan precursors.', support: 'The governed mechanism deck states that vancomycin binds the D-alanyl-D-alanyl portion of peptidoglycan precursors.',
    objective: 'Identify vancomycin from its D-Ala-D-Ala binding mechanism.', pitfalls: 'Bacitracin blocks precursor transport, while amoxicillin and ceftriaxone are beta-lactams rather than D-Ala-D-Ala-binding glycopeptides.', rejected: [],
  },
  {
    q: 138, bankQ: 18, conceptId: 'CON-INF-4DBE227F632F33', canonicalKey: 'pharmacology.cell-wall.bacitracin-precursor-transport',
    label: 'Bacitracin blocks transport of cell-wall precursors', aliases: ['Bacitracin precursor transport inhibition', 'Bacitracin cell-wall mechanism'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Bacitracin mechanism', assessmentPage: 41, teachingPage: 32, teachingResourceId: antibioticsIntroResourceId,
    teachingTitle: 'Antibiotics Introd Mechan', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Bacitracin works by:', key: 'C', options: ['Inhibiting protein synthesis', 'Inhibiting bacterial DNA gyrase', 'Blocking transport of cell wall precursors', 'Binding to ribosomes'],
    claim: 'Bacitracin blocks transport of bacterial cell-wall precursors across the membrane.', annotationQuote: 'Bacitracin inhibits transport of cell-wall precursors across the cytoplasmic membrane.', support: 'The governed mechanism deck states that bacitracin blocks transport of cell-wall precursors.',
    objective: 'Recognise blockade of cell-wall precursor transport as bacitracin’s mechanism.', pitfalls: 'Bacitracin is not identified here as a ribosomal, protein-synthesis or DNA-gyrase inhibitor.', rejected: [],
  },
  {
    q: 139, bankQ: 19, conceptId: 'CON-INF-039F2A99E15968', canonicalKey: 'pharmacology.penicillins.hypersensitivity',
    label: 'Hypersensitivity is a major penicillin adverse effect', aliases: ['Penicillin allergy', 'Penicillin hypersensitivity reaction'], conceptType: 'adverse effect',
    article: 'penicillins', microtopic: 'Penicillin adverse effects', assessmentPage: 41, teachingPage: 23, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'A major adverse effect of penicillins is:', key: 'C', options: ['Hepatotoxicity', 'Nephrotoxicity', 'Hypersensitivity reactions', 'Seizures'],
    claim: 'Hypersensitivity reactions are a major adverse effect of penicillins.', annotationQuote: 'Hypersensitivity is presented as the most important penicillin adverse effect.', support: 'The governed deck identifies hypersensitivity as the most important adverse effect of penicillins.',
    objective: 'Identify hypersensitivity as a major penicillin adverse effect.', pitfalls: 'The governed adverse-effect emphasis is hypersensitivity, not the alternative toxicities offered in this item.', rejected: [],
  },
  {
    q: 142, bankQ: 22, conceptId: 'CON-INF-D09939F6D566ED', canonicalKey: 'pharmacology.penicillins.dicloxacillin-oral-resistant-antistaphylococcal',
    label: 'Dicloxacillin is an oral beta-lactamase-resistant antistaphylococcal penicillin', aliases: ['Dicloxacillin classification', 'Oral antistaphylococcal penicillin'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Antistaphylococcal penicillins', assessmentPage: 42, teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which penicillin formulation is given orally?', key: 'D', options: ['Penicillin G', 'Cloxacillin', 'Dicloxacillin', 'B & C'],
    claim: 'Cloxacillin and dicloxacillin are orally administered antistaphylococcal penicillins in the governed classification.', annotationQuote: 'The penicillin table marks cloxacillin and dicloxacillin as orally active.', support: 'The governed table identifies cloxacillin and dicloxacillin as oral antistaphylococcal penicillins.',
    objective: 'Recognise both cloxacillin and dicloxacillin as oral formulations in the offered set.', pitfalls: 'Because both B and C are supported, selecting only one omits the other governed oral formulation.', rejected: [],
  },
  {
    q: 146, bankQ: 26, conceptId: 'CON-INF-D09939F6D566ED', canonicalKey: 'pharmacology.penicillins.dicloxacillin-oral-resistant-antistaphylococcal',
    label: 'Dicloxacillin is an oral beta-lactamase-resistant antistaphylococcal penicillin', aliases: ['Dicloxacillin classification', 'Oral antistaphylococcal penicillin'], conceptType: 'classification',
    article: 'penicillins', microtopic: 'Antistaphylococcal penicillins', assessmentPage: 43, teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which penicillin is used primarily for Staphylococcus aureus infections?', key: 'B', options: ['Amoxicillin', 'Dicloxacillin', 'Benzathine penicillin', 'Ampicillin'],
    claim: 'Dicloxacillin is an antistaphylococcal penicillin used for susceptible Staphylococcus aureus infection.', annotationQuote: 'The penicillin table places dicloxacillin in the antistaphylococcal group.', support: 'The governed table lists dicloxacillin among beta-lactamase-resistant antistaphylococcal penicillins used for susceptible staphylococci.',
    objective: 'Select dicloxacillin as the antistaphylococcal penicillin in the offered set.', pitfalls: 'Amoxicillin and ampicillin are aminopenicillins, while benzathine penicillin is a long-acting natural penicillin formulation.', rejected: [],
  },
  {
    q: 147, bankQ: 27, conceptId: 'CON-INF-04E24B1EACC294', canonicalKey: 'pharmacology.penicillins.piperacillin-pseudomonas-potency',
    label: 'Piperacillin is the most potent listed antipseudomonal penicillin', aliases: ['Piperacillin Pseudomonas activity', 'Most potent antipseudomonal penicillin'], conceptType: 'clinical use',
    article: 'penicillins', microtopic: 'Antipseudomonal penicillins', assessmentPage: '43–44', teachingPage: 12, teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which penicillin is the most effective against Pseudomonas aeruginosa?', key: 'C', options: ['Penicillin G', 'Amoxicillin', 'Piperacillin', 'Nafcillin'],
    claim: 'Piperacillin is the most potent antipseudomonal penicillin in the governed penicillin table.', annotationQuote: 'Piperacillin is labelled the most potent antipseudomonal penicillin.', support: 'The governed table labels piperacillin as the most potent agent in the antipseudomonal penicillin group.',
    objective: 'Identify piperacillin as the most effective offered penicillin against Pseudomonas aeruginosa.', pitfalls: 'Penicillin G, amoxicillin and nafcillin are not the most potent antipseudomonal penicillin in the governed table.', rejected: [],
  },
  {
    q: 149, bankQ: 29, conceptId: 'CON-INF-AF1A323DC43B0A', canonicalKey: 'pharmacology.beta-lactams.cell-wall-inhibition',
    label: 'Beta-lactams inhibit bacterial cell-wall synthesis', aliases: ['Beta-lactam cell-wall inhibition', 'Penicillin and cephalosporin cell-wall mechanism'], conceptType: 'mechanism',
    article: 'cellWallAntibiotics', microtopic: 'Beta-lactam mechanism', assessmentPage: 44, teachingPage: '6, 8', teachingResourceId: vancomycinResourceId,
    teachingTitle: '2. B-Lactam & Vancomycin', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which of the following statements is true about cephalosporins and penicillins?', key: 'C', options: ['They have completely different mechanisms of action', 'Cross-reactivity between them is rare', 'Both inhibit bacterial cell wall synthesis', 'Cephalosporins are bacteriostatic'],
    claim: 'Penicillins and cephalosporins are beta-lactams that inhibit bacterial cell-wall synthesis.', annotationQuote: 'Penicillins and cephalosporins are grouped as bactericidal beta-lactam cell-wall inhibitors.', support: 'The governed deck places penicillins and cephalosporins in the beta-lactam cell-wall inhibitor group and describes beta-lactams as bactericidal.',
    objective: 'Recognise the shared cell-wall-synthesis mechanism of penicillins and cephalosporins.', pitfalls: 'The two groups share a beta-lactam cell-wall mechanism, and cephalosporins are not classified as bacteriostatic in the governed deck.', rejected: ['concept_94077f144bd452aeaa123adf — broad raw mechanism candidate retained as lineage rather than imported.'],
  },
  {
    q: 150, bankQ: 30, conceptId: 'CON-INF-CE6D8921A7E095', canonicalKey: 'pharmacology.beta-lactams.time-dependent-killing',
    label: 'Beta-lactams are time-dependent bactericidal drugs', aliases: ['Beta-lactam time-dependent killing', 'Time-dependent cell-wall antibiotics'], conceptType: 'pharmacodynamics',
    article: 'cellWallAntibiotics', microtopic: 'Time-dependent killing', assessmentPage: 44, teachingPage: 30, teachingResourceId: antibioticsIntroResourceId,
    teachingTitle: 'Antibiotics Introd Mechan', bankLabel: 'Pharmacology', answerPage: 45, topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], idPrefix: 'PHARM',
    stem: 'Which of the following is a time-dependent killer?', key: 'A', options: ['Beta-lactams', 'Aminoglycosides', 'Fluoroquinolones', 'Tetracyclines'],
    claim: 'Beta-lactam cell-wall inhibitors exhibit time-dependent bactericidal activity.', annotationQuote: 'Cell-wall-active beta-lactam antibiotics are presented as time-dependent bactericidal drugs.', support: 'The governed mechanism deck classifies cell-wall-active beta-lactams as time-dependent bactericidal agents.',
    objective: 'Identify beta-lactams as time-dependent killers among the offered antibiotic groups.', pitfalls: 'The governed item contrasts beta-lactam time dependence with other antimicrobial classes; tetracyclines are not bactericidal beta-lactams.', sourceCandidates: ['concept_b63d87129941d4e1074248e5'], rejected: ['concept_b63d87129941d4e1074248e5 — exact raw extraction retained as lineage but not imported as a governed concept.'],
  },
]

const mycologyItems = [
  { q: 1, conceptId: 'CON-INF-B5C54985E6FD64', canonicalKey: 'microbiology.mycology.study-of-fungi', label: 'Mycology is the study of fungi', aliases: ['Mycology definition', 'Study of fungi'], conceptType: 'definition', article: 'mycologyFoundations', microtopic: 'Mycology definition', assessmentPage: 19, teachingPage: 5, stem: 'What is the study of fungi called?', key: 'C', options: ['Bacteriology', 'Virology', 'Mycology', 'Parasitology'], claim: 'Mycology is the study of fungi.', support: 'The official lecture directly defines mycology as the study of fungi.', objective: 'Define mycology as the study of fungi.', pitfalls: 'Bacteriology, virology and parasitology concern different organism groups.', rejected: [] },
  { q: 7, conceptId: 'CON-INF-3CCC561E727F2C', canonicalKey: 'microbiology.mycology.yeast-examples-candida-cryptococcus', label: 'Candida and Cryptococcus neoformans are yeasts', aliases: ['Yeast examples', 'Candida and Cryptococcus yeasts'], conceptType: 'classification', article: 'mycologyFoundations', microtopic: 'Yeasts', assessmentPage: 21, teachingPage: '23–24', stem: 'Which of the following is an example of a yeast?', key: 'D', options: ['Cryptococcus neoformans', 'Candida', 'Histoplasma', 'A & B'], claim: 'Candida and Cryptococcus neoformans are presented as yeasts in the governed teaching.', support: 'The official diagnostic slides present Candida as oval budding yeast cells and Cryptococcus neoformans as oval yeast cells.', objective: 'Recognise both Candida and Cryptococcus neoformans as the offered yeast examples.', pitfalls: 'Both A and B are directly supported, so selecting only one is incomplete.', rejected: [] },
  { q: 8, conceptId: 'CON-INF-5B5A0738DEDA61', canonicalKey: 'microbiology.mycology.mycelium-mass-of-hyphae', label: 'Mycelium is a mass of fungal hyphae', aliases: ['Mycelium definition', 'Fungal hyphal network'], conceptType: 'definition', article: 'mycologyFoundations', microtopic: 'Filamentous fungi', assessmentPage: 21, teachingPage: 10, stem: 'What is a mycelium?', key: 'B', options: ['A mass of bacterial cells', 'A fungal hyphal network', 'A reproductive structure of viruses', 'A protozoan organelle'], claim: 'A mycelium is the mass or network of fungal hyphae.', support: 'The official lecture directly states that a mass of hyphae is known as mycelium.', objective: 'Define mycelium as a fungal hyphal network.', pitfalls: 'Mycelium is neither bacterial, viral nor protozoal.', rejected: [] },
  { q: 12, conceptId: 'CON-INF-81364DB3512B06', canonicalKey: 'microbiology.mycology.mycotoxicosis-ingested-toxins', label: 'Mycotoxicosis follows ingestion of fungal toxins', aliases: ['Mycotoxicosis cause', 'Foodborne mycotoxin poisoning'], conceptType: 'mechanism', article: 'mycologyDisease', microtopic: 'Mycotoxicosis', assessmentPage: 22, teachingPage: 16, stem: 'Mycotoxicosis is caused by:', key: 'C', options: ['Direct fungal infection', 'Inhalation of fungal spores', 'Ingestion of fungal toxins', 'Contact with fungal cell walls'], claim: 'Mycotoxicosis is food poisoning caused by ingestion of food containing fungal mycotoxins.', support: 'The official lecture defines mycotoxicosis as food poisoning caused by ingestion of food containing mycotoxins.', objective: 'Identify ingestion of fungal toxins as the cause of mycotoxicosis.', pitfalls: 'Mycotoxicosis is toxin ingestion rather than direct fungal infection, spore inhalation or cell-wall contact.', rejected: ['concept_e9eba6e391eacc33f2878d44 — broader raw fungal-disease taxonomy does not state the ingestion mechanism tested here.'] },
  { q: 16, conceptId: 'CON-INF-13FD22A18D7B3F', canonicalKey: 'microbiology.mycology.pcr-detects-fungal-dna', label: 'PCR detects fungal DNA in pathological specimens', aliases: ['Fungal PCR', 'Fungal DNA detection'], conceptType: 'diagnostic principle', article: 'mycologyDiagnosis', microtopic: 'Molecular diagnosis', assessmentPage: 24, teachingPage: 32, stem: 'Which fungal detection method identifies fungal DNA in pathological specimens?', key: 'B', options: ['Latex agglutination test', 'PCR', 'Gram staining', 'India ink stain'], claim: 'PCR detects fungal DNA in pathological specimens.', support: 'The official lecture directly states that PCR detects fungal DNA in pathological specimens.', objective: 'Identify PCR as the fungal-DNA detection method.', pitfalls: 'Latex agglutination detects antigen, while Gram and India ink are microscopy methods.', rejected: [] },
  { q: 19, conceptId: 'CON-INF-36FB4AD4FE6CA9', canonicalKey: 'microbiology.mycology.spores-reproduction-spread', label: 'Fungal spores support reproduction and spread', aliases: ['Fungal spore role', 'Fungal reproduction and dispersal'], conceptType: 'function', article: 'mycologyDisease', microtopic: 'Fungal spores', assessmentPage: 25, teachingPage: 13, stem: 'What is the main role of fungal spores?', key: 'B', options: ['Nutrition', 'Reproduction and spread', 'Producing toxins', 'Preventing immune response'], claim: 'Fungal spores support fungal reproduction and spread.', support: 'The official lecture states that fungal spores allow reproduction and promote fungal spread.', objective: 'Identify reproduction and spread as the main role of fungal spores.', pitfalls: 'The governed role is not nutrition, toxin production or immune avoidance.', rejected: ['concept_a71ce81c16fd7cb1209d1ed9 — raw sexual-spore and asexual-conidia classification is broader than the direct reproduction-and-spread function tested here.'] },
  { q: 20, conceptId: 'CON-INF-104E48053D1466', canonicalKey: 'microbiology.mycology.spore-allergens-respiratory-illness', label: 'Airborne fungal spores can trigger respiratory illness and allergy', aliases: ['Fungal spore allergens', 'Fungal respiratory allergy'], conceptType: 'clinical association', article: 'mycologyDisease', microtopic: 'Fungal allergy', assessmentPage: 25, teachingPage: '13, 15', stem: 'Which of the following is a causes of respiratory illness like sinusitis and bronchial asthma?', key: 'B', options: ['Fungal hyphae', 'Fungal spores', 'Fungal toxins', 'Bacterial spores'], claim: 'Airborne fungal spores can cause respiratory illness including sinusitis and bronchial asthma.', support: 'The official lecture identifies airborne fungal spores as a major cause of respiratory illness and says spore allergens can trigger sinusitis and bronchial asthma.', objective: 'Identify fungal spores as the offered cause of these respiratory illnesses.', pitfalls: 'The assessment grammar is retained; the governed cause is fungal spores, not hyphae, fungal toxins or bacterial spores.', rejected: [] },
  { q: 21, conceptId: 'CON-INF-104E48053D1466', canonicalKey: 'microbiology.mycology.spore-allergens-respiratory-illness', label: 'Airborne fungal spores can trigger respiratory illness and allergy', aliases: ['Fungal spore allergens', 'Fungal respiratory allergy'], conceptType: 'clinical association', article: 'mycologyDisease', microtopic: 'Fungal allergy', assessmentPage: 25, teachingPage: 15, stem: 'Which fungal component is responsible for allergic reactions?', key: 'C', options: ['Ergosterol', 'Mycotoxins', 'Fungal spores', 'Cell wall chitin'], claim: 'Fungal spores contain allergens that can trigger allergic respiratory reactions.', support: 'The official lecture directly states that many fungal spores contain allergens.', objective: 'Identify fungal spores as the allergen-bearing component in the governed teaching.', pitfalls: 'The governed slide assigns the allergic trigger to spores rather than ergosterol, mycotoxins or chitin.', rejected: [] },
  { q: 22, conceptId: 'CON-INF-0BF98D81026D99', canonicalKey: 'microbiology.mycology.calcofluor-blue-white', label: 'Calcofluor white gives fungi a fluorescent blue-white appearance', aliases: ['Calcofluor white stain', 'Fluorescent blue-white fungi'], conceptType: 'diagnostic principle', article: 'mycologyDiagnosis', microtopic: 'Special stains', assessmentPage: 26, teachingPage: '25–26', stem: 'Calcofluor white stain gives fungi a:', key: 'A', options: ['Fluorescent blue-white appearance', 'Red appearance', 'Green appearance', 'Yellow appearance'], claim: 'Calcofluor white stain gives fungi a fluorescent blue-white appearance.', support: 'The official lecture directly states that calcofluor white gives fungi a fluorescent blue-white appearance.', objective: 'Recognise the fluorescent blue-white appearance produced by calcofluor white.', pitfalls: 'Red, green and yellow are not the appearance stated by the governed lecture.', rejected: [] },
  { q: 25, conceptId: 'CON-INF-13FD22A18D7B3F', canonicalKey: 'microbiology.mycology.pcr-detects-fungal-dna', label: 'PCR detects fungal DNA in pathological specimens', aliases: ['Fungal PCR', 'Fungal DNA detection'], conceptType: 'diagnostic principle', article: 'mycologyDiagnosis', microtopic: 'Molecular diagnosis', assessmentPage: 27, teachingPage: 32, stem: 'PCR is used to detect:', key: 'B', options: ['Viral lipids', 'Fungal DNA', 'Bacterial proteins', 'Parasitic carbohydrates'], claim: 'PCR is used to detect fungal DNA.', support: 'The official lecture directly states detection of fungal DNA by PCR.', objective: 'Select fungal DNA as the PCR target in this local mycology question.', pitfalls: 'The governed PCR target is not viral lipid, bacterial protein or parasitic carbohydrate.', rejected: [] },
  { q: 26, conceptId: 'CON-INF-F893330EC83CAC', canonicalKey: 'microbiology.mycology.antibody-systemic-infection', label: 'Antibody detection mainly supports systemic fungal diagnosis', aliases: ['Fungal antibody detection', 'Systemic mycosis serology'], conceptType: 'diagnostic principle', article: 'mycologyDiagnosis', microtopic: 'Indirect diagnosis', assessmentPage: 27, teachingPage: 33, stem: 'Antibody detection is useful for diagnosing:', key: 'A', options: ['Systemic fungal infections', 'Superficial mycoses', 'Cutaneous mycoses', 'None of the above'], claim: 'Detection of specific antibodies is used mainly in diagnosis of systemic fungal infections.', support: 'The official lecture directly states that specific-antibody detection is used mainly for systemic fungal infections.', objective: 'Identify systemic fungal infections as the main use of antibody detection.', pitfalls: 'The governed slide does not assign the main use to superficial or cutaneous mycoses.', rejected: [] },
  { q: 27, conceptId: 'CON-INF-8C6B6F8D5A9C37', canonicalKey: 'microbiology.mycology.candida-opportunistic', label: 'Candida is an opportunistic fungus', aliases: ['Opportunistic Candida', 'Candida opportunistic organism'], conceptType: 'classification', article: 'mycologyDisease', microtopic: 'Opportunistic fungi', assessmentPage: 27, teachingPage: 8, stem: 'Which of the following fungi is an example of a opportunistic organism?', key: 'A', options: ['Candida', 'Aspergillus', 'Histoplasma', 'Rhizopus'], claim: 'Candida species are presented as commensals that may cause opportunistic infection under certain conditions.', support: 'The official lecture gives Candida species as the example of commensals that may cause opportunistic infections.', objective: 'Identify Candida as the offered opportunistic organism.', pitfalls: 'The assessment phrase “a opportunistic” is retained; the governed example is Candida.', rejected: [] },
].map((item) => ({
  idPrefix: 'MYCO2', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  bankLabel: 'Mycology', answerPage: 29, teachingResourceId: mycologyResourceId,
  teachingTitle: 'General Mycology, Chapter 7', topic: 'Microbiology', subtopic: 'General mycology',
  primaryNode: 'DIS-MIC', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'], ...item,
}))

microItems.push(...mycologyItems)

const virologyItems = [
  {
    q: 2, conceptId: 'CON-INF-7C3A2B8E914F60', canonicalKey: 'microbiology.virology.hbv-heat-exception-60c-30min',
    label: 'HBV is an exception to usual viral heat susceptibility at 60°C for 30 minutes', aliases: ['HBV heat resistance exception', 'Viral heat susceptibility exception'], conceptType: 'property',
    article: 'virusSusceptibility', microtopic: 'Physical susceptibility', assessmentPage: 30, teachingPage: 15,
    stem: 'Which virus is an exception to heat susceptibility at 60°C for 30 minutes?', key: 'B', options: ['Influenza virus', 'Hepatitis B Virus (HBV)', 'Poliovirus', 'Herpes virus'],
    claim: 'Hepatitis B virus is the stated exception to the usual viral heat susceptibility at 60°C for 30 minutes.',
    support: 'The official MUST general-virology slide states that most viruses are heat susceptible above 60°C for 30 minutes except hepatitis B virus.',
    objective: 'Identify HBV as the stated heat-susceptibility exception.',
    pitfalls: 'The governed exception is HBV, not influenza, poliovirus or herpes virus.', rejected: [],
  },
  {
    q: 5, conceptId: 'CON-INF-4A6E8D2B91C735', canonicalKey: 'microbiology.virology.ribosomes-not-viral-component',
    label: 'Ribosomes are not structural components of viruses', aliases: ['Viruses lack ribosomes', 'Viral structural components exclude ribosomes'], conceptType: 'structure',
    article: 'virusSusceptibility', microtopic: 'Viral components', assessmentPage: 31, teachingPage: 6,
    stem: 'Which component is NOT part of a virus?', key: 'C', options: ['Capsid', 'Envelope', 'Ribosomes', 'Nucleic acid'],
    claim: 'Ribosomes are not part of the viral structure, whereas nucleic acid and capsid are basic viral components and some viruses also have an envelope.',
    support: 'The official MUST structure slide lists nucleic acid, protein coat or capsid, and an envelope in some viruses; ribosomes are absent from the governed component list.',
    objective: 'Identify ribosomes as outside the governed viral structural components.',
    pitfalls: 'Capsid and nucleic acid are basic viral components, while an envelope is present in some viruses.', rejected: [],
  },
  {
    q: 26, conceptId: 'CON-INF-8F2C6A4D913B70', canonicalKey: 'microbiology.virology.chronic-carrier-virus-secretion-post-recovery',
    label: 'Chronic carrier infection permits virus secretion after clinical recovery', aliases: ['Chronic viral carrier', 'Post-recovery virus secretion'], conceptType: 'infection pattern',
    article: 'viralCarrier', microtopic: 'Persistent infection', assessmentPage: 36, teachingPage: 33,
    stem: 'Chronic carrier infections are characterized by:', key: 'C', options: ['Complete resolution after infection', 'Latent virus with no shedding', 'Continuous virus secretion post-recovery', 'Rapid host death'],
    claim: 'A chronic carrier infection is characterized by continued virus secretion after clinical recovery.',
    support: 'The official MUST infection-pattern slide states that in chronic carrier infection the virus is secreted from the infected individual for some time after clinical recovery.',
    objective: 'Recognise post-recovery virus secretion as the chronic-carrier pattern.',
    pitfalls: 'The chronic carrier pattern is not complete resolution, non-shedding latency or rapid host death.', rejected: [],
  },
].map((item) => ({
  idPrefix: 'VIRO2', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  bankLabel: 'Virology', answerPage: 38, teachingResourceId: generalVirologyResourceId,
  teachingTitle: 'General Virology, Chapter 8', topic: 'Microbiology', subtopic: 'General virology',
  primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'], ...item,
}))

microItems.push(...virologyItems)

const chapter10Items = [
  { q: 1, conceptId: 'CON-INF-85A1E8CB2272AA', canonicalKey: 'microbiology.ch10.staphylococci-grape-clusters-etymology', label: 'Staphylococci form grape-like clusters named from staphyle', aliases: ['Staphylococcal grape clusters', 'Staphyle means bunch of grapes'], conceptType: 'morphology', article: 'staphylococci', microtopic: 'Staphylococcal arrangement', assessmentPage: 39, teachingPage: '4–5', stem: 'Which of the following best describes the arrangement of staphylococci?', key: 'C', options: ['Chains', 'Pairs', 'Grape-like clusters', 'Tetrads'], claim: 'Staphylococci are Gram-positive cocci arranged in grape-like irregular clusters or bunches.', support: 'The official lecture describes staphylococci as Gram-positive cocci arranged in grape-like irregular clusters or bunches.', objective: 'Recognise grape-like clusters as the characteristic staphylococcal arrangement.', pitfalls: 'Chains and pairs describe the contrasting streptococcal arrangement; tetrads are not the arrangement stated here.', rejected: [] },
  { q: 2, conceptId: 'CON-INF-85A1E8CB2272AA', canonicalKey: 'microbiology.ch10.staphylococci-grape-clusters-etymology', label: 'Staphylococci form grape-like clusters named from staphyle', aliases: ['Staphylococcal grape clusters', 'Staphyle means bunch of grapes'], conceptType: 'morphology', article: 'staphylococci', microtopic: 'Staphylococcal arrangement', assessmentPage: 39, teachingPage: 4, stem: 'In Greek, what does “staphyle” mean?', key: 'D', options: ['Cocci', 'Chain', 'Cluster', 'Bunch of grapes'], claim: 'In Greek, staphyle means bunch of grapes.', support: 'The official lecture directly states that in Greek staphyle means bunch of grapes.', objective: 'Recall the source meaning of staphyle.', pitfalls: 'The source phrase is the full “bunch of grapes,” not the shorter distractors cocci, chain or cluster.', rejected: [] },
  { q: 3, conceptId: 'CON-INF-C74F8450F57CB5', canonicalKey: 'microbiology.ch10.catalase-staphylococci-streptococci', label: 'Catalase distinguishes staphylococci from streptococci', aliases: ['Staphylococci catalase positive', 'Streptococci catalase negative'], conceptType: 'diagnostic principle', article: 'staphylococci', microtopic: 'Catalase differentiation', assessmentPage: 39, teachingPage: 5, stem: 'Which enzyme is produced by all staphylococci?', key: 'A', options: ['Catalase', 'Coagulase', 'Oxidase', 'DNase'], claim: 'All staphylococci are catalase positive.', support: 'The official lecture directly states that all staphylococci are catalase positive.', objective: 'Identify catalase as the enzyme produced by all staphylococci in the governed comparison.', pitfalls: 'Coagulase separates staphylococcal groups and is not produced by all species.', rejected: [] },
  { q: 6, conceptId: 'CON-INF-5D9131404ADD15', canonicalKey: 'microbiology.ch10.s-aureus-golden-pigment', label: 'Staphylococcus aureus produces golden-yellow pigment', aliases: ['S. aureus golden pigment', 'Aureus means gold'], conceptType: 'property', article: 'staphylococci', microtopic: 'Staphylococcus aureus characteristics', assessmentPage: 40, teachingPage: '8–9', stem: 'What characteristic pigment does Staphylococcus aureus produce?', key: 'C', options: ['Green pigment', 'Red pigment', 'Golden yellow pigment', 'Blue pigment'], claim: 'Staphylococcus aureus produces a golden-yellow endopigment.', support: 'The official lecture states “aureus = gold” and that S. aureus produces golden-yellow endopigment.', objective: 'Identify the characteristic golden-yellow pigment of S. aureus.', pitfalls: 'Green, red and blue are not the pigment stated in the governed lecture.', rejected: [] },
  { q: 7, conceptId: 'CON-INF-A4A63ADF8BDCFF', canonicalKey: 'microbiology.ch10.s-aureus-beta-hemolysis', label: 'Staphylococcus aureus is beta-hemolytic on blood agar', aliases: ['S. aureus beta hemolysis', 'Beta-hemolytic Staphylococcus aureus'], conceptType: 'laboratory finding', article: 'staphylococci', microtopic: 'Staphylococcus aureus characteristics', assessmentPage: 40, teachingPage: '9, 11', stem: 'On blood agar, Staphylococcus aureus typically exhibits which type of hemolysis?', key: 'B', options: ['Alpha hemolysis', 'Beta hemolysis', 'Gamma hemolysis (no hemolysis)', 'Non-hemolytic'], claim: 'Staphylococcus aureus is beta-hemolytic on blood agar.', support: 'The official lecture lists beta hemolysis among the major characteristics of S. aureus.', objective: 'Identify beta hemolysis as the governed S. aureus blood-agar pattern.', pitfalls: 'Alpha and nonhemolytic patterns are assigned to other coccal groups in the source.', rejected: [] },
  { q: 9, conceptId: 'CON-INF-3F856387656D8F', canonicalKey: 'microbiology.ch10.streptococci-chains-pairs', label: 'Streptococci are arranged in chains or pairs', aliases: ['Streptococcal chains', 'Streptococcal pairs'], conceptType: 'morphology', article: 'streptococci', microtopic: 'Streptococcal arrangement', assessmentPage: 41, teachingPage: 14, stem: 'Streptococci are generally arranged in which pattern?', key: 'B', options: ['Clusters', 'Chains or pairs', 'Tetrads', 'Irregular groups'], claim: 'Streptococci are Gram-positive cocci arranged in chains or pairs.', support: 'The official lecture directly describes streptococci as Gram-positive cocci arranged in chains or pairs.', objective: 'Recognise chains or pairs as the streptococcal arrangement.', pitfalls: 'Clusters and irregular bunches describe staphylococci in the governed comparison.', rejected: [] },
  { q: 10, conceptId: 'CON-INF-C74F8450F57CB5', canonicalKey: 'microbiology.ch10.catalase-staphylococci-streptococci', label: 'Catalase distinguishes staphylococci from streptococci', aliases: ['Staphylococci catalase positive', 'Streptococci catalase negative'], conceptType: 'diagnostic principle', article: 'streptococci', microtopic: 'Catalase differentiation', assessmentPage: 41, teachingPage: 14, stem: 'All streptococci are negative for which enzyme?', key: 'B', options: ['Coagulase', 'Catalase', 'DNase', 'Mannitol fermentation enzyme'], claim: 'All streptococci are catalase negative.', support: 'The official lecture directly states that all streptococci are catalase negative.', objective: 'Identify catalase negativity as the governed streptococcal characteristic.', pitfalls: 'The source contrast is catalase-positive staphylococci versus catalase-negative streptococci.', rejected: [] },
  { q: 11, conceptId: 'CON-INF-7075A185535054', canonicalKey: 'microbiology.ch10.viridans-alpha-hemolysis', label: 'Viridans streptococci are alpha-hemolytic', aliases: ['Viridans alpha hemolysis', 'Alpha-hemolytic viridans streptococci'], conceptType: 'classification', article: 'streptococci', microtopic: 'Hemolytic classification', assessmentPage: 41, teachingPage: '15–16, 19–21', stem: 'Which of the following is an example of alpha-hemolytic streptococci?', key: 'C', options: ['Streptococcus pyogenes', 'Streptococcus agalactiae', 'Viridans streptococci', 'Enterococci'], claim: 'Viridans streptococci are alpha-hemolytic streptococci.', support: 'The official lecture places viridans streptococci in the alpha-hemolytic group.', objective: 'Select viridans streptococci as the alpha-hemolytic example.', pitfalls: 'S. pyogenes and S. agalactiae are beta-hemolytic; enterococci are nonhemolytic in the governed table.', rejected: [] },
  { q: 13, conceptId: 'CON-INF-AA64B806DA081E', canonicalKey: 'microbiology.ch10.s-pyogenes-lancefield-group-a', label: 'Streptococcus pyogenes belongs to Lancefield group A', aliases: ['S. pyogenes group A', 'Group A streptococcus'], conceptType: 'classification', article: 'streptococci', microtopic: 'Lancefield classification', assessmentPage: 42, teachingPage: 15, stem: 'Streptococcus pyogenes belongs to which Lancefield group?', key: 'A', options: ['Group A', 'Group B', 'Group C', 'Group D'], claim: 'Streptococcus pyogenes belongs to Lancefield group A.', support: 'The official Lancefield classification diagram places Streptococcus pyogenes under group A.', objective: 'Assign S. pyogenes to Lancefield group A.', pitfalls: 'The same diagram places S. agalactiae under group B; groups C and D are not assigned to S. pyogenes.', rejected: [] },
  { q: 14, conceptId: 'CON-INF-E7624BD37294C8', canonicalKey: 'microbiology.ch10.s-pyogenes-beta-hemolysis', label: 'Streptococcus pyogenes is beta-hemolytic', aliases: ['S. pyogenes beta hemolysis', 'Beta-hemolytic group A streptococcus'], conceptType: 'laboratory finding', article: 'streptococci', microtopic: 'Hemolytic classification', assessmentPage: 42, teachingPage: '16–18', stem: 'What hemolytic pattern does Streptococcus pyogenes display on blood agar?', key: 'B', options: ['Alpha hemolysis', 'Beta hemolysis', 'Gamma hemolysis', 'Non-hemolysis'], claim: 'Streptococcus pyogenes displays beta hemolysis on blood agar.', support: 'The official lecture classifies S. pyogenes among beta-hemolytic streptococci and lists beta hemolysis as its major characteristic.', objective: 'Identify beta hemolysis as the S. pyogenes blood-agar pattern.', pitfalls: 'Alpha and nonhemolytic patterns are assigned to different streptococcal groups.', rejected: [] },
  { q: 15, conceptId: 'CON-INF-61038BEB1BE8C6', canonicalKey: 'microbiology.ch10.enterococci-nonhemolytic', label: 'Enterococci are nonhemolytic in the governed classification', aliases: ['Nonhemolytic enterococci', 'Enterococcal hemolysis classification'], conceptType: 'classification', article: 'streptococci', microtopic: 'Hemolytic classification', assessmentPage: '42–43', teachingPage: '15–16, 20', stem: 'Which characteristic is associated with enterococci?', key: 'C', options: ['Beta hemolysis', 'Coagulase positivity', 'Non-hemolytic activity', 'Catalase positivity'], claim: 'Enterococci are classified as nonhemolytic in the governed streptococcal table.', support: 'The official lecture places enterococci under nonhemolytic streptococci and lists them as nonhemolytic.', objective: 'Identify nonhemolytic activity as the associated enterococcal characteristic.', pitfalls: 'Beta hemolysis, coagulase positivity and catalase positivity are not assigned to enterococci in the governed table.', rejected: [] },
  { q: 16, conceptId: 'CON-INF-B0D1AC6F58565C', canonicalKey: 'microbiology.ch10.peptostreptococci-profile', label: 'Peptostreptococci are anaerobic chain-forming commensals linked to mixed infections', aliases: ['Peptostreptococci profile', 'Anaerobic streptococci'], conceptType: 'clinical association', article: 'streptococci', microtopic: 'Peptostreptococci', assessmentPage: 43, teachingPage: 22, stem: 'Peptostreptococci are best described as:', key: 'B', options: ['Aerobic Gram-positive cocci in clusters', 'Anaerobic cocci arranged in chains', 'Gram-negative rods', 'Spore-forming bacilli'], claim: 'Peptostreptococci are anaerobic Gram-positive cocci arranged in chains.', support: 'The official lecture identifies Peptostreptococci as anaerobic streptococci and Gram-positive cocci arranged in chains.', objective: 'Recognise Peptostreptococci as anaerobic chain-forming Gram-positive cocci.', pitfalls: 'They are not aerobic clustered cocci, Gram-negative rods or spore-forming bacilli.', rejected: [] },
  { q: 17, conceptId: 'CON-INF-B0D1AC6F58565C', canonicalKey: 'microbiology.ch10.peptostreptococci-profile', label: 'Peptostreptococci are anaerobic chain-forming commensals linked to mixed infections', aliases: ['Peptostreptococci profile', 'Anaerobic streptococci'], conceptType: 'clinical association', article: 'streptococci', microtopic: 'Peptostreptococci', assessmentPage: 43, teachingPage: 22, stem: 'What is the normal reservoir for Peptostreptococci?', key: 'C', options: ['Skin', 'Urinary tract', 'Mouth, upper respiratory tract, intestine, and female genital tract', 'Blood'], claim: 'The normal reservoir of Peptostreptococci includes the mouth, upper respiratory tract, intestine and female genital tract.', support: 'The official lecture lists the mouth, upper respiratory tract, intestine and female genital tract as the normal commensal reservoir.', objective: 'Identify the complete governed reservoir list for Peptostreptococci.', pitfalls: 'Skin, urinary tract alone and blood do not reproduce the stated reservoir list.', rejected: [] },
  { q: 18, conceptId: 'CON-INF-B0D1AC6F58565C', canonicalKey: 'microbiology.ch10.peptostreptococci-profile', label: 'Peptostreptococci are anaerobic chain-forming commensals linked to mixed infections', aliases: ['Peptostreptococci profile', 'Anaerobic streptococci'], conceptType: 'clinical association', article: 'streptococci', microtopic: 'Peptostreptococci', assessmentPage: 43, teachingPage: 22, stem: 'In clinical settings, Peptostreptococci are most commonly associated with:', key: 'C', options: ['Pneumonia', 'Urinary tract infections', 'Mixed anaerobic infections of wounds, abdomen, lung, and genital tract', 'Meningitis'], claim: 'Peptostreptococci are involved in mixed anaerobic infections of wounds, abdomen, lung and genital tract.', support: 'The official lecture directly lists mixed anaerobic infections of wounds, abdomen, lung and genital tract.', objective: 'Recognise the governed mixed-anaerobic infection profile of Peptostreptococci.', pitfalls: 'The source presents a multisite mixed-infection pattern rather than isolated pneumonia, urinary infection or meningitis.', rejected: [] },
  { q: 19, conceptId: 'CON-INF-C74F8450F57CB5', canonicalKey: 'microbiology.ch10.catalase-staphylococci-streptococci', label: 'Catalase distinguishes staphylococci from streptococci', aliases: ['Staphylococci catalase positive', 'Streptococci catalase negative'], conceptType: 'diagnostic principle', article: 'staphylococci', microtopic: 'Catalase differentiation', assessmentPage: '43–44', teachingPage: 23, stem: 'Which test is commonly used to differentiate between staphylococci and streptococci?', key: 'A', options: ['Catalase test', 'Coagulase test', 'Mannitol fermentation test', 'Oxidase test'], claim: 'The catalase test differentiates catalase-positive staphylococci from catalase-negative streptococci.', support: 'The official assignment identifies the catalase test as the test differentiating staphylococci from streptococci.', objective: 'Select the catalase test for the governed staphylococcal-versus-streptococcal distinction.', pitfalls: 'Coagulase and mannitol tests further classify staphylococci rather than establishing this two-group distinction.', rejected: [] },
  { q: 26, conceptId: 'CON-INF-72D859013C49CF', canonicalKey: 'microbiology.ch10.nocardia-actinomyces-acid-fast-oxygen', label: 'Weak acid-fast staining differentiates Nocardia from anaerobic non-acid-fast Actinomyces', aliases: ['Nocardia versus Actinomyces', 'Weak acid-fast Nocardia'], conceptType: 'classification', article: 'branchingGramPositive', microtopic: 'Branching Gram-positive bacteria', assessmentPage: '45–46', teachingPage: 3, stem: 'Which of the following differentiates Nocardia from Actinomyces?', key: 'B', options: ['Anaerobic growth', 'Weak acid-fast staining', 'Endospore formation', 'Motility'], claim: 'Nocardia is weakly acid fast, whereas Actinomyces is non-acid fast.', support: 'The official Gram-positive classification diagram labels Nocardia weak acid fast and Actinomyces non-acid fast.', objective: 'Use weak acid-fast staining to distinguish Nocardia from Actinomyces.', pitfalls: 'Anaerobic growth characterises Actinomyces rather than Nocardia, and the diagram does not use endospores or motility for this distinction.', rejected: [] },
  { q: 27, conceptId: 'CON-INF-A68F484AA15268', canonicalKey: 'microbiology.ch10.blood-agar-hemolysis', label: 'Blood agar demonstrates streptococcal hemolytic activity', aliases: ['Streptococcal blood agar hemolysis', 'Blood agar hemolysis test'], conceptType: 'diagnostic principle', article: 'streptococci', microtopic: 'Hemolytic classification', assessmentPage: 46, teachingPage: '15–16', stem: 'Which test is used to observe hemolytic activity in streptococci?', key: 'B', options: ['Mannitol salt agar', 'Blood agar hemolysis test', 'Catalase test', 'Coagulase test'], claim: 'Streptococcal hemolytic activity is observed and classified on blood agar.', support: 'The official lecture classifies streptococci according to their effect on blood agar into beta, alpha and nonhemolytic groups.', objective: 'Identify blood agar as the medium used to observe streptococcal hemolytic activity.', pitfalls: 'Mannitol salt agar, catalase and coagulase serve different identification purposes.', rejected: [] },
  { q: 28, conceptId: 'CON-INF-72D859013C49CF', canonicalKey: 'microbiology.ch10.nocardia-actinomyces-acid-fast-oxygen', label: 'Weak acid-fast staining differentiates Nocardia from anaerobic non-acid-fast Actinomyces', aliases: ['Nocardia versus Actinomyces', 'Weak acid-fast Nocardia'], conceptType: 'classification', article: 'branchingGramPositive', microtopic: 'Branching Gram-positive bacteria', assessmentPage: 46, teachingPage: 3, stem: 'Which of the following is anaerobic, non-acid fast?', key: 'B', options: ['Nocardia', 'Actinomyces', 'Propionibacterium', 'Clostridium'], claim: 'Actinomyces is anaerobic and non-acid fast.', support: 'The official Gram-positive classification diagram labels Actinomyces anaerobic and non-acid fast.', objective: 'Identify Actinomyces from the combined anaerobic and non-acid-fast properties.', pitfalls: 'Nocardia is shown as aerobic and weak acid fast; the other offered genera are not assigned this combined branch identity.', rejected: [] },
  { q: 29, conceptId: 'CON-INF-B41082B3611139', canonicalKey: 'microbiology.ch10.griffith-m-protein', label: 'Griffith classification of streptococci uses M protein', aliases: ['Griffith M-protein classification', 'Streptococcal M-protein typing'], conceptType: 'classification', article: 'streptococci', microtopic: 'Griffith classification', assessmentPage: 46, teachingPage: 15, stem: 'Which classification method for streptococci utilizes the M protein?', key: 'B', options: ['Lancefield classification', 'Griffith classification', 'Catalase test', 'Coagulase test'], claim: 'Griffith classification of streptococci uses M protein.', support: 'The official classification diagram states “According M protein (Griffith classification).”', objective: 'Associate M-protein typing with Griffith classification.', pitfalls: 'Lancefield classification uses the C cell-wall carbohydrate antigen, while catalase and coagulase are tests rather than this typing method.', rejected: [] },
].map((item) => ({
  idPrefix: 'CH10', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  bankLabel: 'Microbiology Chapter 10', answerPage: 47, teachingResourceId: gramPositiveCocciResourceId,
  teachingTitle: 'General Characteristics of Medically Relevant Bacteria, Chapter 10', topic: 'Microbiology', subtopic: 'Medical bacteriology',
  primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'], ...item,
}))

microItems.push(...chapter10Items)

const pharmacologyPart2Items = [
  { q: 1, conceptId: 'CON-INF-FB70E1C8BC4339', canonicalKey: 'pharmacology.cephalosporins.first-generation-cefazolin', label: 'Cefazolin is a first-generation cephalosporin', aliases: ['Cefazolin generation', 'First-generation cefazolin'], conceptType: 'classification', article: 'cephalosporins', microtopic: 'First-generation cephalosporins', assessmentPage: 48, teachingPage: 7, stem: 'Which of the following is a first-generation cephalosporin?', key: 'B', options: ['Cefuroxime', 'Cefazolin', 'Ceftriaxone', 'Ceftaroline'], claim: 'Cefazolin is a first-generation cephalosporin.', support: 'The official deck places cefazolin in the first-generation cephalosporin group.', objective: 'Classify cefazolin as a first-generation cephalosporin.', pitfalls: 'Cefuroxime is second generation, ceftriaxone is third generation and ceftaroline is fifth generation in the governed deck.', rejected: [] },
  { q: 3, conceptId: 'CON-INF-9A9E7DD547B182', canonicalKey: 'pharmacology.cephalosporins.second-generation-cefaclor', label: 'Cefaclor is a second-generation cephalosporin', aliases: ['Cefaclor generation', 'Second-generation cefaclor'], conceptType: 'classification', article: 'cephalosporins', microtopic: 'Second-generation cephalosporins', assessmentPage: 48, teachingPage: 8, stem: 'Which second-generation cephalosporin is active against both Gram-positive cocci and some Gram-negative bacilli?', key: 'A', options: ['Cefaclor', 'Cefepime', 'Cefazolin', 'Cefotaxime'], claim: 'Cefaclor belongs to the second-generation cephalosporins, whose governed spectrum retains Gram-positive activity while adding Gram-negative activity.', support: 'The official deck classifies cefaclor with second-generation cephalosporins and describes that generation as less active on Gram-positive and more active on Gram-negative organisms.', objective: 'Identify cefaclor as the offered second-generation cephalosporin with the stated mixed spectrum.', pitfalls: 'Cefazolin is first generation, cefotaxime is third generation and cefepime is fourth generation.', rejected: [] },
  { q: 5, conceptId: 'CON-INF-7B464634F09F46', canonicalKey: 'pharmacology.cephalosporins.fourth-generation-cefepime', label: 'Cefepime is used empirically for serious nosocomial infection', aliases: ['Fourth-generation cefepime', 'Cefepime nosocomial use'], conceptType: 'clinical use', article: 'cephalosporins', microtopic: 'Fourth-generation cephalosporins', assessmentPage: 49, teachingPage: 10, stem: 'Fourth-generation cephalosporins like cefepime are mainly used for:', key: 'C', options: ['Mild skin infections', 'Community-acquired pneumonia', 'Serious hospital-acquired infections', 'Tuberculosis'], claim: 'Cefepime is a fourth-generation cephalosporin used for empirical treatment of nosocomial infection.', support: 'The official deck lists cefepime under fourth generation and states empirical treatment of nosocomial infections.', objective: 'Recognise serious hospital-acquired infection as the governed cefepime use.', pitfalls: 'The deck does not assign cefepime to mild skin infection, community-acquired pneumonia or tuberculosis.', rejected: [] },
  { q: 6, conceptId: 'CON-INF-71B43C95050406', canonicalKey: 'pharmacology.cephalosporins.fifth-generation-ceftaroline-mrsa', label: 'Ceftaroline is a fifth-generation cephalosporin active against MRSA', aliases: ['Ceftaroline MRSA activity', 'Fifth-generation ceftaroline'], conceptType: 'classification', article: 'cephalosporins', microtopic: 'Fifth-generation cephalosporins', assessmentPage: 49, teachingPage: 13, stem: 'Which cephalosporin is effective against MRSA?', key: 'C', options: ['Cefepime', 'Cefuroxime', 'Ceftaroline', 'Cefazolin'], claim: 'Ceftaroline is a fifth-generation cephalosporin with activity against MRSA.', support: 'The official fifth-generation slide explicitly lists ceftaroline with MRSA activity.', objective: 'Identify ceftaroline as the offered cephalosporin active against MRSA.', pitfalls: 'The governed deck does not assign the offered earlier-generation agents this MRSA role.', sourceCandidates: ['concept_3dac886699724745f861bfc5'], rejected: ['concept_3dac886699724745f861bfc5 — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 8, conceptId: 'CON-INF-4B65EC8F5C6C30', canonicalKey: 'pharmacology.monobactams.aztreonam-profile', label: 'Aztreonam is an aerobic Gram-negative monobactam without beta-lactam cross-allergy', aliases: ['Aztreonam profile', 'Monobactam aztreonam'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Aztreonam', assessmentPage: 50, teachingPage: '18, 24', stem: 'Which of the following is a monobactam antibiotic?', key: 'B', options: ['Ceftriaxone', 'Aztreonam', 'Meropenem', 'Vancomycin'], claim: 'Aztreonam is a monobactam antibiotic.', support: 'The official deck identifies aztreonam as the monobactam.', objective: 'Identify aztreonam as the monobactam among the offered drugs.', pitfalls: 'Ceftriaxone is a cephalosporin, meropenem is a carbapenem and vancomycin is a non-beta-lactam glycopeptide.', sourceCandidates: ['concept_be9951c4f6e42dcf27a24b85'], rejected: ['concept_be9951c4f6e42dcf27a24b85 — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 9, conceptId: 'CON-INF-4B65EC8F5C6C30', canonicalKey: 'pharmacology.monobactams.aztreonam-profile', label: 'Aztreonam is an aerobic Gram-negative monobactam without beta-lactam cross-allergy', aliases: ['Aztreonam profile', 'Monobactam aztreonam'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Aztreonam', assessmentPage: 50, teachingPage: 24, stem: 'Monobactams are primarily effective against:', key: 'C', options: ['Gram-positive bacteria', 'Anaerobic bacteria', 'Aerobic Gram-negative bacilli', 'Fungi'], claim: 'Aztreonam has a narrow spectrum directed at aerobic Gram-negative organisms.', support: 'The official monobactam slide states that aztreonam is effective against aerobic Gram-negative organisms.', objective: 'Identify aerobic Gram-negative bacilli as the governed monobactam spectrum.', pitfalls: 'The slide does not assign aztreonam primary Gram-positive, anaerobic or fungal activity.', rejected: [] },
  { q: 10, conceptId: 'CON-INF-4B65EC8F5C6C30', canonicalKey: 'pharmacology.monobactams.aztreonam-profile', label: 'Aztreonam is an aerobic Gram-negative monobactam without beta-lactam cross-allergy', aliases: ['Aztreonam profile', 'Monobactam aztreonam'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Aztreonam', assessmentPage: 50, teachingPage: 24, stem: 'Monobactams are considered an alternative to aminoglycosides because of their:', key: 'B', options: ['Activity against MRSA', 'Lack of nephrotoxicity', 'Beta-lactamase production', 'Ability to inhibit protein synthesis'], claim: 'Aztreonam is relatively nontoxic and lacks the nephrotoxicity associated with aminoglycosides.', support: 'The official slide states that unlike aminoglycosides aztreonam is not nephrotoxic or ototoxic.', objective: 'Identify lack of nephrotoxicity as the offered advantage over aminoglycosides.', pitfalls: 'Aztreonam is not selected here for MRSA activity, beta-lactamase production or protein-synthesis inhibition.', rejected: [] },
  { q: 11, conceptId: 'CON-INF-986A7758AADF33', canonicalKey: 'pharmacology.carbapenems.imipenem-spectrum-cilastatin', label: 'Imipenem is a broad-spectrum carbapenem combined with cilastatin', aliases: ['Imipenem cilastatin', 'Carbapenem spectrum'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Carbapenems', assessmentPage: 50, teachingPage: '19–20', stem: 'Which carbapenem is combined with cilastatin to prevent its breakdown in the kidneys?', key: 'C', options: ['Aztreonam', 'Meropenem', 'Imipenem', 'Cefepime'], claim: 'Imipenem is combined with cilastatin to inhibit renal dipeptidase.', support: 'The official deck states that imipenem must be combined with cilastatin to inhibit renal dipeptidase.', objective: 'Identify imipenem as the carbapenem paired with cilastatin.', pitfalls: 'The deck explicitly states that meropenem does not require cilastatin; the other options are not the governed pair.', sourceCandidates: ['concept_99b7d0d51903a771d753f386'], rejected: ['concept_99b7d0d51903a771d753f386 — broad raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 12, conceptId: 'CON-INF-986A7758AADF33', canonicalKey: 'pharmacology.carbapenems.imipenem-spectrum-cilastatin', label: 'Imipenem is a broad-spectrum carbapenem combined with cilastatin', aliases: ['Imipenem cilastatin', 'Carbapenem spectrum'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Carbapenems', assessmentPage: 50, teachingPage: 19, stem: 'Carbapenems are known for their broad spectrum of activity against:', key: 'C', options: ['Only Gram-negative bacteria', 'Only Gram-positive bacteria', 'Both Gram-positive and Gram-negative bacteria, including anaerobes', 'Fungi'], claim: 'Carbapenems cover Gram-positive and Gram-negative organisms, including anaerobes.', support: 'The official carbapenem slide describes the broadest beta-lactam spectrum across Gram-positive, Gram-negative and anaerobic organisms.', objective: 'Recognise the broad bacterial and anaerobic spectrum of carbapenems.', pitfalls: 'The governed spectrum is not restricted to one Gram group and does not include fungi.', sourceCandidates: ['concept_58a1f480f0d4d45284eec26d'], rejected: ['concept_58a1f480f0d4d45284eec26d — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 13, conceptId: 'CON-INF-24E2225E607D87', canonicalKey: 'pharmacology.clindamycin.pseudomembranous-colitis', label: 'Clindamycin can cause pseudomembranous colitis', aliases: ['Clindamycin-associated colitis', 'Clindamycin CDAD risk'], conceptType: 'adverse effect', article: 'vancomycinClinical', microtopic: 'Drug-induced pseudomembranous colitis', assessmentPage: 51, teachingPage: 29, stem: 'Clostridium difficile-associated diarrhea (CDAD) is commonly caused by:', key: 'A', options: ['Clindamycin', 'Vancomycin', 'Metronidazole', 'Cholestyramine'], claim: 'Clindamycin is a prominent cause of drug-induced pseudomembranous colitis associated with Clostridium difficile.', support: 'The official slide lists clindamycin under drugs inducing pseudomembranous colitis and explains C. difficile overgrowth.', objective: 'Identify clindamycin as the offered drug associated with CDAD.', pitfalls: 'Vancomycin and metronidazole are listed as treatment; cholestyramine binds toxins rather than being the inciting antibiotic.', rejected: [] },
  { q: 14, conceptId: 'CON-INF-2EF55DB215EF9D', canonicalKey: 'pharmacology.cell-wall.vancomycin-d-ala-d-ala', label: 'Vancomycin binds D-alanyl-D-alanyl peptidoglycan precursors', aliases: ['Vancomycin D-Ala-D-Ala binding', 'Glycopeptide precursor binding'], conceptType: 'mechanism', article: 'cellWallAntibiotics', microtopic: 'Vancomycin mechanism', assessmentPage: 51, teachingPage: 26, stem: 'What is the mechanism of action of vancomycin?', key: 'C', options: ['Inhibition of protein synthesis', 'Alteration of cell membrane permeability', 'Inhibition of peptidoglycan synthesis', 'Inhibition of DNA gyrase'], claim: 'Vancomycin inhibits peptidoglycan synthesis at an earlier cell-wall stage.', support: 'The official deck directly states that vancomycin inhibits peptidoglycan synthesis.', objective: 'Identify inhibition of peptidoglycan synthesis as vancomycin action.', pitfalls: 'The governed slide does not assign vancomycin ribosomal inhibition, membrane-permeability alteration or DNA-gyrase inhibition.', rejected: [] },
  { q: 15, conceptId: 'CON-INF-060E72B7954D75', canonicalKey: 'pharmacology.vancomycin.gram-positive-mrsa', label: 'Vancomycin is active against Gram-positive organisms including MRSA', aliases: ['Vancomycin Gram-positive spectrum', 'Vancomycin MRSA use'], conceptType: 'drug profile', article: 'vancomycinClinical', microtopic: 'Vancomycin spectrum and uses', assessmentPage: 51, teachingPage: 27, stem: 'Vancomycin is primarily active against:', key: 'B', options: ['Gram-negative bacteria', 'Gram-positive bacteria', 'Fungi', 'Viruses'], claim: 'Vancomycin is primarily active against Gram-positive organisms.', support: 'The official vancomycin slide places its spectrum in Gram-positive cocci and bacilli.', objective: 'Identify Gram-positive bacteria as the primary vancomycin spectrum.', pitfalls: 'The governed spectrum does not assign primary Gram-negative, fungal or viral activity.', rejected: [] },
  { q: 16, conceptId: 'CON-INF-57B07058C89DE0', canonicalKey: 'pharmacology.c-difficile.metronidazole-oral-vancomycin', label: 'Metronidazole or oral vancomycin treats pseudomembranous colitis', aliases: ['C. difficile colitis treatment', 'Oral vancomycin for pseudomembranous colitis'], conceptType: 'clinical use', article: 'vancomycinClinical', microtopic: 'Pseudomembranous colitis treatment', assessmentPage: 51, teachingPage: '27–29', stem: 'Oral vancomycin is used to treat:', key: 'C', options: ['Tuberculosis', 'Pseudomonas infections', 'Clostridium difficile infection', 'Gonorrhea'], claim: 'Oral vancomycin acts locally in pseudomembranous colitis caused by Clostridium difficile.', support: 'The official deck states that oral vancomycin acts locally in pseudomembranous colitis.', objective: 'Identify C. difficile infection as the governed oral-vancomycin use.', pitfalls: 'The deck does not assign oral vancomycin to tuberculosis, Pseudomonas infection or gonorrhea.', rejected: [] },
  { q: 17, conceptId: 'CON-INF-D169E8142D077D', canonicalKey: 'pharmacology.vancomycin.red-man-prevention', label: 'Slow infusion and antihistamine pretreatment prevent vancomycin red man syndrome', aliases: ['Vancomycin infusion reaction', 'Red man syndrome prevention'], conceptType: 'adverse effect', article: 'vancomycinClinical', microtopic: 'Vancomycin adverse effects', assessmentPage: 51, teachingPage: 30, stem: 'Rapid intravenous infusion of vancomycin can cause:', key: 'B', options: ['Anaphylaxis', 'Red man syndrome', 'Stevens-Johnson syndrome', 'Hemolytic anemia'], claim: 'Rapid vancomycin infusion is associated with histamine-mediated red man syndrome.', support: 'The official adverse-effect slide identifies red man syndrome with histamine release and states that slow infusion prevents it.', objective: 'Recognise red man syndrome as the rapid-infusion reaction to vancomycin.', pitfalls: 'The governed rapid-infusion association is red man syndrome, not the other offered reactions.', sourceCandidates: ['concept_2f8f468f2f638b724ef53978'], rejected: ['concept_2f8f468f2f638b724ef53978 — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 19, conceptId: 'CON-INF-ED16D39441C89B', canonicalKey: 'pharmacology.cell-wall.vancomycin-non-beta-lactam', label: 'Vancomycin is a non-beta-lactam cell-wall inhibitor', aliases: ['Vancomycin non-beta-lactam classification', 'Glycopeptide cell-wall inhibitor'], conceptType: 'classification', article: 'cellWallAntibiotics', microtopic: 'Cell-wall inhibitor classes', assessmentPage: 52, teachingPage: '18, 25', stem: 'Beta-lactam antibiotics include all EXCEPT:', key: 'C', options: ['Cephalosporins', 'Carbapenems', 'Vancomycin', 'Monobactams'], claim: 'Vancomycin is not a beta-lactam, whereas cephalosporins, carbapenems and monobactams are beta-lactam groups.', support: 'The deck labels carbapenems and monobactams as other beta-lactams and presents vancomycin as a non-beta-lactam antibiotic.', objective: 'Distinguish vancomycin from the offered beta-lactam groups.', pitfalls: 'Cephalosporins, carbapenems and monobactams belong to the beta-lactam classification in the governed deck.', rejected: [] },
  { q: 20, conceptId: 'CON-INF-060E72B7954D75', canonicalKey: 'pharmacology.vancomycin.gram-positive-mrsa', label: 'Vancomycin is active against Gram-positive organisms including MRSA', aliases: ['Vancomycin Gram-positive spectrum', 'Vancomycin MRSA use'], conceptType: 'drug profile', article: 'vancomycinClinical', microtopic: 'Vancomycin spectrum and uses', assessmentPage: 52, teachingPage: 27, stem: 'Which antibiotic is effective against multi-drug resistant Gram-positive organisms, including MRSA?', key: 'B', options: ['Cefuroxime', 'Vancomycin', 'Aztreonam', 'Imipenem'], claim: 'Vancomycin is used for resistant Gram-positive staphylococcal infection including MRSA.', support: 'The official vancomycin slide lists resistant staphylococcal infection and MRSA among its uses.', objective: 'Select vancomycin for the offered resistant Gram-positive and MRSA profile.', pitfalls: 'The governed slide does not assign the same MRSA role to cefuroxime, aztreonam or imipenem in this option set.', sourceCandidates: ['concept_28446335a5e8351d0759ed23'], rejected: ['concept_28446335a5e8351d0759ed23 — overlapping raw drug-profile extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 21, conceptId: 'CON-INF-4B65EC8F5C6C30', canonicalKey: 'pharmacology.monobactams.aztreonam-profile', label: 'Aztreonam is an aerobic Gram-negative monobactam without beta-lactam cross-allergy', aliases: ['Aztreonam profile', 'Monobactam aztreonam'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Aztreonam', assessmentPage: 53, teachingPage: 24, stem: 'Which beta-lactam has minimal risk of allergic reactions?', key: 'B', options: ['Cephalexin', 'Aztreonam', 'Imipenem', 'Vancomycin'], claim: 'Aztreonam has no cross-allergy with other beta-lactam antibiotics in the governed teaching.', support: 'The official aztreonam slide states no cross-allergy with beta-lactam antibiotics.', objective: 'Identify aztreonam as the offered beta-lactam with minimal cross-allergy risk.', pitfalls: 'The deck explicitly assigns the no-cross-allergy advantage to aztreonam.', sourceCandidates: ['concept_7eb8fe997f9e9511d2e86baa'], rejected: ['concept_7eb8fe997f9e9511d2e86baa — overlapping raw aztreonam profile is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 23, conceptId: 'CON-INF-4B65EC8F5C6C30', canonicalKey: 'pharmacology.monobactams.aztreonam-profile', label: 'Aztreonam is an aerobic Gram-negative monobactam without beta-lactam cross-allergy', aliases: ['Aztreonam profile', 'Monobactam aztreonam'], conceptType: 'drug profile', article: 'otherBetaLactams', microtopic: 'Aztreonam', assessmentPage: 53, teachingPage: 24, stem: 'Which antibiotic can be safely given to patients with a history of penicillin allergy?', key: 'B', options: ['Cephalexin', 'Aztreonam', 'Ceftriaxone', 'Imipenem'], claim: 'Aztreonam can be used without beta-lactam cross-allergy in the governed comparison.', support: 'The official aztreonam slide states no cross-allergy with beta-lactam antibiotics.', objective: 'Select aztreonam for the offered penicillin-allergy context.', pitfalls: 'The governed no-cross-allergy statement belongs specifically to aztreonam among these options.', rejected: [] },
  { q: 24, conceptId: 'CON-INF-ED16D39441C89B', canonicalKey: 'pharmacology.cell-wall.vancomycin-non-beta-lactam', label: 'Vancomycin is a non-beta-lactam cell-wall inhibitor', aliases: ['Vancomycin non-beta-lactam classification', 'Glycopeptide cell-wall inhibitor'], conceptType: 'classification', article: 'cellWallAntibiotics', microtopic: 'Cell-wall inhibitor classes', assessmentPage: 54, teachingPage: '18, 25', stem: 'Which antibiotic is NOT a beta-lactam?', key: 'C', options: ['Cefazolin', 'Imipenem', 'Vancomycin', 'Aztreonam'], claim: 'Vancomycin is the non-beta-lactam among cefazolin, imipenem, vancomycin and aztreonam.', support: 'The deck presents cephalosporins, carbapenems and monobactams as beta-lactams and vancomycin as non-beta-lactam.', objective: 'Identify vancomycin as the only non-beta-lactam in the offered set.', pitfalls: 'Cefazolin, imipenem and aztreonam represent beta-lactam groups in the governed classification.', rejected: [] },
  { q: 25, conceptId: 'CON-INF-AF1A323DC43B0A', canonicalKey: 'pharmacology.beta-lactams.cell-wall-inhibition', label: 'Beta-lactams inhibit bacterial cell-wall synthesis', aliases: ['Beta-lactam cell-wall inhibition', 'Penicillin and cephalosporin cell-wall mechanism'], conceptType: 'mechanism', article: 'cellWallAntibiotics', microtopic: 'Beta-lactam mechanism', assessmentPage: 54, teachingPage: 26, stem: 'What is the primary function of beta-lactam antibiotics?', key: 'B', options: ['Inhibit DNA replication', 'Inhibit bacterial cell wall synthesis', 'Inhibit folate metabolism', 'Inhibit RNA polymerase'], claim: 'Beta-lactam antibiotics inhibit bacterial cell-wall synthesis.', support: 'The official comparison states that beta-lactam antibiotics inhibit cell-wall peptidoglycan cross-linking.', objective: 'Identify bacterial cell-wall synthesis as the beta-lactam target process.', pitfalls: 'The governed mechanism does not assign beta-lactams DNA, folate or RNA-polymerase inhibition.', sourceCandidates: ['concept_77cf288624b1c088ade0ab9d'], rejected: ['concept_77cf288624b1c088ade0ab9d — exact raw extraction is retained as lineage but is not an import-ready governed concept record.'] },
  { q: 27, conceptId: 'CON-INF-D169E8142D077D', canonicalKey: 'pharmacology.vancomycin.red-man-prevention', label: 'Slow infusion and antihistamine pretreatment prevent vancomycin red man syndrome', aliases: ['Vancomycin infusion reaction', 'Red man syndrome prevention'], conceptType: 'adverse effect', article: 'vancomycinClinical', microtopic: 'Vancomycin adverse effects', assessmentPage: 54, teachingPage: 30, stem: 'Which premedication can prevent red man syndrome?', key: 'B', options: ['Acetaminophen', 'Antihistamines', 'NSAIDs', 'Corticosteroids'], claim: 'Antihistamine pretreatment helps prevent vancomycin red man syndrome.', support: 'The official adverse-effect slide states that red man syndrome is avoided by slow infusion and antihistamine pretreatment.', objective: 'Identify antihistamines as the governed premedication for red man syndrome.', pitfalls: 'The deck does not name acetaminophen, NSAIDs or corticosteroids for this prevention step.', rejected: [] },
  { q: 30, conceptId: 'CON-INF-57B07058C89DE0', canonicalKey: 'pharmacology.c-difficile.metronidazole-oral-vancomycin', label: 'Metronidazole or oral vancomycin treats pseudomembranous colitis', aliases: ['C. difficile colitis treatment', 'Oral vancomycin for pseudomembranous colitis'], conceptType: 'clinical use', article: 'vancomycinClinical', microtopic: 'Pseudomembranous colitis treatment', assessmentPage: 55, teachingPage: 29, stem: 'Clostridium difficile-associated diarrhea is commonly treated with:', key: 'B', options: ['Amoxicillin', 'Metronidazole', 'Cephalexin', 'Ceftriaxone'], claim: 'Metronidazole is a listed treatment for Clostridium difficile-associated pseudomembranous colitis.', support: 'The official slide lists metronidazole or vancomycin as treatment for drug-induced pseudomembranous colitis.', objective: 'Select metronidazole from the offered drugs for C. difficile-associated diarrhea.', pitfalls: 'Amoxicillin, cephalexin and ceftriaxone are not the treatments listed on the governed colitis slide.', rejected: [] },
].map((item) => ({
  idPrefix: 'PHARM2', bankQ: item.q, assessmentResourceId: absalamPart2AssessmentResourceId,
  bankLabel: 'Pharmacology', answerPage: 56, teachingResourceId: cellWallTeachingResourceId,
  teachingTitle: 'Cell Wall and Cell Membrane Inhibitors', topic: 'Pharmacology', subtopic: 'Antimicrobials',
  primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'], ...item,
}))

microItems.push(...pharmacologyPart2Items)

const outputs = {
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md': sources(),
  'docs/MUST-Source-Imports/evidence/corpus-source-index.json': corpusSourceIndex(),
  'docs/MUST-Source-Imports/evidence/corpus-concept-index.json': corpusConceptIndex(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-claims.md': claims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-citations.md': citations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-spans.md': spans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-cyclopropagative-concepts.md': concepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-parasitology-cyclopropagative-articles.md': articles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-parasitology-cyclopropagative-mcq.md': questions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-claims.md': trypClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-citations.md': trypCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-spans.md': trypSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-african-trypanosomiasis-concepts.md': trypConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-african-trypanosomiasis-articles.md': trypArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-african-trypanosomiasis-mcq.md': trypQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-claims.md': lymeClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-citations.md': lymeCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-spans.md': lymeSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-lyme-ixodes-concepts.md': lymeConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-lyme-ixodes-articles.md': lymeArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-lyme-ixodes-mcq.md': lymeQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-claims.md': relapsingClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-citations.md': relapsingCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-spans.md': relapsingSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-epidemic-relapsing-fever-concepts.md': relapsingConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-epidemic-relapsing-fever-articles.md': relapsingArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-epidemic-relapsing-fever-mcq.md': relapsingQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-claims.md': plagueClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-citations.md': plagueCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-spans.md': plagueSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-plague-human-flea-concepts.md': plagueConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-plague-human-flea-articles.md': plagueArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-plague-human-flea-mcq.md': plagueQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-claims.md': paratransClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-citations.md': paratransCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-spans.md': paratransSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-paratransgenesis-concepts.md': paratransConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-paratransgenesis-articles.md': paratransArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-paratransgenesis-mcq.md': paratransQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-claims.md': leishClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-citations.md': leishCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-spans.md': leishSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-cutaneous-leishmaniasis-concepts.md': leishConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-cutaneous-leishmaniasis-articles.md': leishArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-cutaneous-leishmaniasis-mcq.md': leishQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-claims.md': sarcoClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-citations.md': sarcoCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-spans.md': sarcoSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-sarcophaga-myiasis-concepts.md': sarcoConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-sarcophaga-myiasis-articles.md': sarcoArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-sarcophaga-myiasis-mcq.md': sarcoQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md': introSources(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md': introClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md': introCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md': introSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md': introConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md': introArticleRecords(),
  'docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md': introQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md': microClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md': microCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md': microSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md': microConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md': microArticleRecords(),
  'docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md': microQuestions(),
  'docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md': microCoverage(),
}

for (const [relativePath, body] of Object.entries(outputs)) {
  const path = resolve(root, relativePath)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body.trimEnd() + '\n')
}

console.log(`wrote ${Object.keys(outputs).length} deterministic FHB-102-2 authoring files`)

function sources() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${assessmentResourceId}

## title
FHB102-2 MCQ bank with printed answer list

## institution
Unattributed FHB102-2 revision carrier; MUST scope is printed but no institution or department authentication is visible

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2021-03-25

## accessed_at
2026-08-31

## page_count
6

## sha256
b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
Anonymous answer-bearing question bank. Its printed answer list is source evidence, not an authenticated faculty key. Q1, Q5, Q7, Q8, Q9, Q10, Q11 and Q12 are authored with unchanged clean keys. Q2, Q3, Q4, Q6, Q13, Q20, Q21, Q23, Q25, Q26, Q28 and Q30 are content/key-form holds. Q14 through Q19, Q22, Q24, Q27, Q29 and Q31 have clean printed keys but remain un-authored on dependency/identity-contract holds rather than weakening or clobbering live article relationships, inventing artificial companion articles or duplicating an existing identity. Q32 has a complete printed prompt but no printed answer in either normalized sibling and is retained as source-absent rather than inferred.

## confidence
0.55

## is_assessment
yes

---

# Item

## id
${teachingResourceId}

## title
Vectors of Disease Transmission, FHB102-2

## institution
MUST University Faculty of Medicine, Parasitology Department; Prof. Heba Abdel Aaty

## processing_status
visually_read_image_pdf

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
10

## sha256
5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e

## rights
Faculty-distributed teaching material; internal curriculum use.

## qualification
Officially branded MUST Parasitology Department teaching carrier. The departmental attribution supports its teaching statements; later yellow highlights are not independently treated as an authenticated faculty key.

## confidence
0.8

## is_assessment
no

---

# Item

## id
${definitionResourceId}

## title
FHB Para Myiasis Midterm Notes — arthropod transmission definitions

## institution
Student or individual teaching summary with author metadata Ebedo; no authenticated MUST institution, faculty or department attribution is visible

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
6

## sha256
6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
Non-official teaching summary. Page 2 directly defines the biological transmission categories; it supports Draft explanation language but is not an authenticated faculty authority.

## confidence
0.65

## is_assessment
no

---

# Item

## id
${ticksResourceId}

## title
FHB102-2 Vectors of Disease Transmission — ticks

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; presented by Associate Prof. Eman El-Wakil

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
40

## sha256
08be9a1018b73dcd7c3d97ef1e0502bcfa2c401d81aec2672c3e1a8e226cb955

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department teaching deck for FHB102-2. The cover names Associate Prof. Eman El-Wakil as presenter while the PDF metadata names Heba Abdel Aaty as author; the visible teaching content, rather than an inferred authorship resolution, governs this Draft slice.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${liceResourceId}

## title
FHB102-2 Vectors of Disease Transmission — lice, fleas and bugs

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; Eman El-Wakil, MD

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
79

## sha256
62dda2ba1dad2602f5db3d4401fe589b853357b3a1105d39ce6c6f57356d53df

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine FHB102-2 teaching deck. The cover names Eman El-Wakil, MD, while the PDF metadata names Winner; the visible teaching content, rather than an inferred metadata resolution, governs this Draft slice.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${mosquitoResourceId}

## title
FHB102-2 Arthropod Vectors for Disease Transmission — mosquitoes

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author HEBA

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
47

## sha256
b75f65f2298d0fcbc5f3a95d74b10caa96b314adada37f04fb78285f12f02247

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Page 44 directly defines paratransgenesis using symbiont bacteria; no examiner or authenticated answer-key claim is inferred.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${sandflyResourceId}

## title
FHB102-2 Arthropod Vectors for Disease Transmission — sandflies

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author HEBA

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
34

## sha256
a82c32271ee38d0b2cadb2f976a6eff205ab27693fab5f3906ea85798fc99bbd

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Pages 13 and 24 directly connect Phlebotomus with Leishmania and the Sinai volcano-like cutaneous lesion pattern.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${myiasisResourceId}

## title
FHB102-2 Flies and Myiasis

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author Heba Abdel Aaty

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2022-04-01

## accessed_at
2026-08-31

## page_count
58

## sha256
2c1e04372fbb8b2607f73de38b26d4667d7f7408bcbd39ffc156aaea253dcd79

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Pages 3–4, 7–8, 13–15, 20, 22–25, 28, 32, 36–42, 45–46, 51, 56 and 57 were visually governed across the Sarcophaga and Absalam Arthropoda slices. The deck directly supports the sixteen authored Arthropoda keys, the clean printed keys retained on the Q36/Q42 dependency holds, and the explicit authority/identity holds through Q60. It exposes Q38's unsupported “biological vector” wording, does not establish Eristalis as the most common gastric-myiasis cause, does not state that Calliphora lays eggs in wounds, and does not support Q60's “commonly” or “severe” qualifiers.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${tbDrugResourceId}

## title
FHB102-2 Anti-Tuberculous Drugs

## institution
Misr University for Science and Technology (MUST), visibly identified on the terminal slide; PDF metadata author O6u Moodle

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
25

## sha256
51157599ec58c9f98c28c085904d33e04803556d3154da417376d987d91e811d

## rights
Locally supplied university teaching material; internal curriculum use.

## qualification
All 25 pages were rendered and visually read. The terminal slide visibly identifies MUST and www.must.edu.eg; no named faculty, department, lecturer or examiner attribution is shown. Pages 15–16 directly support isoniazid-associated vitamin B6 depletion and pyridoxine co-administration; page 22 documents the two-option conflict that holds Q13.

## confidence
0.85

## is_assessment
no

---

# Item

## id
${protein30sResourceId}

## title
FHB102-2 Protein Synthesis Inhibitors (30S)

## institution
Locally filed under MUST FHB102-2 University Material; no visible institution, department, lecturer or examiner attribution; PDF metadata author pc

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2026-06-14

## accessed_at
2026-09-01

## page_count
22

## sha256
e059ca4507cf3177b36253ec15d510c14512bda3adcf17fd671f6fe9376b9f6c

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 22 pages were rendered and visually read. The deck contains no visible institution, department, lecturer or examiner attribution. Page 17 explicitly includes streptomycin in the aminoglycoside list; pages 18 and 20 teach aminoglycoside inner-ear accumulation and ototoxicity, including eighth-cranial-nerve injury. This supports Q15's unchanged printed C. The deck also teaches tetracycline phototoxicity and hepatotoxicity on page 13, keeping those Q15 distractors attached to a different 30S-inhibitor class rather than to streptomycin.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${proteinInhibitorResourceId}

## title
FHB102-2 Antimicrobial Protein Inhibitors

## institution
Locally filed under MUST FHB102-2; no authenticated faculty, department, lecturer or examiner attribution is visible; PDF metadata author Jost

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-04-05

## accessed_at
2026-09-01

## page_count
49

## sha256
3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 49 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 26–32 were directly rechecked for Q16 and Q18. Page 31 explicitly lists aplastic anemia and gray baby syndrome under chloramphenicol adverse effects, supporting both anonymous-bank printed keys without inference. The deck is teaching evidence only and contains no authenticated examiner key.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${protein50sResourceId}

## title
FHB102-2 Protein Synthesis Inhibitors (50S)

## institution
Locally filed under MUST FHB102-2 University Material; no visible institution, department, lecturer or examiner attribution; PDF metadata author pc

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2026-06-14

## accessed_at
2026-09-01

## page_count
17

## sha256
57dd6426a8e11335031cbf486af522a93482fc0fc68f55ab98f1553da2adfb87

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 17 pages were rendered and visually read. The deck contains no visible institution, department, lecturer or examiner attribution. Page 12 directly lists pseudomembranous colitis and diarrhea under clindamycin adverse effects, supporting Q17's unchanged printed A without inference. Page 15 directly names grey baby syndrome in neonates under chloramphenicol adverse effects, supporting Q18's unchanged printed B; the same slide's broader bone-marrow-depression wording was only corroborative for Q16 and was not rewritten into aplastic anemia.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${nucleoproteinResourceId}

## title
FHB102-2 Antimicrobial Nucleoprotein (DNA and RNA) Inhibitors

## institution
Locally filed under MUST FHB102-2; no authenticated faculty, department, lecturer or examiner attribution is visible; PDF metadata author Jost

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-04-01

## accessed_at
2026-09-01

## page_count
23

## sha256
5dfd7701d995629e7c36c7967736e21927c28a3a5e89272f8c40e20cacbac952

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 23 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 4–9 were directly rechecked for Q19 and Q22. Page 4 identifies fluoroquinolones as DNA-gyrase inhibitors and visibly includes ciprofloxacin; page 5 diagrams DNA gyrase and topoisomerase IV at the replication fork; pages 7–8 retain ciprofloxacin within the class; page 9 directly states that fluoroquinolones may damage growing cartilage and cause arthropathy. These direct slide statements support Q19's unchanged printed C and Q22's unchanged printed C without importing an external correction. The deck is teaching evidence only and contains no authenticated examiner key.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${vancomycinResourceId}

## title
Beta-Lactam and Vancomycin

## institution
Faculty of Medicine, Ain Shams University; Dr Esraa Mostafa Elnahas; no authenticated MUST institution, department, examiner, sitting or faculty-key declaration

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-02-22

## accessed_at
2026-09-01

## page_count
40

## sha256
875c205531a585cd5b91b7bd05257ca4f8a0052c7e6cfa32ddd8156c6a5c91fb

## rights
Locally supplied external-faculty teaching material; internal curriculum authoring only.

## qualification
All 40 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 37–39 were directly rechecked for Q20 and Q21. Page 38 explicitly places red man syndrome under vancomycin adverse effects, contradicting Q20's printed B, teicoplanin, because vancomycin is option C. Page 39 identifies metronidazole or oral vancomycin as treatment for drug-induced pseudomembranous colitis, contradicting Q21's printed C, piperacillin, because metronidazole is option B. The source is teaching evidence only and does not authenticate or replace either printed bank key.

## confidence
0.85

## is_assessment
no

---

# Item

## id
${basicVirologyResourceId}

## title
Basic Virology

## institution
Unattributed local teaching handout; document metadata names Dr.Mahmoud, but no institution or department authentication is visible on the pages

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/102 Basic Virology.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2019-11-17

## accessed_at
2026-09-01

## page_count
3

## sha256
b500ffe881ed0f4ace5cd836ae43696fa19d41db18bd61e2899e0de1a8eff20c

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All three pages were rendered and visually read for Q23. Page 3 lists the viral growth cycle as adsorption, entry, uncoating, transcription, translation and assembly, and describes viral nucleic-acid and protein synthesis by transcription and translation. It does not use or support the bank option's phrase “translocation of viral particles.” The handout is teaching evidence only and contains no authenticated examiner key.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${mycologyResourceId}

## title
General Mycology, Chapter 7

## institution
Misr University for Science and Technology, Faculty of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abdel Rhman

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/2.General mycology (Ch 7).pdf

## source_uri


## media_type
application/pdf

## languages
en
ar

## publication_date
2026-02-10

## accessed_at
2026-09-01

## page_count
34

## sha256
72a4c07c4877d4b58c3f378249ec654d9a889849a1eeb71394ff18a93c330162

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 34 pages were rendered and visually read for the bounded Mycology Q1–Q30 authoring audit. Page 1 visibly identifies MUST, the Faculty of Medicine Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abdel Rhman. Pages 5–16 govern terminology, structure, classification, spores, disease mechanisms, allergy and mycotoxicosis; pages 17–33 govern direct microscopy, stains, culture, antigen detection, PCR and antibody detection; pages 12 and 34 are supplied teaching quizzes. The lecture is teaching evidence only and contains no authenticated examiner key.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${generalVirologyResourceId}

## title
General Virology, Chapter 8

## institution
Misr University for Science and Technology; the deck carries the MUST institutional mark throughout

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/3.General virology (Ch 8).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
60

## sha256
09b0450fc24387f2504910346d8b5471c1221af9274d4e6101cd27684ba687ac

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 60 pages were rendered and visually read for the bounded Virology Q1–Q30 audit. Page 15 identifies HBV as the stated exception to usual viral heat susceptibility at 60°C for 30 minutes; page 6 lists nucleic acid, capsid and an optional envelope as viral components and does not include ribosomes; page 33 defines chronic carrier infection by continued virus secretion after clinical recovery. The remaining pages were read to classify support, identity collisions and the explicit Q14 and Q25 authority-form holds. The lecture is teaching evidence only and contains no authenticated examiner key.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${gramPositiveCocciResourceId}

## title
General Characteristics of Medically Relevant Bacteria, Chapter 10

## institution
Misr University for Science and Technology, Faculty of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abd El Rhman

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/5.General characteristics of medically relevant bacteria (Ch 10).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
25

## sha256
e2832d7aebaad9c7b1fefa847658799131875ed8ac508ca90f5380d69a8aa5f4

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 25 pages were rendered and visually read for the bounded Chapter 10 Q1–Q30 audit. Page 1 visibly identifies MUST, the Faculty of Medicine Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abd El Rhman. Pages 3–23 govern the Gram-positive classification tree, staphylococcal arrangement, catalase and coagulase properties, S. aureus phenotype, streptococcal arrangement and hemolytic classification, Peptostreptococci, and the catalase differentiation assignment. The deck directly supports the 19 authored prompts, exposes the unsupported precision of Q20, Q21, Q24 and Q30, and contradicts Q25's printed A by identifying S. epidermidis—not Nocardia—as a skin commensal. It is teaching evidence only and contains no authenticated examiner key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${bacterialGeneticsResourceId}

## title
Bacterial Genetics, Chapter 5

## institution
Misr University for Science and Technology, College of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abd El Rhman

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/7.Bacterial genetics (Ch 5).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2024-11-18

## accessed_at
2026-09-01

## page_count
53

## sha256
a3d71ccbc276ec9032139e5e3dd914098fe589223320777a8df7d7051e21738e

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 53 pages were rendered for bounded source location; pages 1, 4, 24–26, 30–31, 33 and 35 were directly visually read for Q25–Q27, and the other pages are not claimed as visually governed in these slices. Page 1 visibly identifies MUST College of Medicine, the Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abd El Rhman. Pages 25–26 define phenotypic variation as reversible, non-heritable, affected by environmental conditions and reversible when the environmental cause is removed. Page 25 places mutation and gene transfer under genotypic variation, while p30 describes mutation as heritable and irreversible. These statements directly contradict Q25's printed B and support offered option C, but do not authenticate or replace the bank key. Page 31 introduces transformation among gene-transfer mechanisms, page 33 defines transformation as transfer of free (naked) DNA from a donor to a recipient, and page 35 states that dying bacteria release free DNA which other bacteria can take up in nature. Those pages support Q27's unchanged printed A but do not authenticate its anonymous key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${antifungalDrugResourceId}

## title
Antifungal Drugs

## institution
Misr University for Science and Technology, College of Medicine; PDF metadata author Ahmed Bastawy

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/7. Antifungal_Drugs.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-04-26

## accessed_at
2026-09-01

## page_count
26

## sha256
bbf7f72f08ce85032b4d64e013a499d0846398d04b970d9248198ad5c141be32

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
Pages 1 and 18 were rendered and visually read for the bounded Q26 assessment; the other pages are not claimed as visually governed in this slice. Page 1 visibly identifies Misr University for Science and Technology and the College of Medicine. Page 18 identifies amphotericin B and nystatin as polyene antifungals and states that they create pores in the fungal cell membrane by binding its ergosterol. This directly supports offered option B and contradicts Q26's printed A, but it does not authenticate or replace the anonymous bank key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${bacterialGrowthResourceId}

## title
Bacterial Growth

## institution
Misr University for Science and Technology, College of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abd El Rhman

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 4 - Bacterial Growth 2024.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2024-02-28

## accessed_at
2026-09-01

## page_count
40

## sha256
da7cc51e7ac1ee22c68a6d16a89b5975e98a1274d6edaa6e046e5c99b072f7bc

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
Pages 1 and 25–26 were rendered and visually read for the bounded Q28 assessment; the other pages are not claimed as visually governed in this slice. Page 1 visibly identifies Misr University for Science and Technology, the College of Medicine, the Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abd El Rhman. Page 25 states that exacting heterotrophic bacteria require both organic forms of carbon and nitrogen for growth; page 26 describes parasitic heterotrophs. The page-25 statement directly supports offered option A and contradicts Q28's printed D, but it does not authenticate or replace the anonymous bank key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${bacterialCellResourceId}

## title
Introduction to Microbiology and Bacterial Cell Structure

## institution
Misr University for Science and Technology, College of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abd El Rhman

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 1,2,3 INTRODUCTION_TO_MICROBIOLOGY_&_BACTERIAL_CELL_STRUCTURE.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-02-08

## accessed_at
2026-09-01

## page_count
42

## sha256
88ddfa49fe01adee544433ce1dce313110c9dc622debf1dc3d6ef85a7606d674

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
Pages 1, 9–15, 24, 28–30, 32–38 were rendered and visually read across the bounded bacterial-structure and Absalam Microbiology Q61–Q90 assessments; other pages are not claimed as visually governed in these slices. Pages 1, 9–15, 28, 30, 32, 34 and 37–38 were rendered and visually read for global Q61–Q75. Pages 24, 28, 30, 32–36 and 38 were rendered and visually read for global Q76–Q90. Page 1 visibly identifies Misr University for Science and Technology, the College of Medicine, the Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abd El Rhman. Pages 9–12 directly support the major microorganism groups, saprophytes, genus capitalization and acellular/prokaryotic classification; page 15 supports the true-nucleus distinction. Page 24 states the molecular-biology and genetic-composition basis of the new classification system. Pages 28, 30, 32–36 and 38 support the three authored items and twelve bounded hold decisions without authenticating the student-bank key. Page 28 compares Gram-positive and Gram-negative cell-wall structure and peptidoglycan thickness. Page 30 places peptidoglycan and hydrolytic enzymes in the Gram-negative periplasm, so global Q78 is non-unique as written. Page 32 presents penicillins among drugs preventing peptidoglycan synthesis. Page 35 states glycocalyx attachment and nutrient-storage functions, so global Q84 is non-unique as written. Page 36 identifies plasmids as dispensable extrachromosomal DNA. Page 15 states that the prokaryotic cell has one single circular chromosome, and page 34 identifies the nucleoid as one chromosome made of double-stranded DNA.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${hostMicrobeResourceId}

## title
Host-Microbe Relationship, FHB102-2 Chapter 6

## institution
Misr University for Science and Technology, College of Medicine, Microbiology and Immunology Departments; Prof. Dr. Amany Tharwat Abd El Rhman

## processing_status
visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/4.Host-Microbe relationship (Ch 6).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
41

## sha256
e4b2f7ce3e55fad37c9a588f1b1c0f015b1d261369ed59d45a3715c9ffe02f2d

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 41 pages were rendered and visually read for global Q91–Q120. Page 1 visibly identifies Misr University for Science and Technology, the College of Medicine, the Microbiology and Immunology Departments and Prof. Dr. Amany Tharwat Abd El Rhman. Pages 3–38 directly support the ten authored questions and the twenty bounded hold decisions without authenticating the student-authored Absalam answer table. Global Q100 remains an uncorrected teaching conflict because page 15 limits colonization outcomes to elimination or resident flora, while global Q111 remains an authority/wording conflict because page 34 calls endotoxin an integral bacterial-cell-wall component rather than stating the bank's “released from” wording.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${antibioticsIntroResourceId}

## title
Antibiotics Introd Mechan

## institution
Teaching deck carrying Jost author metadata and visibly naming Prof. Ahmed Bastawy; no authenticated MUST institution, department, module, examiner or faculty-key declaration is visible

## processing_status
visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/Antibiotics Introd Mechan.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
46

## sha256
ee1fb7a716a473eb2d983d7f25ad342f2320dc40d55d3c8d32b777ae69fb46a3

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 46 pages were rendered and visually read during source governance. Pages 30–32 directly support global Q126, Q127, Q137, Q138 and Q150 by classifying beta-lactams as time-dependent bactericidal cell-wall inhibitors, describing PBP transpeptidase activity, stating vancomycin D-Ala-D-Ala binding and describing bacitracin blockade of precursor transport. The deck is teaching evidence only and does not authenticate the student-authored Absalam answer table.

## confidence
0.85

## is_assessment
no

---

# Item

## id
${cellWallTeachingResourceId}

## title
Cell Wall and Cell Membrane Inhibitors

## institution
Misr University for Science and Technology; faculty-distributed Pharmacology teaching deck

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/2.Cell Wall & Cell Membrane Inhibitors.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
36

## sha256
060e284322ddf8fdf92c49f28659b04afe98b1128fdd34a4d948da38e9ed3a38

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
All 36 pages were rendered and visually read for the bounded Pharmacology Q1–Q30 audit. Pages 7–13 govern the authored cephalosporin generation, spectrum and use items; pages 18–24 govern carbapenem and monobactam items; pages 25–30 govern vancomycin, pseudomembranous-colitis and red-man-syndrome items. The same read exposes eight explicit authority, ambiguity, conflict or non-unique-form holds. The deck is teaching evidence only and contains no authenticated examiner key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${absalamPart2AssessmentResourceId}

## title
FHB102-2 MCQs till Midterm by Absalam101 — Part 2

## institution
Student-authored revision bank attributed to Absalam101; no institution, department, examiner, sitting or authenticated faculty-key declaration is visible

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025

## accessed_at
2026-09-01

## page_count
56

## sha256
8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
All 56 pages were rendered and visually read across the complete Part 2 Mosquitoes, Sandfly, Mycology, Virology, Microbiology Chapter 10 and Pharmacology boundaries. Pages 48–55 carry Pharmacology Q1–Q30 and page 56 carries its complete thirty-token source answer table. Twenty-two Pharmacology prompts are approved for Draft authoring with wording, options and printed keys unchanged; Q2, Q4, Q7, Q18, Q22, Q26, Q28 and Q29 remain explicit authority, ambiguity, conflict or non-unique-form holds with no student-facing record. The source answers remain student-bank evidence rather than authenticated faculty keys.

## confidence
0.6

## is_assessment
yes
`
}

function corpusSourceIndex() {
  return JSON.stringify({
    note: 'Minimal FHB-102-2 corpus source index for this bounded authoring slice; values are copied from governed local-source evidence and direct visual reads.',
    generatedFrom: ['docs/MUST-Source-Imports/manifest/fhb102-2-s1-provenance.json'],
    manifestGeneratedOn: '2026-08-31',
    count: 29,
    sources: {
      [assessmentResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf'],
        sha256: 'b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063',
        processingStatus: 'fully_governed',
        pageCount: 6,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['MCQs'],
      },
      [teachingResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf'],
        sha256: '5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e',
        processingStatus: 'fully_governed',
        pageCount: 10,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['MCQs', 'Teaching notes'],
      },
      [definitionResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf'],
        sha256: '6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5',
        processingStatus: 'fully_governed',
        pageCount: 6,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Teaching notes'],
      },
      [ticksResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf'],
        sha256: '08be9a1018b73dcd7c3d97ef1e0502bcfa2c401d81aec2672c3e1a8e226cb955',
        processingStatus: 'fully_governed',
        pageCount: 40,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [liceResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf'],
        sha256: '62dda2ba1dad2602f5db3d4401fe589b853357b3a1105d39ce6c6f57356d53df',
        processingStatus: 'fully_governed',
        pageCount: 79,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [mosquitoResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf'],
        sha256: 'b75f65f2298d0fcbc5f3a95d74b10caa96b314adada37f04fb78285f12f02247',
        processingStatus: 'fully_governed',
        pageCount: 47,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [sandflyResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf'],
        sha256: 'a82c32271ee38d0b2cadb2f976a6eff205ab27693fab5f3906ea85798fc99bbd',
        processingStatus: 'fully_governed',
        pageCount: 34,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [myiasisResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf'],
        sha256: '2c1e04372fbb8b2607f73de38b26d4667d7f7408bcbd39ffc156aaea253dcd79',
        processingStatus: 'fully_governed',
        pageCount: 58,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [tbDrugResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf'],
        sha256: '51157599ec58c9f98c28c085904d33e04803556d3154da417376d987d91e811d',
        processingStatus: 'fully_governed',
        pageCount: 25,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [protein30sResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf'],
        sha256: 'e059ca4507cf3177b36253ec15d510c14512bda3adcf17fd671f6fe9376b9f6c',
        processingStatus: 'fully_governed',
        pageCount: 22,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [proteinInhibitorResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Protein inhibitors.pdf',
        ],
        sha256: '3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5',
        processingStatus: 'fully_governed',
        pageCount: 49,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [protein50sResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf'],
        sha256: '57dd6426a8e11335031cbf486af522a93482fc0fc68f55ab98f1553da2adfb87',
        processingStatus: 'fully_governed',
        pageCount: 17,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [nucleoproteinResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 4. Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
        ],
        sha256: '5dfd7701d995629e7c36c7967736e21927c28a3a5e89272f8c40e20cacbac952',
        processingStatus: 'fully_governed',
        pageCount: 23,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [vancomycinResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/B-Lactam & Vancomycin.pdf',
        ],
        sha256: '875c205531a585cd5b91b7bd05257ca4f8a0052c7e6cfa32ddd8156c6a5c91fb',
        processingStatus: 'fully_governed',
        pageCount: 40,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [basicVirologyResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/102 Basic Virology.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/102 Basic Virology.pdf'],
        sha256: 'b500ffe881ed0f4ace5cd836ae43696fa19d41db18bd61e2899e0de1a8eff20c',
        processingStatus: 'fully_governed',
        pageCount: 3,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [mycologyResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/2.General mycology (Ch 7).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/2.General mycology (Ch 7).pdf'],
        sha256: '72a4c07c4877d4b58c3f378249ec654d9a889849a1eeb71394ff18a93c330162',
        processingStatus: 'fully_governed',
        pageCount: 34,
        languages: ['en', 'ar'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [generalVirologyResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/3.General virology (Ch 8).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/3.General virology (Ch 8).pdf'],
        sha256: '09b0450fc24387f2504910346d8b5471c1221af9274d4e6101cd27684ba687ac',
        processingStatus: 'fully_governed',
        pageCount: 60,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [gramPositiveCocciResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/5.General characteristics of medically relevant bacteria (Ch 10).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/5.General characteristics of medically relevant bacteria (Ch 10).pdf'],
        sha256: 'e2832d7aebaad9c7b1fefa847658799131875ed8ac508ca90f5380d69a8aa5f4',
        processingStatus: 'fully_governed',
        pageCount: 25,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [cellWallTeachingResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/2.Cell Wall & Cell Membrane Inhibitors.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/2.Cell Wall & Cell Membrane Inhibitors.pdf'],
        sha256: '060e284322ddf8fdf92c49f28659b04afe98b1128fdd34a4d948da38e9ed3a38',
        processingStatus: 'fully_governed',
        pageCount: 36,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [bacterialGeneticsResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/7.Bacterial genetics (Ch 5).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/7.Bacterial genetics (Ch 5).pdf'],
        sha256: 'a3d71ccbc276ec9032139e5e3dd914098fe589223320777a8df7d7051e21738e',
        processingStatus: 'partially_governed_selected_pages',
        pageCount: 53,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [antifungalDrugResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/7. Antifungal_Drugs.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/7. Antifungal_Drugs.pdf'],
        sha256: 'bbf7f72f08ce85032b4d64e013a499d0846398d04b970d9248198ad5c141be32',
        processingStatus: 'partially_governed_selected_pages',
        pageCount: 26,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [bacterialGrowthResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 4 - Bacterial Growth 2024.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 4 - Bacterial Growth 2024.pdf'],
        sha256: 'da7cc51e7ac1ee22c68a6d16a89b5975e98a1274d6edaa6e046e5c99b072f7bc',
        processingStatus: 'partially_governed_selected_pages',
        pageCount: 40,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [bacterialCellResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 1,2,3 INTRODUCTION_TO_MICROBIOLOGY_&_BACTERIAL_CELL_STRUCTURE.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/CH 1,2,3 INTRODUCTION_TO_MICROBIOLOGY_&_BACTERIAL_CELL_STRUCTURE.pdf'],
        sha256: '88ddfa49fe01adee544433ce1dce313110c9dc622debf1dc3d6ef85a7606d674',
        processingStatus: 'partially_governed_selected_pages',
        pageCount: 42,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [absalamAssessmentResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf'],
        sha256: '4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf',
        processingStatus: 'fully_governed',
        pageCount: 45,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Midterm Exams', 'MCQs'],
      },
      [absalamPart2AssessmentResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf'],
        sha256: '8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c',
        processingStatus: 'fully_governed',
        pageCount: 56,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Midterm Exams', 'MCQs'],
      },
      [mucizeAssessmentResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf'],
        sha256: '352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f',
        processingStatus: 'fully_governed',
        pageCount: 47,
        languages: ['en', 'ar'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Midterm Exams', 'MCQs'],
      },
      [hostMicrobeResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/4.Host-Microbe relationship (Ch 6).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Microbiology/01 University Material/4.Host-Microbe relationship (Ch 6).pdf'],
        sha256: 'e4b2f7ce3e55fad37c9a588f1b1c0f015b1d261369ed59d45a3715c9ffe02f2d',
        processingStatus: 'fully_governed',
        pageCount: 41,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [antibioticsIntroResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/Antibiotics Introd Mechan.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/Antibiotics Introd Mechan.pdf'],
        sha256: 'ee1fb7a716a473eb2d983d7f25ad342f2320dc40d55d3c8d32b777ae69fb46a3',
        processingStatus: 'fully_governed',
        pageCount: 46,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Midterm Exams', 'Teaching'],
      },
      [introTeachingResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/1 - Introduction to Medical Parasitology.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/1 - Introduction to Medical Parasitology.pdf'],
        sha256: 'f65b3872022ca0b42a79e67c7cf1013a1b5f687b2362c2aa9e0c3fd132605149',
        processingStatus: 'fully_governed',
        pageCount: 48,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
    },
  }, null, 1)
}

function corpusConceptIndex() {
  return JSON.stringify({
    note: 'Minimal exact raw-candidate index for the governed FHB-102-2 authoring records; entries are copied from the repository corpus index and remain rejected merge provenance, not import-ready records.',
    candidates: {
      concept_25930191933ec8ce06dbcc36: { labels: ['Colonization is bacterial multiplication on a body surface without disease'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain colonization is bacterial multiplication on a body surface without disease as taught by the source.'] },
      concept_a2b4b11a538e270f6ec8c386: { labels: ['carrier state'], sources: ['10. MTI Uni Books/FINAL GIT 220 THEORITICAL BOOK 2022.pdf'], statements: [] },
      concept_392ea19120acaefcbc4900f1: { labels: ['Virulence is the quantitative degree of pathogenicity'], sources: ['5. Beni Suef Uni Books/micro.pdf'], statements: ['Explain or identify virulence is the quantitative degree of pathogenicity from the cited general microbiology evidence.'] },
      concept_b346ddd4b96640338b4ed62b: { labels: ['Virulence factors mediate adherence invasion immune evasion injury and persistence'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain virulence factors mediate adherence invasion immune evasion injury and persistence as taught by the source.'] },
      concept_ef140fbdea83f0ad8f632b5e: { labels: ['Bacteria compete for iron by siderophores'], sources: ['10. MTI Uni Books/Final HIM 110 theoretical 2022.pdf'], statements: [] },
      concept_7e50394238ac7cb476935db2: { labels: ['It converts fibrinogen into fibrin.'], sources: ['6. Fayoum Uni Books/ميكرو القسم.pdf'], statements: [] },
      concept_94077f144bd452aeaa123adf: { labels: ['Beta-lactam antibiotics inhibit bacterial cell-wall synthesis and are bactericidal'], sources: ['8. Tanta Uni Books/a14786de-78b8-42e5-a3e3-26b231151b4e.pdf'], statements: [] },
      concept_2702d2a68f2fa4a8f84067f4: { labels: ['Beta-lactamase inhibitors protect partner beta-lactams from enzymatic destruction'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain beta-lactamase inhibitors protect partner beta-lactams from enzymatic destruction as taught by the source.'] },
      concept_37b12448aaf7607dcef25f69: { labels: ['Long-acting penicillin applied for chemoprophylaxis of rheumatic fever'], sources: ['10. MTI Uni Books/PHA 109 II.pdf'], statements: [] },
      concept_550a06f2f8cdb1283f34bc9b: { labels: ['Co-amoxiclav combines amoxicillin with clavulanic acid'], sources: ['4. Alexandria Uni Books/Pharma practical ID1 2022.pdf'], statements: ['Explain co-amoxiclav combines amoxicillin with clavulanic acid as taught by the source.'] },
      concept_ac6dc41e45d23db7b00bcdc0: { labels: ['Ampicillin-Sulbactam'], sources: ['9. Zagazig Uni Books/Renal Practical.pdf'], statements: [] },
      concept_b63d87129941d4e1074248e5: { labels: ['Beta-lactams are bactericidal time-dependent cell-wall inhibitors'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain beta-lactams are bactericidal time-dependent cell-wall inhibitors as taught by the source.'] },
      concept_3dac886699724745f861bfc5: { labels: ['Ceftaroline is a fifth-generation cephalosporin active against MRSA'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain ceftaroline is a fifth-generation cephalosporin active against MRSA as taught by the source.'] },
      concept_be9951c4f6e42dcf27a24b85: { labels: ['The spectrum guide lists aztreonam as a monobactam'], sources: ['4. Alexandria Uni Books/Pharma practical ID1 2022.pdf'], statements: ['Interpret the spectrum guide lists aztreonam as a monobactam from the cited prepared-Corpus structure.'] },
      concept_7eb8fe997f9e9511d2e86baa: { labels: ['Aztreonam targets aerobic Gram-negative bacilli without penicillin cross-sensitivity'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain aztreonam targets aerobic Gram-negative bacilli without penicillin cross-sensitivity as taught by the source.'] },
      concept_99b7d0d51903a771d753f386: { labels: ['Imipenem renal degradation and cilastatin combination'], sources: ['8. Tanta Uni Books/Tanta pharmacology book.pdf'], statements: [] },
      concept_58a1f480f0d4d45284eec26d: { labels: ['Carbapenems cover broad Gram-negative Gram-positive and anaerobic organisms'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain carbapenems cover broad Gram-negative Gram-positive and anaerobic organisms as taught by the source.'] },
      concept_2f8f468f2f638b724ef53978: { labels: ['Rapid vancomycin infusion can cause histamine-mediated red-man syndrome'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain rapid vancomycin infusion can cause histamine-mediated red-man syndrome as taught by the source.'] },
      concept_28446335a5e8351d0759ed23: { labels: ['Vancomycin is a renal-eliminated Gram-positive agent active against MRSA'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain vancomycin is a renal-eliminated Gram-positive agent active against MRSA as taught by the source.'] },
      concept_77cf288624b1c088ade0ab9d: { labels: ['Beta-lactams inhibit bacterial cell-wall synthesis'], sources: ['4. Alexandria Uni Books/Infectious diseases 1 (part 1) - 2022.pdf'], statements: ['Explain beta-lactams inhibit bacterial cell-wall synthesis as taught by the source.'] },
    },
  }, null, 1)
}

function claims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-VECTOR-01

## concept_id
${conceptId}

## subject
Cyclopropagative transmission

## predicate
combines

## object
developmental change and multiplication of a parasite inside its vector; Trypanosoma cruzi in Triatoma is the local teaching example

## display_text
Cyclopropagative transmission combines developmental change and multiplication of a parasite inside its vector; Trypanosoma cruzi in Triatoma is the local teaching example.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.8

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
`
}

function citations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-VECTOR-01

## claim_id
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_id
${teachingResourceId}

## evidence_role
local_curriculum

## support_span
Triatoma (cone-nose bug/kissing bug/winged bug/reduviidae bug) ... Trypanosoma cruzi ... Cyclopropagative.

## locator_type
page

## locator_page
2

## locator_section
Trypanosoma cruzi transmission

## locator_detail
PDF page 2, lower question and yellow teaching-note box.

## context_note
Visually matched against the department-branded carrier. This citation supports the vector, parasite and cyclopropagative category; the companion citation supplies the direct definition.

## confidence
0.8

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-VECTOR-02

## claim_id
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_id
${definitionResourceId}

## evidence_role
local_curriculum

## support_span
Cyclo-propagative: pathogen multiplies & undergo morphological change.

## locator_type
page

## locator_page
2

## locator_section
Biological transmission types

## locator_detail
PDF page 2, arthropod-borne disease transmission table.

## context_note
The non-official teaching summary directly states the two defining processes. It is used only to support the Draft explanation; publication still requires independent review.

## confidence
0.65

## counts_as_claim_evidence
yes
`
}

function spans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-VECTOR-01

## article_id
${articleId}

## section_id
art-inf-must-fhb1022-cyclopropagative-definition

## text
Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.

## claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## citation_ids
CIT-INF-MUST-FHB1022-VECTOR-01
CIT-INF-MUST-FHB1022-VECTOR-02
`
}

function concepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${conceptId}

## label
Cyclopropagative transmission in arthropod vectors

## canonical_key
parasitology.vector-transmission.cyclopropagative

## aliases
Cyclopropagative transmission
Development and multiplication in a vector
Cyclopropagation in vectors

## arabic_label


## arabic_aliases
[clear]

## definition
Cyclopropagative transmission is biological vector transmission in which an infectious agent both develops and multiplies inside the arthropod vector.

## explicit_objective
Recognise cyclopropagative transmission when a parasite both develops and multiplies inside its arthropod vector.

## pitfalls
Confusing cyclopropagative transmission with propagative transmission, which involves multiplication without developmental change, or cyclodevelopmental transmission, which involves development without multiplication.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Cyclopropagative transmission

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## article_ids
${articleId}

## related_article_ids
ART-INF-TOP-A50AA5171A

## related_concept_ids
[clear]

## resource_ids
${teachingResourceId}
${assessmentResourceId}
${definitionResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.55

## confidence
0.8

## atomic_claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p1 Q1; printed answer p5
${teachingResourceId} | tier 2 | undated | p2 departmental teaching and answer annotation

## original_wording
Q1 asks the type of transmission of the Chagas-disease organism inside the vector; printed key D, cyclopropagative.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q1. Q3 and Q6 are excluded from this concept and remain explicit authoring holds in the slice ledger because their printed keys conflict with the stem wording or department evidence.

## uncertainty
No uncertainty is recorded for Q1: its printed key and department teaching carrier agree.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Four current searches for cyclopropagative, transovarian mosquito, Anopheles definitive host and biological vector transmission returned no live or pending concept.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: The first bounded slice has no necessary evidence-backed typed relationship beyond its covering article; no relation record is minted.
`
}

function articles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${articleId}

## title
Cyclopropagative transmission in arthropod vectors

## arabic_title


## aliases
Cyclopropagative vector transmission
Development and multiplication in a vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Cyclopropagative transmission

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## summary
Cyclopropagative transmission is biological transmission in which an infectious agent both develops and multiplies inside its vector. The Chagas-disease parasite Trypanosoma cruzi in Triatoma is the local curriculum example.

## sections
### Definition
Biological transmission means that an infectious agent undergoes an essential biological event inside its vector. Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.

### Mechanism
The parasite changes developmentally while also increasing in number inside the arthropod. The combination distinguishes this category from development without multiplication and multiplication without developmental change.

### Key determinants
Trypanosoma cruzi develops and multiplies in Triatoma, so its transmission inside the vector is cyclopropagative. In the local question, unilateral periorbital oedema followed later by cardiomyopathy and cardiomegaly identifies Chagas disease and points to this vector-parasite pair.

### Clinical significance
Correctly classifying the vector phase links the Chagas-disease presentation to its parasite-vector biology and separates cyclopropagative transmission from the two single-process distractors.

### Common misconceptions
Do not choose propagative if the organism also changes developmentally inside the vector, and do not choose cyclodevelopmental if multiplication also occurs. The combined prefix is the clue: cyclo for development plus propagative for multiplication.

## published_summary


## published_sections


## hold_these
Cyclopropagative means both development and multiplication inside the vector.

## lose_the_mark
Choosing propagative or cyclodevelopmental when both development and multiplication occur.

## callout_evidence
### Cyclopropagative means both development and multiplication inside the vector.
Claims: CLM-INF-MUST-FHB1022-VECTOR-01
Citations: CIT-INF-MUST-FHB1022-VECTOR-01
CIT-INF-MUST-FHB1022-VECTOR-02
Reviewed by: pending medical review

## related_concepts
${conceptId}

## related_articles
ART-INF-TOP-A50AA5171A: Medical Parasitology overview

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q01

## resource_ids
${teachingResourceId}
${assessmentResourceId}
${definitionResourceId}

## article_source_ids
${teachingResourceId}
${definitionResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## span_ids
SPN-INF-MUST-FHB1022-VECTOR-01

## university_notes
must: The first clean-key question comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the MUST Parasitology Department Vectors of Disease Transmission carrier.

## annotations
### definition_of · ${conceptId}
Quote: Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.
Block: body
Id: ann-must-fhb1022-vector-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, Prof. Heba Abdel Aaty, FHB102-2 Vectors of Disease Transmission, visually read p2.
Anonymous FHB102-2 MCQ bank, visually read p1 prompt Q1 and p5 printed answer D.
FHB Para Myiasis Midterm Notes, visually read p2 direct definition; non-official author metadata Ebedo.

## evidence_gaps
Independent standard-reference review is required before publication.
Q3 and Q6 are deliberately outside this article and remain key-conflict holds in the authoring ledger.

## conflicts
No key conflict affects authored Q1. Q3 and Q6 were not authored because their printed keys conflict with the stem wording or department evidence; no correction has been imported.

## last_reviewed


## review_due


## notes
Question-led first slice only. Q1 is the sole authored question; Q3 and Q6 are explicit holds. No record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: No image, audio or video is required to answer this text-only classification slice.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The existing Medical Parasitology overview is the only necessary adjacent reading link for this first bounded slice.
`
}

function q({ id, title, correct, answers, explanations, difficulty, effort, effortScore, inferred, objective, sourceKey, override }) {
  const answerBlocks = ['a', 'b', 'c', 'd'].map((letter, index) => `## answer_${letter}\n${answers[index]}\n\n## explanation_${letter}\n${explanations[index]}`).join('\n\n')
  return `# Item

## id
${id}

## title
${title}

## question
${title}

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with key governance checked against ${teachingResourceId} and explanation wording supported by ${definitionResourceId}.

## correct_answer
${correct}

${answerBlocks}

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${conceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
${difficulty}

## question_type
${id.endsWith('Q06') ? 'Classification' : 'Mechanism'}

## cognitive_effort
${effort}

## cognitive_effort_score
${effortScore}

## setting
Academic

## reasoning_level
2

## inferred_difficulty
${inferred}

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## question_only_for
MUST_Y1

## library_ids
${articleId}

## resource_ids
${assessmentResourceId}
${teachingResourceId}
${definitionResourceId}

## learning_objective
${objective}

## source_citation
FHB102-2 anonymous MCQ bank, p1, printed key p5 (${sourceKey}); MUST Faculty of Medicine Parasitology Department, Vectors of Disease Transmission by Prof. Heba Abdel Aaty, p2; FHB Para Myiasis Midterm Notes, p2 direct transmission-category definition.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: ${sourceKey}. ${override}
`
}

function questions() {
  const records = [
    q({
      id: 'QST-MUST-FHB1022-PARA-VECT-Q01',
      title: 'A South American developed unilateral oedema of the eye after a vector bite that disappeared with time; he later developed a cardiac problem and cardiomegaly. What is the type of transmission of the causative organism inside the vector?',
      correct: 'D',
      answers: ['Cyclodevelopmental', 'Propagative', 'Transovarian', 'Cyclopropagative'],
      explanations: [
        'Incorrect. Cyclodevelopmental transmission means the organism develops inside the vector without multiplying, which does not describe Trypanosoma cruzi in Triatoma.',
        'Incorrect. Propagative transmission is multiplication without developmental change, whereas the parasite in this stem both develops and multiplies inside its vector.',
        'Incorrect. Transovarian transmission is passage from an infected female arthropod to its offspring through eggs, not the process described in this Chagas-disease vignette.',
        'Correct. The unilateral periorbital oedema followed by cardiomyopathy points to Trypanosoma cruzi infection transmitted by Triatoma. The parasite undergoes developmental change and multiplication inside the vector, so the mode is cyclopropagative. Hold the prefix pair: cyclo means development and propagative means multiplication.',
      ],
      difficulty: 'Moderate', effort: 'Medium', effortScore: '0.5', inferred: '55',
      objective: 'Recognise cyclopropagative transmission when a parasite both develops and multiplies inside its arthropod vector.',
      sourceKey: 'Q1 = D',
      override: 'The printed key agrees with the MUST department teaching carrier; no override was made.',
    }),
  ]
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->\n\n${records.join('\n\n---\n\n')}`
}

function trypClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-TRYP-01

## concept_id
${trypConceptId}

## subject
West African trypanosomiasis

## predicate
has blood-film diagnostic stage

## object
the polymorphic trypomastigote, seen extracellularly between red blood cells

## display_text
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.85

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
species_context: Trypanosoma brucei gambiense
`
}

function trypCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-TRYP-01

## claim_id
CLM-INF-MUST-FHB1022-TRYP-01

## resource_id
${teachingResourceId}

## evidence_role
local_curriculum

## support_span
After several month of safari in West Africa ... enlarged lymph nodes ... lethargy and drowsiness ... parasitic stages between RBCs ... c. Polymorphic trypomastigote; D.S: polymorphic trypanosomes.

## locator_type
page

## locator_page
5

## locator_section
West African sleeping sickness blood-film stage

## locator_detail
PDF page 5, middle question, highlighted option C and adjacent yellow teaching-note box.

## context_note
The department-branded carrier matches the bank stem and directly identifies the polymorphic trypomastigote as the diagnostic blood stage.

## confidence
0.85

## counts_as_claim_evidence
yes
`
}

function trypSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-TRYP-01

## article_id
${trypArticleId}

## section_id
art-inf-must-fhb1022-african-trypanosomiasis-stage-definition

## text
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

## claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## citation_ids
CIT-INF-MUST-FHB1022-TRYP-01
`
}

function trypConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${trypConceptId}

## label
Polymorphic trypomastigote in West African trypanosomiasis

## canonical_key
parasitology.african-trypanosomiasis.diagnostic-blood-stage

## aliases
African sleeping sickness blood-film stage
Trypanosoma brucei gambiense diagnostic stage
Polymorphic trypomastigote

## arabic_label


## arabic_aliases
[clear]

## definition
In West African sleeping sickness, the diagnostic parasite form shown in a peripheral blood film is the polymorphic trypomastigote, lying extracellularly between red blood cells.

## explicit_objective
Identify the polymorphic trypomastigote as the diagnostic blood-film stage in a West African trypanosomiasis vignette.

## pitfalls
Choosing amastigote, promastigote or epimastigote despite the West African sleeping-sickness pattern and the stated extracellular blood-film finding.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T01

## secondary_node_ids
DIS-PAR-T03
SYS-FND-T05-S02-M02

## topic
Parasitology

## subtopic
Protozoology

## microtopic
African trypanosomiasis

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## article_ids
${trypArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${teachingResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.85

## atomic_claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p1 Q5; printed answer p5
${teachingResourceId} | tier 2 | undated | p5 department teaching and highlighted answer

## original_wording
Q5 asks the diagnostic stage in a blood film after West African exposure, posterior cervical lymph-node enlargement, lethargy and drowsiness; printed key C, trypomastigote.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q5. Its printed C agrees with the department carrier's highlighted polymorphic trypomastigote. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The anonymous bank labels option C generically as trypomastigote; the department carrier supplies the more specific polymorphic qualifier used in the Draft explanation.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Protozoology topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for African trypanosomiasis diagnostic stage, polymorphic trypomastigote, West African sleeping-sickness blood film, Winterbottom sign diagnostic stage and the exact stem phrase returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: The first blood-stage slice has no necessary typed relation record; related reading points to the existing vector-transmission article.
`
}

function trypArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${trypArticleId}

## title
Diagnostic blood stage in West African trypanosomiasis

## arabic_title


## aliases
African sleeping sickness blood-film stage
Polymorphic trypomastigote in blood

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Protozoology

## microtopic
African trypanosomiasis

## nanotopic


## primary_node_id
DIS-PAR-T01

## secondary_node_ids
DIS-PAR-T03
SYS-FND-T05-S02-M02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## summary
A West African exposure history, posterior cervical lymph-node enlargement, lethargy and drowsiness point to African sleeping sickness. In the local curriculum carrier, the diagnostic blood-film stage is the polymorphic trypomastigote.

## sections
### Definition
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

### Mechanism
The question places the parasite between red blood cells rather than inside them. The tested task is morphological stage recognition in a blood film, not vector-stage transmission.

### Key determinants
West African travel, enlarged lymph nodes at the back of the neck, and later lethargy and drowsiness form the local sleeping-sickness pattern. The department note associates West Africa with Trypanosoma gambiense and labels the diagnostic blood form as polymorphic trypanosomes.

### Clinical significance
Reading the exposure, posterior cervical nodes and neurological symptoms together narrows the vignette before the blood-film stage is selected.

### Common misconceptions
Do not choose a distractor merely because it is another named kinetoplastid form. In this source pair, option C and the department carrier both identify the trypomastigote, with the department carrier adding the polymorphic qualifier.

## published_summary


## published_sections


## hold_these
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote.

## lose_the_mark
Ignoring the West African exposure, posterior cervical nodes and drowsiness when selecting the blood-film form.

## callout_evidence
### The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote.
Claims: CLM-INF-MUST-FHB1022-TRYP-01
Citations: CIT-INF-MUST-FHB1022-TRYP-01
Reviewed by: pending medical review

## related_concepts
${trypConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q05

## resource_ids
${teachingResourceId}
${assessmentResourceId}

## article_source_ids
${teachingResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## span_ids
SPN-INF-MUST-FHB1022-TRYP-01

## university_notes
must: Q5 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the MUST Parasitology Department Vectors of Disease Transmission carrier.

## annotations
### definition_of · ${trypConceptId}
Quote: The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.
Block: body
Id: ann-must-fhb1022-tryp-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, Prof. Heba Abdel Aaty, FHB102-2 Vectors of Disease Transmission, visually read p5.
Anonymous FHB102-2 MCQ bank, visually read p1 prompt Q5 and p5 printed answer C.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q5. The anonymous bank's generic trypomastigote answer agrees with the department carrier's more specific polymorphic trypomastigote.

## last_reviewed


## review_due


## notes
Second bounded question-led slice only. Q5 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: No image, audio or video is required to answer this text-only diagnostic-stage slice.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The existing cyclopropagative-transmission article is the necessary adjacent vector-biology reading link.
`
}

function trypQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q05

## title
After several months of safari in West Africa, a man developed enlarged lymph nodes at the back of his neck, followed later by lethargy and drowsiness. His blood film revealed parasitic stages between red blood cells. What is the diagnostic stage in the blood film?

## question
After several months of safari in West Africa, a man developed enlarged lymph nodes at the back of his neck, followed later by lethargy and drowsiness. His blood film revealed parasitic stages between red blood cells. What is the diagnostic stage in the blood film?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${teachingResourceId}.

## correct_answer
C

## answer_a
Epimastigote

## explanation_a
Incorrect. The department carrier does not identify epimastigote as the diagnostic blood-film form in this West African sleeping-sickness vignette.

## answer_b
Amastigote

## explanation_b
Incorrect. The local teaching note identifies polymorphic trypomastigotes, not amastigotes, as the diagnostic forms seen in blood.

## answer_c
Trypomastigote

## explanation_c
Correct. West African exposure, posterior cervical lymph-node enlargement, lethargy and drowsiness match the sleeping-sickness pattern in the department carrier. The parasite is described between red blood cells, and the highlighted diagnostic blood-film answer is the polymorphic trypomastigote. The anonymous bank prints C, so no answer override is made.

## answer_d
Promastigote

## explanation_d
Incorrect. The department carrier's highlighted blood-film answer is polymorphic trypomastigote rather than promastigote.

## topic
Parasitology

## subtopic
Protozoology

## main_concept
${trypConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.65

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## question_only_for
MUST_Y1

## library_ids
${trypArticleId}

## resource_ids
${assessmentResourceId}
${teachingResourceId}

## learning_objective
Identify the polymorphic trypomastigote as the diagnostic blood-film stage in a West African sleeping-sickness vignette.

## source_citation
FHB102-2 anonymous MCQ bank, p1, printed key p5 (Q5 = C); MUST Faculty of Medicine Parasitology Department, Vectors of Disease Transmission by Prof. Heba Abdel Aaty, p5.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: Q5 = C. The printed key agrees with the department carrier's highlighted polymorphic trypomastigote; no override was made.
`
}

function lymeClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-LYME-01

## concept_id
${lymeConceptId}

## subject
Lyme disease vector

## predicate
is_transmitted_by

## object
the hard tick Ixodes; the associated clinical pattern includes erythema chronicum migrans, large-joint arthritis and facial palsy

## display_text
Lyme disease is transmitted by the hard tick Ixodes; the associated clinical pattern includes erythema chronicum migrans, large-joint arthritis and facial palsy.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Borrelia burgdorferi
`
}

function lymeCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-LYME-01

## claim_id
CLM-INF-MUST-FHB1022-LYME-01

## resource_id
${ticksResourceId}

## evidence_role
local_curriculum

## support_span
Lyme disease; Erythema Chronicum Migrans; Arthritis of large joints; Facial paralysis (palsy); Hard tick (Ixodes); Borrelia burgdorferi; Bite of Ticks.

## locator_type
page

## locator_page
29

## locator_section
Spirochaetal infections — Lyme disease

## locator_detail
PDF page 29, Lyme-disease row spanning the infection, clinical-features, tick, causative-organism and mode-of-infection columns.

## context_note
The university-branded FHB102-2 teaching table directly matches the bank vignette's geography and clinical features and names hard tick Ixodes as the vector.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function lymeSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-LYME-01

## article_id
${lymeArticleId}

## section_id
art-inf-must-fhb1022-lyme-ixodes-definition

## text
Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.

## claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## citation_ids
CIT-INF-MUST-FHB1022-LYME-01
`
}

function lymeConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${lymeConceptId}

## label
Ixodes as the vector of Lyme disease

## canonical_key
parasitology.lyme-disease.ixodes-vector

## aliases
Lyme disease tick vector
Hard tick vector of Borrelia burgdorferi
Ixodes transmission of Lyme disease

## arabic_label


## arabic_aliases
[clear]

## definition
Lyme disease is transmitted by hard ticks of the genus Ixodes. The clinical pattern may begin with erythema migrans and later include large-joint arthritis and facial palsy.

## explicit_objective
Identify Ixodes as the vector when a Lyme disease vignette combines erythema migrans with later large-joint arthritis and facial palsy.

## pitfalls
Selecting another arthropod genus despite the characteristic Lyme disease sequence of erythema migrans, large-joint arthritis and facial palsy.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Tick-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## article_ids
${lymeArticleId}

## related_article_ids
${articleId}
${trypArticleId}

## related_concept_ids
[clear]

## resource_ids
${ticksResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q7; printed answer p5
${ticksResourceId} | tier 2 | undated | p29 direct university teaching table

## original_wording
Q7 describes erythema migrans in the USA followed by knee arthritis and facial palsy, then asks for the vector; printed key B, Ixodes.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q7. Its printed B agrees with the university teaching table's hard tick Ixodes. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The question bank misspells erythema migrans and several distractor genera; the Draft student-facing record standardises spelling without changing the tested meaning or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for Lyme disease Ixodes vector, erythema migrans with arthritis and facial palsy, Borrelia burgdorferi hard-tick vector, Ixodes transmission of Lyme disease and the exact stem phrase returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to the two previously authored local Parasitology articles.
`
}

function lymeArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${lymeArticleId}

## title
Ixodes and the clinical pattern of Lyme disease

## arabic_title


## aliases
Lyme disease vector
Hard tick transmission of Lyme disease

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Tick-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## summary
Lyme disease is transmitted by the hard tick Ixodes. A vignette that starts with erythema migrans and later develops large-joint arthritis and facial palsy is designed to identify that vector.

## sections
### Definition
Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.

### Mechanism
The tick bite transmits Borrelia burgdorferi. The question tests recognition of the vector from a time-linked clinical pattern rather than recognition from an image of the arthropod.

### Key determinants
The decisive features are exposure in the USA, an early erythema migrans lesion, later knee arthritis and facial palsy. Together they indicate Lyme disease, whose vector is Ixodes.

### Clinical significance
The rash-to-neurological-and-joint progression provides a compact way to distinguish Lyme disease from unrelated vector-borne syndromes.

### Common misconceptions
Do not select another named arthropod solely because it can transmit infection. First identify the Lyme disease syndrome, then choose its hard-tick vector, Ixodes.

## published_summary


## published_sections


## hold_these
Lyme disease is transmitted by the hard tick Ixodes.

## lose_the_mark
Failing to connect erythema migrans followed by large-joint arthritis and facial palsy with Lyme disease.

## callout_evidence
### Lyme disease is transmitted by the hard tick Ixodes.
Claims: CLM-INF-MUST-FHB1022-LYME-01
Citations: CIT-INF-MUST-FHB1022-LYME-01
Reviewed by: pending medical review

## related_concepts
${lymeConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${trypArticleId}: Diagnostic blood stage in West African trypanosomiasis

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q07

## resource_ids
${ticksResourceId}
${assessmentResourceId}

## article_source_ids
${ticksResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## span_ids
SPN-INF-MUST-FHB1022-LYME-01

## university_notes
must: Q7 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department ticks lecture.

## annotations
### definition_of · ${lymeConceptId}
Quote: Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.
Block: body
Id: ann-must-fhb1022-lyme-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission ticks lecture, visually read pp1 and 29–30.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q7 and p5 printed answer B.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q7. The anonymous bank's printed B agrees with the university teaching table's hard tick Ixodes.

## last_reviewed


## review_due


## notes
Third bounded question-led slice only. Q7 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The source lecture includes an illustrative erythema-migrans slide, but the question is answerable from its text and no student-facing image is required.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The two prior local Parasitology articles provide adjacent vector-transmission and parasite-stage reading.
`
}

function lymeQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q07

## title
While in the USA, a university student developed erythema migrans on his back. Three months later he developed knee arthritis and facial palsy. Which vector would be expected in the surrounding park bushes?

## question
While in the USA, a university student developed erythema migrans on his back. Three months later he developed knee arthritis and facial palsy. Which vector would be expected in the surrounding park bushes?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${ticksResourceId}.

## correct_answer
B

## answer_a
Ornithodoros

## explanation_a
Incorrect. This vignette combines erythema migrans, large-joint arthritis and facial palsy, so the expected vector is Ixodes rather than Ornithodoros.

## answer_b
Ixodes

## explanation_b
Correct. Erythema migrans followed by large-joint arthritis and facial palsy is the characteristic Lyme disease pattern. Lyme disease is transmitted by the hard tick Ixodes. Therefore, Ixodes is the best answer.

## answer_c
Triatoma

## explanation_c
Incorrect. The clinical sequence identifies Lyme disease, whose hard-tick vector is Ixodes rather than Triatoma.

## answer_d
Trombicula

## explanation_d
Incorrect. The Lyme disease pattern in this vignette points to Ixodes rather than Trombicula.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${lymeConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## question_only_for
MUST_Y1

## library_ids
${lymeArticleId}

## resource_ids
${assessmentResourceId}
${ticksResourceId}

## learning_objective
Identify Ixodes as the vector in a Lyme disease vignette combining erythema migrans with later large-joint arthritis and facial palsy.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q7 = B); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission ticks lecture, p29.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: Q7 = B. The printed key agrees with the university teaching table's hard tick Ixodes; no override was made. Source spelling was standardised without changing the answer.
`
}

function relapsingClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-RELAPSING-01

## concept_id
${relapsingConceptId}

## subject
Louse-borne epidemic relapsing fever

## predicate
is_transmitted_by

## object
the body louse Pediculus humanus corporis; Borrelia recurrentis causes recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period

## display_text
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis; Borrelia recurrentis causes recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Borrelia recurrentis
vector: Pediculus humanus corporis
`
}

function relapsingCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-RELAPSING-01

## claim_id
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Pediculus humanus corporis (Body louse); Epidemic relapsing fever; Borrelia recurrentis (Spirochaetes); crushing the louse on the skin or mucous membrane.

## locator_type
page

## locator_page
17

## locator_section
Order Anoplura — diseases transmitted by the body louse

## locator_detail
PDF page 17, body-louse disease table, epidemic-relapsing-fever row.

## context_note
The university-branded FHB102-2 teaching table directly names the body louse and Borrelia recurrentis for epidemic relapsing fever.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-RELAPSING-02

## claim_id
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Recurrent fever corresponding to spirochaetemia; 3–6 days febrile period followed by 5–10 days afebrile period; a single relapse characterizes louse-borne relapsing fever; headache, boneache and rash.

## locator_type
page

## locator_page
26

## locator_section
Louse-borne epidemic relapsing fever — clinical pattern

## locator_detail
PDF page 26, clinical bullets matching the Q8 time course and symptoms.

## context_note
The clinical slide directly matches the stem's spirochaetemia, fever interval, headache, bony aches and rash.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function relapsingSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-RELAPSING-01

## article_id
${relapsingArticleId}

## section_id
art-inf-must-fhb1022-epidemic-relapsing-fever-definition

## text
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.

## claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## citation_ids
CIT-INF-MUST-FHB1022-RELAPSING-01
CIT-INF-MUST-FHB1022-RELAPSING-02
`
}

function relapsingConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${relapsingConceptId}

## label
Body louse vector of epidemic relapsing fever

## canonical_key
parasitology.epidemic-relapsing-fever.body-louse-vector

## aliases
Louse-borne relapsing fever vector
Pediculus humanus corporis and Borrelia recurrentis
Epidemic relapsing fever transmission

## arabic_label


## arabic_aliases
[clear]

## definition
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Borrelia recurrentis produces recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period.

## explicit_objective
Identify the body louse as the vector when a Sudan epidemic vignette describes spirochaetemia with 3–6 febrile days followed by 5–10 afebrile days.

## pitfalls
Confusing louse-borne epidemic relapsing fever with flea-borne disease or selecting the head louse despite the explicit body-louse association.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Louse-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## article_ids
${relapsingArticleId}

## related_article_ids
${articleId}
${lymeArticleId}

## related_concept_ids
[clear]

## resource_ids
${liceResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.7

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q8; printed answer p5
${liceResourceId} | tier 2 | undated | pp17,25–26 direct university teaching

## original_wording
Q8 describes a Sudan epidemic with 3–6 febrile days, 5–10 afebrile days, headache, bony aches, rash and blood-film spirochaetes, then asks for the vector; printed key A, body louse.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q8. Its printed A agrees with the university lecture's Pediculus humanus corporis association. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source bank contains punctuation and grammar defects; the Draft student-facing record standardises them without changing the tested meaning, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for epidemic relapsing fever body-louse vector, Pediculus humanus corporis, Borrelia recurrentis, the fever interval and the exact clinical stem returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector-transmission articles.
`
}

function relapsingArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${relapsingArticleId}

## title
Body-louse transmission of epidemic relapsing fever

## arabic_title


## aliases
Louse-borne epidemic relapsing fever
Pediculus humanus corporis vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Louse-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## summary
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. A Sudan vignette with recurrent spirochaetemia and a 3–6-day febrile period followed by a 5–10-day afebrile period points to this vector.

## sections
### Definition
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.

### Mechanism
The causative spirochaete is Borrelia recurrentis. Transmission occurs when an infected body louse is crushed on skin or mucous membrane, releasing organisms from its body fluids.

### Key determinants
Sudan exposure, an epidemic warning, recurrent fever, headache, bony aches, rash and spirochaetes seen during the febrile period form the recognition pattern. The interval between fever and afebrile periods identifies louse-borne epidemic relapsing fever.

### Clinical significance
Recognising the syndrome first allows the vector to be selected from morphologically and epidemiologically unrelated arthropod distractors.

### Common misconceptions
Do not choose a flea merely because it is an ectoparasite. The epidemic relapsing-fever pattern in this question is specifically linked to the body louse.

## published_summary


## published_sections


## hold_these
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis.

## lose_the_mark
Missing the characteristic 3–6-day febrile and 5–10-day afebrile sequence in a spirochaetemia vignette.

## callout_evidence
### Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis.
Claims: CLM-INF-MUST-FHB1022-RELAPSING-01
Citations: CIT-INF-MUST-FHB1022-RELAPSING-01, CIT-INF-MUST-FHB1022-RELAPSING-02
Reviewed by: pending medical review

## related_concepts
${relapsingConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${lymeArticleId}: Ixodes and the clinical pattern of Lyme disease

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q08

## resource_ids
${liceResourceId}
${assessmentResourceId}

## article_source_ids
${liceResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## span_ids
SPN-INF-MUST-FHB1022-RELAPSING-01

## university_notes
must: Q8 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department lice, fleas and bugs lecture.

## annotations
### definition_of · ${relapsingConceptId}
Quote: Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.
Block: body
Id: ann-must-fhb1022-relapsing-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, visually read pp1,17 and 25–26.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q8 and p5 printed answer A.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q8. The anonymous bank's printed A agrees with the university teaching table's body louse.

## last_reviewed


## review_due


## notes
Fourth bounded question-led slice only. Q8 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission articles provide adjacent reading without requiring a new typed relation.
`
}

function relapsingQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q08

## title
A worker in Sudan developed 3–6 days of fever followed by a 5–10-day afebrile period, with headache, bony aches and rash. Blood-film examination during the febrile period showed vector-borne spirochaetes, and the Ministry of Health warned of an epidemic. What is the vector?

## question
A worker in Sudan developed 3–6 days of fever followed by a 5–10-day afebrile period, with headache, bony aches and rash. Blood-film examination during the febrile period showed vector-borne spirochaetes, and the Ministry of Health warned of an epidemic. What is the vector?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${liceResourceId}.

## correct_answer
A

## answer_a
Body louse

## explanation_a
Correct. Recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period is the louse-borne epidemic relapsing-fever pattern. Its vector is Pediculus humanus corporis, the body louse. Therefore, body louse is the best answer.

## answer_b
Human flea

## explanation_b
Incorrect. The epidemic relapsing-fever pattern is linked to the body louse rather than the human flea.

## answer_c
Rat flea

## explanation_c
Incorrect. The recurrent spirochaetemia and fever interval point to a body-louse vector, not a rat flea.

## answer_d
Head louse

## explanation_d
Incorrect. The vector of louse-borne epidemic relapsing fever is the body louse, not the head louse.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${relapsingConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## question_only_for
MUST_Y1

## library_ids
${relapsingArticleId}

## resource_ids
${assessmentResourceId}
${liceResourceId}

## learning_objective
Identify the body louse as the vector in a Sudan epidemic-relapsing-fever vignette with recurrent spirochaetemia and the characteristic fever interval.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q8 = A); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, pp17 and 25–26.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q8 = A. The printed key agrees with the university teaching table's body louse; no override was made. Source punctuation and grammar were standardised without changing the answer.
`
}

function plagueClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-PLAGUE-01

## concept_id
${plagueConceptId}

## subject
Human-flea transmission of plague

## predicate
is_transmitted_by

## object
the human flea Pulex irritans among humans; bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood

## display_text
Among humans, plague is transmitted by the human flea Pulex irritans; bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
disease: plague
vector: Pulex irritans
`
}

function plagueCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-PLAGUE-01

## claim_id
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Among humans, the disease is then transmitted by the human flea (Pulex).

## locator_type
page

## locator_page
51

## locator_section
Plague (black death)

## locator_detail
PDF page 51, final bullet naming the human flea Pulex as the vector among humans.

## context_note
The university-branded FHB102-2 lecture directly supports the printed Q9 answer.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-PLAGUE-02

## claim_id
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Bubonic (in lymph nodes) plague: bacilli in the inguinal lymph nodes and other lymph nodes and lymphatics. Septicaemic plague: bacilli in the blood.

## locator_type
page

## locator_page
54

## locator_section
Types of flea-transmitted plague

## locator_detail
PDF page 54, bullets distinguishing bubonic and septicaemic plague.

## context_note
The slide directly matches the stem's pubic-area lymph-node enlargement and septicaemia clues.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function plagueSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-PLAGUE-01

## article_id
${plagueArticleId}

## section_id
art-inf-must-fhb1022-plague-human-flea-definition

## text
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## citation_ids
CIT-INF-MUST-FHB1022-PLAGUE-01
CIT-INF-MUST-FHB1022-PLAGUE-02
`
}

function plagueConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${plagueConceptId}

## label
Human flea vector of plague among humans

## canonical_key
parasitology.plague.human-flea-vector

## aliases
Pulex irritans plague vector
Human-to-human plague flea vector
Human flea transmission of plague

## arabic_label


## arabic_aliases
[clear]

## definition
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## explicit_objective
Identify Pulex irritans as the human flea vector when a displacement-camp vignette describes buboes and septicaemia and specifically asks about transmission from human to human.

## pitfalls
Choosing Xenopsylla cheopis because it is the most efficient rat-to-human plague vector even though the question explicitly asks for transmission among humans.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Flea-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## article_ids
${plagueArticleId}

## related_article_ids
${relapsingArticleId}
${articleId}

## related_concept_ids
[clear]

## resource_ids
${liceResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q9; printed answer p5
${liceResourceId} | tier 2 | undated | pp51,54 direct university teaching

## original_wording
Q9 describes refugees near Libya's eastern border with fever, pubic-area lymph-node enlargement and some septicaemia, then asks for the human-to-human vector; printed key C, Pulex irritans.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q9. Its printed C agrees with the university lecture's statement that human flea Pulex transmits plague among humans. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source bank contains grammar defects; the Draft student-facing record standardises them without changing the tested meaning, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for human flea plague transmission, Pulex irritans plague vector, human-to-human plague flea, bubonic plague Pulex and septicaemic plague human flea returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector-transmission articles.
`
}

function plagueArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${plagueArticleId}

## title
Human-flea transmission of plague

## arabic_title


## aliases
Pulex irritans as a plague vector
Human-to-human plague vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Flea-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## summary
Among humans, plague is transmitted by the human flea Pulex irritans. A camp-associated vignette with inguinal buboes and septicaemia points to plague, while the phrase from human to human distinguishes the human flea from the rat flea.

## sections
### Definition
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

### Mechanism
The university lecture distinguishes two steps: rat flea Xenopsylla transmits plague from rats to humans, while human flea Pulex transmits it among humans. This question asks specifically about the second step.

### Key determinants
Fever with enlarged pubic-area or inguinal lymph nodes indicates the bubonic pattern, and septicaemia indicates blood involvement. The explicit human-to-human wording determines which flea option is being tested.

### Clinical significance
Recognising the transmission direction prevents a learner from choosing Xenopsylla merely because it is the best-known or most efficient plague vector.

### Common misconceptions
Do not treat all plague-vector questions as asking for Xenopsylla cheopis. The rat flea is central to rat-to-human transmission, whereas this item asks for transmission among humans.

## published_summary


## published_sections


## hold_these
Among humans, plague is transmitted by the human flea Pulex irritans.

## lose_the_mark
Ignoring the phrase from human to human and selecting the rat flea Xenopsylla cheopis.

## callout_evidence
### Among humans, plague is transmitted by the human flea Pulex irritans.
Claims: CLM-INF-MUST-FHB1022-PLAGUE-01
Citations: CIT-INF-MUST-FHB1022-PLAGUE-01, CIT-INF-MUST-FHB1022-PLAGUE-02
Reviewed by: pending medical review

## related_concepts
${plagueConceptId}

## related_articles
${relapsingArticleId}: Body-louse transmission of epidemic relapsing fever
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q09

## resource_ids
${liceResourceId}
${assessmentResourceId}

## article_source_ids
${liceResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## span_ids
SPN-INF-MUST-FHB1022-PLAGUE-01

## university_notes
must: Q9 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department lice, fleas and bugs lecture.

## annotations
### definition_of · ${plagueConceptId}
Quote: Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.
Block: body
Id: ann-must-fhb1022-plague-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, visually read pp1,51 and 54.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q9 and p5 printed answer C.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q9. The anonymous bank's printed C agrees with the university teaching statement that human flea Pulex transmits plague among humans.

## last_reviewed


## review_due


## notes
Fifth bounded question-led slice only. Q9 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission articles provide adjacent reading without requiring a new typed relation.
`
}

function plagueQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q09

## title
While living in a camp by the eastern border of Libya, a group of refugees developed fever and enlarged lymph nodes, especially in the pubic area; some developed septicaemia. Health authorities warned against stopping rodent control. What is the vector for transmission of this disease from human to human?

## question
While living in a camp by the eastern border of Libya, a group of refugees developed fever and enlarged lymph nodes, especially in the pubic area; some developed septicaemia. Health authorities warned against stopping rodent control. What is the vector for transmission of this disease from human to human?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${liceResourceId}.

## correct_answer
C

## answer_a
Ctenocephalus canis

## explanation_a
Incorrect. Ctenocephalus canis is the dog flea; the lecture identifies the human flea Pulex as the plague vector among humans.

## answer_b
Pediculus humanus capitis

## explanation_b
Incorrect. Pediculus humanus capitis is the head louse, not the human flea responsible for plague transmission among humans.

## answer_c
Pulex irritans

## explanation_c
Correct. The inguinal-node enlargement and septicaemia identify bubonic and septicaemic plague patterns. The question asks specifically for transmission from human to human, which the university lecture attributes to the human flea Pulex. Therefore, Pulex irritans is the best answer.

## answer_d
Xenopsylla cheopis

## explanation_d
Incorrect. Xenopsylla cheopis is the rat flea associated with transmission from rats to humans; the item asks for the vector among humans.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${plagueConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## question_only_for
MUST_Y1

## library_ids
${plagueArticleId}

## resource_ids
${assessmentResourceId}
${liceResourceId}

## learning_objective
Identify Pulex irritans as the human-to-human plague vector when a vignette describes inguinal buboes and septicaemia.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q9 = C); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, pp51 and 54.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q9 = C. The printed key agrees with the university teaching statement that human flea Pulex transmits plague among humans; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function paratransClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-PARATRANS-01

## concept_id
${paratransConceptId}

## subject
Paratransgenesis in vector control

## predicate
uses

## object
symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission

## display_text
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
method: biological vector control

---

# Item

## id
CLM-INF-MUST-FHB1022-MOSQ2-Q29-01

## concept_id
${paratransConceptId}

## subject
Purpose of paratransgenesis in mosquito control

## predicate
prevents

## object
parasite development and later disease transmission by preventing adult mosquito infection

## display_text
Paratransgenesis aims to block parasite or virus development in mosquitoes by using symbiont bacteria that prevent adult vector infection.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
source question: Absalam Part 2 Mosquitoes Q29
`
}

function paratransCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-PARATRANS-01

## claim_id
CLM-INF-MUST-FHB1022-PARATRANS-01

## resource_id
${mosquitoResourceId}

## evidence_role
local_curriculum

## support_span
Paratransgenesis: feeding the larval stage with symbiont bacteria that are capable of preventing adult mosquitoes from being infected by viruses and parasites and consequently no disease transmission.

## locator_type
page

## locator_page
44

## locator_section
Mosquito control — updated control measures

## locator_detail
PDF page 44, final bullet defining paratransgenesis.

## context_note
The university-branded FHB102-2 slide directly supports printed Q10 answer A.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-MOSQ2-Q29-01

## claim_id
CLM-INF-MUST-FHB1022-MOSQ2-Q29-01

## resource_id
${mosquitoResourceId}

## evidence_role
local_curriculum

## support_span
Paratransgenesis feeds symbiont bacteria to larvae to prevent adult mosquitoes from becoming infected by viruses and parasites and consequently prevent disease transmission.

## locator_type
page

## locator_page
44

## locator_section
Mosquito control — updated genetic control measures

## locator_detail
PDF page 44, final bullet defining the purpose and mechanism of paratransgenesis.

## context_note
The official MUST deck directly supports the unchanged Part 2 Mosquitoes Q29 answer A.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function paratransSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-PARATRANS-01

## article_id
${paratransArticleId}

## section_id
art-inf-must-fhb1022-paratransgenesis-definition

## text
Paratransgenesis is a biological vector-control approach that uses symbiont bacteria fed to the larval vector stage to prevent later pathogen infection and disease transmission.

## claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01

## citation_ids
CIT-INF-MUST-FHB1022-PARATRANS-01

---

# Item

## id
SPN-INF-MUST-FHB1022-MOSQ2-Q29-01

## article_id
${paratransArticleId}

## section_id
art-inf-must-fhb1022-paratransgenesis-definition

## text
Paratransgenesis blocks pathogen development in mosquitoes by preventing adult vector infection through larval-stage symbiont bacteria.

## claim_ids
CLM-INF-MUST-FHB1022-MOSQ2-Q29-01

## citation_ids
CIT-INF-MUST-FHB1022-MOSQ2-Q29-01
`
}

function paratransConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${paratransConceptId}

## label
Paratransgenesis using vector symbiont bacteria

## canonical_key
parasitology.vector-control.paratransgenesis-symbiont-bacteria

## aliases
Paratransgenesis vector control
Symbiont-bacteria vector control
Larval symbiont biological control

## arabic_label


## arabic_aliases
[clear]

## definition
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

## explicit_objective
Identify use of symbiont bacteria as the defining method in a paratransgenesis vector-control question.

## pitfalls
Confusing paratransgenesis with sterile-male genetic control, physical control, or the use of biological enemies such as Gambusia.

## concept_type
intervention

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Vector control

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## article_ids
${paratransArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${mosquitoResourceId}
${assessmentResourceId}
${absalamPart2AssessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.55

## exam_weight_by_year
MUST_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01
CLM-INF-MUST-FHB1022-MOSQ2-Q29-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q10; printed answer p5
${absalamPart2AssessmentResourceId} | tier 3 | 2025 | p8 Mosquitoes Q29; printed answer p9
${mosquitoResourceId} | tier 2 | undated | p44 direct university teaching

## original_wording
Q10 asks which vector-control method is paratransgenesis; printed key A, biological using symbiont bacteria.
Part 2 Mosquitoes Q29 asks the purpose of paratransgenesis in mosquito control; printed key A, to block parasite development in mosquitoes.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q10 or Part 2 Mosquitoes Q29. Both printed A answers agree with the university slide's direct symbiont-bacteria definition and purpose. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source uses a concise teaching definition; the Draft explanation does not extend beyond its stated mechanism.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for paratransgenesis symbiont bacteria, vector control paratransgenesis, genetically modified symbiont vector, paratransgenesis biological control and larval-stage symbiont bacteria returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to the prior vector-transmission article.
`
}

function paratransArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${paratransArticleId}

## title
Paratransgenesis in vector control

## arabic_title


## aliases
Symbiont-bacteria vector control
Paratransgenesis in mosquitoes

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Vector control

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
3

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## summary
Paratransgenesis is a biological vector-control approach using symbiont bacteria in the larval stage to prevent later infection of adult vectors and interrupt disease transmission.

## sections
### Definition
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

### Mechanism
The lecture describes feeding larvae symbiont bacteria capable of preventing adult mosquitoes from becoming infected. Preventing vector infection blocks the subsequent transmission step.

### Key determinants
The defining phrase is symbiont bacteria. Sterilising male vectors is presented separately as genetic control, while physical control and use of biological enemies are distinct methods.

### Clinical significance
The method targets vector competence rather than directly killing the adult vector, providing a recognition point for vector-control classification questions.

### Common misconceptions
Do not equate paratransgenesis with sterile-male techniques or with stocking larvivorous fish. The tested method specifically uses symbiont bacteria.

## published_summary


## published_sections


## hold_these
Paratransgenesis uses symbiont bacteria to prevent later vector infection and disease transmission.
Paratransgenesis blocks parasite development in mosquitoes by preventing adult vector infection.

## lose_the_mark
Selecting sterile-male genetic control instead of the symbiont-bacteria method.

## callout_evidence
### Paratransgenesis uses symbiont bacteria to prevent later vector infection and disease transmission.
Claims: CLM-INF-MUST-FHB1022-PARATRANS-01
Citations: CIT-INF-MUST-FHB1022-PARATRANS-01
Reviewed by: pending medical review

### Paratransgenesis blocks parasite development in mosquitoes by preventing adult vector infection.
Claims: CLM-INF-MUST-FHB1022-MOSQ2-Q29-01
Citations: CIT-INF-MUST-FHB1022-MOSQ2-Q29-01
Reviewed by: pending medical review

## related_concepts
${paratransConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q10
QST-MUST-FHB1022-PARA-MOSQ2-Q29

## resource_ids
${mosquitoResourceId}
${assessmentResourceId}
${absalamPart2AssessmentResourceId}

## article_source_ids
${mosquitoResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01
CLM-INF-MUST-FHB1022-MOSQ2-Q29-01

## span_ids
SPN-INF-MUST-FHB1022-PARATRANS-01
SPN-INF-MUST-FHB1022-MOSQ2-Q29-01

## university_notes
must: Q10 and Absalam Part 2 Mosquitoes Q29 come from governed FHB102-2 question carriers and are directly corroborated by the university Parasitology Department mosquito-control lecture.

## annotations
### definition_of · ${paratransConceptId}
Quote: Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.
Block: body
Id: ann-must-fhb1022-paratrans-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Arthropod Vectors for Disease Transmission mosquito lecture, visually read pp1 and 44.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q10 and p5 printed answer A.
Absalam101 Part 2, visually read p8 Mosquitoes Q29 and p9 printed answer A.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q10 or Part 2 Mosquitoes Q29. Both printed A answers agree with the university slide's symbiont-bacteria definition and purpose.

## last_reviewed


## review_due


## notes
Exact-ID-safe expansion preserves the full governed Q10 content and adds Part 2 Mosquitoes Q29. No held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission reading is linked without requiring a new typed relation.
`
}

function paratransQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q10

## title
Which method of vector control is paratransgenesis?

## question
Which method of vector control is paratransgenesis?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${mosquitoResourceId}.

## correct_answer
A

## answer_a
Biological control using symbiont bacteria

## explanation_a
Correct. The university lecture defines paratransgenesis as feeding the larval vector stage symbiont bacteria that prevent later infection of the adult vector by viruses and parasites. This interrupts disease transmission. Therefore, biological control using symbiont bacteria is the best answer.

## answer_b
Genetic sterilisation of male vectors

## explanation_b
Incorrect. Sterilisation of male vectors is a separate genetic-control method, not paratransgenesis.

## answer_c
A physical method of vector control

## explanation_c
Incorrect. Paratransgenesis is defined by use of symbiont bacteria rather than a physical control measure.

## answer_d
Use of biological enemies such as Gambusia

## explanation_d
Incorrect. Gambusia is a biological enemy used against larvae, but paratransgenesis specifically uses symbiont bacteria within the vector-control strategy.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${paratransConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
35

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.55

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## question_only_for
MUST_Y1

## library_ids
${paratransArticleId}

## resource_ids
${assessmentResourceId}
${mosquitoResourceId}

## learning_objective
Recognise use of symbiont bacteria as the defining feature of paratransgenesis in vector control.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q10 = A); MUST Faculty of Medicine Parasitology Department, FHB102-2 mosquito-control lecture, p44.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed source key: Q10 = A. The printed key agrees with the university teaching definition of paratransgenesis; no override was made.

---

# Item

## id
QST-MUST-FHB1022-PARA-MOSQ2-Q29

## title
What is the purpose of paratransgenesis in mosquito control?

## question
What is the purpose of paratransgenesis in mosquito control?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed verbatim from ${absalamPart2AssessmentResourceId}; printed key checked against ${mosquitoResourceId} without treating the student bank as an authenticated faculty key.

## correct_answer
A

## answer_a
To block parasite development in mosquitoes

## explanation_a
Correct. The official MUST lecture defines paratransgenesis as feeding symbiont bacteria to the larval stage so that adult mosquitoes do not become infected by viruses and parasites. Preventing adult infection blocks pathogen development and subsequent disease transmission. Therefore A is retained as the unchanged source-printed answer.

## answer_b
To sterilize mosquitoes

## explanation_b
Incorrect. Sterilising male mosquitoes is presented as a separate genetic-control measure. Paratransgenesis instead uses symbiont bacteria to prevent pathogen infection and development in the vector.

## answer_c
To attract mosquitoes to traps

## explanation_c
Incorrect. Light traps are a separate control method. Paratransgenesis changes vector competence through symbiont bacteria rather than attracting mosquitoes.

## answer_d
To increase mosquito lifespan

## explanation_d
Incorrect. The governed purpose is to prevent adult vector infection and interrupt transmission, not to prolong mosquito life. The supported answer is A.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${paratransConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
35

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.55

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## question_only_for
MUST_Y1

## library_ids
${paratransArticleId}

## resource_ids
${absalamPart2AssessmentResourceId}
${mosquitoResourceId}

## learning_objective
Identify blocking pathogen development in mosquitoes as the purpose of paratransgenesis.

## source_citation
Absalam101 Part 2, p8 Mosquitoes Q29, printed key p9 (Q29 = A); MUST Faculty of Medicine Parasitology Department mosquito-control lecture, p44.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed source key: Mosquitoes Q29 = A. The wording, option order and key are preserved exactly. This record remains Draft/local-only and is not authorised for upload.
`
}

function leishClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-LEISH-01

## concept_id
${leishConceptId}

## subject
Phlebotomus vector of cutaneous leishmaniasis

## predicate
is_transmitted_by

## object
Phlebotomus sandflies; Leishmania tropica causes a volcano-like cutaneous oriental sore in Sinai that may heal with an atrophic depigmented scar

## display_text
Cutaneous leishmaniasis in the Old World is transmitted by Phlebotomus sandflies; Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Leishmania tropica
vector: Phlebotomus
`
}

function leishCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-LEISH-01

## claim_id
CLM-INF-MUST-FHB1022-LEISH-01

## resource_id
${sandflyResourceId}

## evidence_role
local_curriculum

## support_span
Phlebotomus acts as an intermediate host of Leishmania species by cyclopropagative transmission; the infective promastigote is passed in the saliva of the infected sandfly.

## locator_type
page

## locator_page
13

## locator_section
Medical importance — disease transmission

## locator_detail
PDF page 13, direct Phlebotomus–Leishmania transmission statement.

## context_note
The university-branded FHB102-2 slide directly supports the vector in printed Q11.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-LEISH-02

## claim_id
CLM-INF-MUST-FHB1022-LEISH-01

## resource_id
${sandflyResourceId}

## evidence_role
local_curriculum

## support_span
Cutaneous leishmaniasis oriental sore due to Leishmania tropica: volcano-like ulcer, found in Sinai and the Middle East; untreated lesion leaves an atrophic and depigmented scar.

## locator_type
page

## locator_page
24

## locator_section
Cutaneous leishmaniasis — oriental sore

## locator_detail
PDF page 24, clinical and geographical pattern matching Q11.

## context_note
The slide directly matches the Sinai, volcano-like facial ulcer and residual-scar clues.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function leishSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-LEISH-01

## article_id
${leishArticleId}

## section_id
art-inf-must-fhb1022-cutaneous-leishmaniasis-vector-definition

## text
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. In Sinai, Leishmania tropica can produce a volcano-like oriental sore that heals with an atrophic depigmented scar.

## claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## citation_ids
CIT-INF-MUST-FHB1022-LEISH-01
CIT-INF-MUST-FHB1022-LEISH-02
`
}

function leishConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${leishConceptId}

## label
Phlebotomus vector of cutaneous leishmaniasis

## canonical_key
parasitology.cutaneous-leishmaniasis.phlebotomus-vector

## aliases
Sandfly vector of oriental sore
Leishmania tropica vector
Phlebotomus and cutaneous leishmaniasis

## arabic_label


## arabic_aliases
[clear]

## definition
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

## explicit_objective
Identify Phlebotomus as the vector when a Sinai vignette describes a volcano-like facial ulcer that heals with a scar.

## pitfalls
Selecting a mosquito genus despite the characteristic cutaneous-leishmaniasis geography, ulcer morphology and scar pattern.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Sandfly-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## article_ids
${leishArticleId}

## related_article_ids
${articleId}
${paratransArticleId}

## related_concept_ids
[clear]

## resource_ids
${sandflyResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.7

## exam_weight_by_year
MUST_Y1=0.7

## clinical_relevance
0.8

## academic_relevance
0.9

## weight_confidence
0.7

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q11; printed answer p5
${sandflyResourceId} | tier 2 | undated | pp13,24 direct university teaching

## original_wording
Q11 describes a 20-year-old woman from Sinai with a volcano-like facial ulcer that heals with a disfiguring scar, then asks for the vector; printed key D, Phlebotomus.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q11. Its printed D agrees with the university lecture's Phlebotomus–Leishmania teaching. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
Source grammar is standardised in the Draft question without changing the clinical clues, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for cutaneous leishmaniasis Phlebotomus, volcano ulcer sandfly, Leishmania tropica vector, Sinai oriental sore Phlebotomus and phlebotomine sand fly leishmaniasis returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector articles.
`
}

function leishArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${leishArticleId}

## title
Phlebotomus transmission of cutaneous leishmaniasis

## arabic_title


## aliases
Sandfly vector of oriental sore
Leishmania tropica and Phlebotomus

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Sandfly-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## summary
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. A Sinai facial ulcer with a raised volcano-like border followed by a residual scar points to Leishmania tropica and its sandfly vector.

## sections
### Definition
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

### Mechanism
Phlebotomus serves as the intermediate host of Leishmania species. The infective promastigote is passed in the saliva of an infected sandfly.

### Key determinants
Sinai exposure, a facial ulcer with raised border and undermined volcano-like base, and later scarring form the recognition pattern for the oriental sore in this source.

### Clinical significance
Recognising cutaneous leishmaniasis from lesion morphology and geography allows the sandfly vector to be selected from mosquito distractors.

### Common misconceptions
Do not select Aedes, Anopheles or Culex simply because they are familiar disease vectors. The source directly associates Leishmania with Phlebotomus.

## published_summary


## published_sections


## hold_these
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis.

## lose_the_mark
Missing the Sinai volcano-like oriental-sore pattern and selecting a mosquito vector.

## callout_evidence
### Phlebotomus sandflies transmit Old World cutaneous leishmaniasis.
Claims: CLM-INF-MUST-FHB1022-LEISH-01
Citations: CIT-INF-MUST-FHB1022-LEISH-01, CIT-INF-MUST-FHB1022-LEISH-02
Reviewed by: pending medical review

## related_concepts
${leishConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${paratransArticleId}: Paratransgenesis in vector control

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q11

## resource_ids
${sandflyResourceId}
${assessmentResourceId}

## article_source_ids
${sandflyResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## span_ids
SPN-INF-MUST-FHB1022-LEISH-01

## university_notes
must: Q11 comes from the governed FHB102-2 module-wide MCQ family and is directly corroborated by the university Parasitology Department sandfly lecture.

## annotations
### definition_of · ${leishConceptId}
Quote: Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.
Block: body
Id: ann-must-fhb1022-leish-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 sandfly lecture, visually read pp1,13 and 24.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q11 and p5 printed answer D.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q11. The anonymous bank's printed D agrees with the university Phlebotomus teaching.

## last_reviewed


## review_due


## notes
Seventh bounded question-led slice only. Q11 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The bank question is text-only; source images remain evidence and are not imported as student media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector reading is linked without requiring a new typed relation.
`
}

function leishQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q11

## title
A 20-year-old woman from Sinai presented with a volcano-like facial ulcer. The ulcer was self-limiting but left a disfiguring scar. Which vector should be combated?

## question
A 20-year-old woman from Sinai presented with a volcano-like facial ulcer. The ulcer was self-limiting but left a disfiguring scar. Which vector should be combated?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${sandflyResourceId}.

## correct_answer
D

## answer_a
Aedes

## explanation_a
Incorrect. Aedes is a mosquito genus; the Sinai volcano-like cutaneous-leishmaniasis pattern is transmitted by Phlebotomus sandflies.

## answer_b
Anopheles

## explanation_b
Incorrect. Anopheles is not the vector identified for the oriental-sore pattern in this university teaching source.

## answer_c
Culex

## explanation_c
Incorrect. Culex is a mosquito genus, whereas the lecture links Leishmania transmission to Phlebotomus.

## answer_d
Phlebotomus

## explanation_d
Correct. The Sinai exposure, volcano-like facial ulcer and residual scar match the lecture's cutaneous leishmaniasis oriental-sore pattern. The same lecture states that Phlebotomus transmits Leishmania. Therefore, Phlebotomus is the best answer.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${leishConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.7

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## question_only_for
MUST_Y1

## library_ids
${leishArticleId}

## resource_ids
${assessmentResourceId}
${sandflyResourceId}

## learning_objective
Identify Phlebotomus as the vector in a Sinai volcano-like cutaneous-leishmaniasis vignette.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q11 = D); MUST Faculty of Medicine Parasitology Department, FHB102-2 sandfly lecture, pp13 and 24.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q11 = D. The printed key agrees with the university teaching statement linking Phlebotomus to Leishmania; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function sarcoClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-SARCO-01

## concept_id
${sarcoConceptId}

## subject
Sarcophaga larva in wound myiasis

## predicate
is_identified_by

## object
a rounded posterior spiracle with incomplete or open peritreme and association with traumatic dermal wound myiasis

## display_text
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may cause traumatic dermal wound myiasis.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Sarcophaga
condition: traumatic dermal myiasis
`
}

function sarcoCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-SARCO-01

## claim_id
CLM-INF-MUST-FHB1022-SARCO-01

## resource_id
${myiasisResourceId}

## evidence_role
local_curriculum

## support_span
Sarcophagidae larvae have rounded posterior spiracles with incomplete peritreme and three longitudinal slits; Sarcophaga is listed under Sarcophagidae.

## locator_type
page

## locator_page
32

## locator_section
Family Calliphoridae and Sarcophagidae comparison

## locator_detail
PDF page 32, posterior-spiracle comparison table.

## context_note
The university slide directly supports the open or incomplete peritreme clue.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-SARCO-02

## claim_id
CLM-INF-MUST-FHB1022-SARCO-01

## resource_id
${myiasisResourceId}

## evidence_role
local_curriculum

## support_span
Traumatic dermal myiasis, where wounds or ulcers are invaded by larvae, includes Sarcophaga; a parallel rural open-peritreme question highlights Sarcophaga.

## locator_type
page

## locator_page
46

## locator_section
Cutaneous myiasis — traumatic dermal myiasis

## locator_detail
PDF page 46, wound-myiasis list; corroborated by the highlighted parallel item on p57.

## context_note
The slide directly matches the bed-sore wound setting and confirms Sarcophaga in the same identification pattern.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function sarcoSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-SARCO-01

## article_id
${sarcoArticleId}

## section_id
art-inf-must-fhb1022-sarcophaga-wound-myiasis-definition

## text
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.

## claim_ids
CLM-INF-MUST-FHB1022-SARCO-01

## citation_ids
CIT-INF-MUST-FHB1022-SARCO-01
CIT-INF-MUST-FHB1022-SARCO-02
`
}

function sarcoConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${sarcoConceptId}

## label
Sarcophaga larva in traumatic wound myiasis

## canonical_key
parasitology.myiasis.sarcophaga-incomplete-peritreme-wound

## aliases
Sarcophaga open-peritreme larva
Flesh-fly wound myiasis
Sarcophaga incomplete peritreme

## arabic_label


## arabic_aliases
[clear]

## definition
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.

## explicit_objective
Identify Sarcophaga larva when an open-peritreme larva is isolated from a bed sore or comparable wound in a rural patient.

## pitfalls
Confusing Sarcophaga's rounded incomplete peritreme with Calliphora's triangular complete peritreme or selecting a furuncular-myiasis larva.

## concept_type
diagnostic_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Myiasis

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## article_ids
${sarcoArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${myiasisResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.7

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-SARCO-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q12; printed answer p5
${myiasisResourceId} | tier 2 | 2022-04-01 | pp32,46,57 direct university teaching

## original_wording
Q12 asks for identification of an open-peritreme larva isolated from a bed sore in a rural patient; printed key D, Sarcophaga larva.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q12. Its printed D agrees with the university posterior-spiracle table, wound-myiasis list and parallel highlighted item. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The bank says open peritreme while the comparison table says incomplete peritreme; the university deck itself uses open peritreme in a parallel highlighted Sarcophaga item, so the source vocabulary is preserved as equivalent within this local curriculum.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for Sarcophaga open peritreme, wound myiasis Sarcophaga, bed-sore fly larvae myiasis, Sarcophaga incomplete peritreme and traumatic dermal myiasis Sarcophaga returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector material.
`
}

function sarcoArticles() {
  const sarcoIntroItems = introItems.filter((item) => item.article === 'sarcophaga')
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${sarcoArticleId}

## title
Sarcophaga identification in traumatic wound myiasis

## arabic_title


## aliases
Sarcophaga open-peritreme larva
Flesh-fly wound myiasis

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Myiasis

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## summary
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may cause traumatic dermal myiasis by invading wounds or ulcers. Sarcophagidae and Calliphoridae are associated with wound myiasis; Calliphoridae larvae have a contrasting triangular complete-peritreme posterior spiracle.

## sections
### Definition
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.
Sarcophagidae and Calliphoridae are fly families associated with wound myiasis.

### Mechanism
Sarcophaga is a flesh fly in Sarcophagidae. Its larvae can act as facultative sarcobiots, invading living wounded tissue after association with decaying matter.

### Key determinants
The open or incomplete peritreme distinguishes the rounded Sarcophagidae pattern from the triangular complete-peritreme Calliphoridae pattern. Calliphoridae larvae have triangular posterior spiracles with a complete peritreme and three long slits. Both families are associated with wound myiasis. A bed sore is a wound setting compatible with traumatic dermal myiasis.

### Clinical significance
Posterior spiracle morphology and the wound context together support larval identification in a myiasis specimen.

### Common misconceptions
Do not select Calliphora solely because it can invade wounds; its posterior spiracle has a complete rather than incomplete peritreme in the source table.

## published_summary


## published_sections


## hold_these
Sarcophaga larvae have a rounded incomplete or open posterior peritreme and may invade wounds.
${sarcoIntroItems.map((item) => item.claim).join('\n')}

## lose_the_mark
Ignoring posterior-spiracle morphology and selecting Calliphora despite its complete peritreme.
${sarcoIntroItems.map((item) => item.pitfalls).join('\n')}

## callout_evidence
### Sarcophaga larvae have a rounded incomplete or open posterior peritreme and may invade wounds.
Claims: CLM-INF-MUST-FHB1022-SARCO-01
Citations: CIT-INF-MUST-FHB1022-SARCO-01, CIT-INF-MUST-FHB1022-SARCO-02
Reviewed by: pending medical review
${sarcoIntroItems.map((item) => `
### ${item.claim}
Claims: ${introClaimId(item)}
Citations: ${introCitationId(item)}
Reviewed by: pending medical review`).join('\n')}

## related_concepts
${sarcoConceptId}
${sarcoIntroItems.map((item) => item.conceptId).join('\n')}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
ART-INF-MUST-FHB1022-MUSCID-IDENTIFICATION: Muscidae identification: Stomoxys and Musca
ART-INF-MUST-FHB1022-CLINICAL-SITE-MYIASIS: Clinical-site patterns of myiasis
ART-INF-MUST-FHB1022-FORENSIC-MYIASIS: Forensic use of myiasis-associated flies

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q12
${sarcoIntroItems.map(introQuestionId).join('\n')}

## resource_ids
${myiasisResourceId}
${assessmentResourceId}
${absalamAssessmentResourceId}

## article_source_ids
${myiasisResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-SARCO-01
${sarcoIntroItems.map(introClaimId).join('\n')}

## span_ids
SPN-INF-MUST-FHB1022-SARCO-01
${sarcoIntroItems.map(introSpanId).join('\n')}

## university_notes
must: Q12 comes from the governed FHB102-2 module-wide MCQ family and is directly corroborated by the university Parasitology Department flies and myiasis lecture.
must: Absalam Arthropoda Q19 and Q26 (global Q49 and Q56) retain literal wording and printed keys as student-bank evidence, checked against the same governed university deck.

## annotations
### definition_of · ${sarcoConceptId}
Quote: Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.
Block: body
Id: ann-must-fhb1022-sarco-001
${sarcoIntroItems.map((item) => `
### definition_of · ${item.conceptId}
Quote: ${item.claim}
Block: body
Id: ann-must-fhb1022-intro-q${String(item.q).padStart(2, '0')}`).join('\n')}

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Flies and Myiasis lecture, visually read pp1,32,46 and 57.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q12 and p5 printed answer D.
Absalam101 Part 1 revision bank, visually read pp14–18 for Arthropoda Q19/Q26 and their printed keys.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q12 or Absalam global Q49/Q56. Each printed key agrees with the governed university teaching; no student-authored answer was promoted to faculty authority.

## last_reviewed


## review_due


## notes
The prior Q12 record and every governed field are preserved. The approved Absalam global Q49/Q56 expansion adds only the wound-family and Calliphoridae comparison evidence, concepts, questions and reciprocal reading links. Held items have no student-facing projection, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The bank question is text-only; source images remain evidence and are not imported as student media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The prior cyclopropagative and Muscidae links are preserved. The new clinical-site and forensic links are reciprocal complete records in the same bounded import; no existing relation, question or governed field was removed.
`
}

function sarcoQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q12

## title
Which larva is most likely if larvae with an open peritreme are isolated from a bed sore in a patient with Alzheimer disease living in a rural area?

## question
Which larva is most likely if larvae with an open peritreme are isolated from a bed sore in a patient with Alzheimer disease living in a rural area?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${myiasisResourceId}.

## correct_answer
D

## answer_a
Calliphora larva

## explanation_a
Incorrect. Calliphora may invade wounds, but the source table gives it a triangular complete peritreme rather than the open or incomplete Sarcophagidae pattern.

## answer_b
Musca larva

## explanation_b
Incorrect. The university source links the open-peritreme rural wound pattern to Sarcophaga, not Musca.

## answer_c
Cordylobia larva

## explanation_c
Incorrect. Cordylobia is associated with furuncular or nodular myiasis rather than this wound-associated open-peritreme pattern.

## answer_d
Sarcophaga larva

## explanation_d
Correct. Sarcophagidae larvae have rounded posterior spiracles with an incomplete or open peritreme, and Sarcophaga is listed among causes of traumatic dermal wound myiasis. The lecture also highlights Sarcophaga in a parallel rural open-peritreme item. Therefore, Sarcophaga larva is the best answer.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${sarcoConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## question_only_for
MUST_Y1

## library_ids
${sarcoArticleId}

## resource_ids
${assessmentResourceId}
${myiasisResourceId}

## learning_objective
Identify Sarcophaga from an open-peritreme larva in a traumatic wound-myiasis setting.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q12 = D); MUST Faculty of Medicine Parasitology Department, FHB102-2 Flies and Myiasis lecture, pp32,46 and 57.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q12 = D. The printed key agrees with the university Sarcophaga posterior-spiracle and wound-myiasis teaching; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function baseCoverage() {
  return `# MUST FHB 102-2 — authoring progress

Generated by \`scripts/must/build-fhb102-2-authoring-slice.mjs\`. This file is an authoring ledger, not an upload instruction.

## Cumulative bounded question-led authoring

| Kind | Created | Status |
|---|---:|---|
| Evidence resources | 20 | local-only source records; Q24–Q31 lecture records retain explicit bounded visual-read pages |
| Claims | 8 | verified against local curriculum citations; independent review still owed |
| Citations | 13 | local curriculum |
| Article spans | 8 | linked to the clean-key claims |
| Concepts | 8 | under review / needs evidence |
| Articles | 8 | Draft |
| Questions | 8 | Draft |
| Question authoring holds | 23 | no student-facing record authored |
| Source-absent prompt dispositions | 1 | Q32 has no printed answer and remains un-authored |

The first eight slices authored Q1, Q5, Q7, Q8, Q9, Q10, Q11 and Q12 with printed keys unchanged. The ninth slice assesses Q13 and Q14 but authors neither: Q13 is ambiguous because two offered answers are supported, while Q14's printed A is clean but its required reciprocal article update cannot pass the focused dependency contract without replacing older live links or introducing unrelated article updates. The tenth through fourteenth slices confirm the printed keys for Q15 through Q19 against governed local teaching but apply dependency-contract holds because no honest, standalone-complete related-article dependency exists inside each bounded slice. The fifteenth and sixteenth slices hold Q20 and Q21 because the governed teaching deck directly contradicts their printed keys. The seventeenth slice confirms Q22 but holds it because its exact pending concept cannot be resolved locally without pulling a broad cross-university article/evidence dependency chain into this bounded slice. The eighteenth slice holds Q23 because its printed keyed option says “transcription and translocation of viral particles,” while the governed local handout teaches distinct Transcription and Translation stages and does not support that wording. The nineteenth slice confirms Q24's printed C but holds it because its fungal eukaryote identity overlaps a pending broad cross-university concept/article chain that cannot be safely imported or duplicated inside one question. The twentieth slice holds Q25 because the official MUST genetics lecture identifies phenotypic variation as reversible and not a mutation, directly contradicting printed B. The twenty-first slice holds Q26 because the official MUST antifungal lecture identifies nystatin as a polyene that binds ergosterol and creates fungal-membrane pores, directly contradicting printed A and supporting offered B. The twenty-second slice confirms Q27's printed A but holds it because the exact transformation concept already exists in a pending broad cross-university genetics article chain that cannot be safely imported, duplicated or overwritten inside one question. The twenty-third slice holds Q28 because the official MUST bacterial-growth lecture states that exacting heterotrophs require organic forms of both carbon and nitrogen, directly contradicting printed D and supporting offered A. The twenty-fourth slice confirms Q29's printed D but holds it because the Gram-positive thick-peptidoglycan identity already has two raw corpus candidates and an overlapping pending cross-university cell-wall chain that cannot be safely duplicated or overwritten inside one question. The twenty-fifth slice holds Q30 because the official MUST lecture explicitly describes plasmids as dispensable extrachromosomal DNA, directly contradicting printed C and supporting offered D. The twenty-sixth slice confirms Q31's printed C but holds it because the exact raw-corpus identity already exists and a standalone-complete article cannot satisfy the focused dependency contract without an artificial companion or unsafe external update. Q32 is separately reconciled as source-absent because neither normalized sibling prints an answer. No key was changed, no Q13–Q31 student-facing record was created, and no Q32 answer was inferred.

### Second-slice delta

- 0 new resources: the two exact source records were reused.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- +2 explicit key-conflict holds from the intervening source order: Q2 and Q4.

### Third-slice delta

- +1 evidence resource: the official university FHB102-2 ticks lecture used to check Q7.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q7's printed B agrees with the direct university teaching statement; Q2, Q3, Q4 and Q6 remain held.

### Fourth-slice delta

- +1 evidence resource: the official university FHB102-2 lice, fleas and bugs lecture used to check Q8.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q8's printed A agrees with the university body-louse teaching; Q2, Q3, Q4 and Q6 remain held.

### Fifth-slice delta

- 0 new resources: the governed assessment bank and university lice, fleas and bugs lecture were reused.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q9's printed C agrees with the university human-flea teaching; Q2, Q3, Q4 and Q6 remain held.

### Sixth-slice delta

- +1 evidence resource: the official university FHB102-2 mosquito-control lecture used to check Q10.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q10's printed A agrees with the university symbiont-bacteria definition; Q2, Q3, Q4 and Q6 remain held.

### Seventh-slice delta

- +1 evidence resource: the official university FHB102-2 sandfly lecture used to check Q11.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q11's printed D agrees with the university Phlebotomus teaching; Q2, Q3, Q4 and Q6 remain held.

### Eighth-slice delta

- +1 evidence resource: the official university FHB102-2 flies and myiasis lecture used to check Q12.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q12's printed D agrees with the university Sarcophaga posterior-spiracle and wound-myiasis teaching; Q2, Q3, Q4 and Q6 remain held.

### Ninth-slice delta

- +1 evidence resource: the locally supplied FHB102-2 anti-tuberculous pharmacology deck used to assess Q13 and check Q14.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q13/Q14 content was emitted.
- +2 explicit holds: Q13 is not a valid clean single-best-answer import because the ethambutol slide supports both optic neuritis and peripheral neuritis; Q14 is held on the authoring dependency contract even though its printed A agrees with the governed teaching.

### Tenth-slice delta

- +1 evidence resource: the locally supplied 22-page FHB102-2 30S protein-synthesis-inhibitor deck, fully rendered and visually read to assess Q15.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q15 content was emitted.
- +1 explicit dependency hold: Q15's unchanged printed **C, ototoxicity**, agrees with pages 17–20 of the governed teaching deck, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: four exact searches — \`streptomycin ototoxicity\`, \`aminoglycoside ototoxicity\`, \`eighth cranial nerve ototoxicity\`, and \`streptomycin nerve deafness\` — returned no existing live or pending record, so no rival concept ID was reused or minted for this held item.

### Eleventh-slice delta

- +1 evidence resource: the locally supplied 49-page FHB102-2 antimicrobial-protein-inhibitor deck, already fully governed and directly rechecked on pages 26–32 for Q16.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q16 content was emitted.
- +1 explicit dependency hold: Q16's unchanged printed **A, chloramphenicol**, is stated directly on page 31, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`chloramphenicol aplastic anemia\`, \`chloramphenicol adverse effect aplastic anemia\`, \`idiosyncratic chloramphenicol aplastic anemia\`, and \`chloramphenicol bone marrow toxicity\`, followed by the exact stem search, returned no existing live or pending record. No rival concept ID was reused or minted for this held item.

### Twelfth-slice delta

- +1 evidence resource: the locally supplied 17-page FHB102-2 50S protein-synthesis-inhibitor deck, fully rendered and visually read for Q17.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q17 content was emitted.
- +1 explicit dependency hold: Q17's unchanged printed **A, clindamycin**, is stated directly on page 12, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`clindamycin pseudomembranous colitis\`, \`clindamycin adverse effect pseudomembranous colitis\`, \`antibiotic causing pseudomembranous colitis\`, \`lincosamide pseudomembranous colitis\`, and the exact stem search returned no reusable live or pending record. A pending C. difficile disease-causation concept has a different atomic scope and was not substituted for this clindamycin adverse-effect item.

### Thirteenth-slice delta

- 0 new evidence resources: the governed 17-page 50S-inhibitor deck and 49-page antimicrobial-protein-inhibitor deck were reused.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q18 content was emitted.
- +1 explicit dependency hold: Q18's unchanged printed **B, chloramphenicol**, is stated directly on page 15 of the 50S deck and page 31 of the antimicrobial-protein-inhibitor deck, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`chloramphenicol grey baby syndrome\`, \`chloramphenicol gray baby syndrome\`, \`grey baby syndrome neonates\`, \`chloramphenicol neonatal toxicity\`, and the exact stem search returned no reusable live or pending record.

### Fourteenth-slice delta

- +1 evidence resource: the locally supplied 23-page FHB102-2 antimicrobial-nucleoprotein-inhibitor deck, previously fully governed and directly rechecked on pages 4–9 for Q19.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q19 content was emitted.
- +1 explicit dependency hold: Q19's unchanged printed **C, ciprofloxacin**, is supported by the deck's direct ciprofloxacin/fluoroquinolone identification and its statement that fluoroquinolones may damage growing cartilage and cause arthropathy, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`fluoroquinolone cartilage damage children\`, \`ciprofloxacin pediatric cartilage\`, \`ciprofloxacin cartilage damage children\`, \`fluoroquinolone growing cartilage arthropathy\`, and the exact stem search returned no reusable live or pending record.

### Fifteenth-slice delta

- +1 evidence resource: the locally supplied 40-page beta-lactam and vancomycin deck, previously fully governed and directly rechecked on pages 37–39 for Q20.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q20 content was emitted.
- +1 explicit key-conflict hold: Q20's anonymous printed key is **B, teicoplanin**, while the governed teaching deck places red man syndrome under **vancomycin**, which the bank offers as option C. The printed key was preserved as source evidence and was neither corrected nor taught.
- Search gate: \`vancomycin red man syndrome\`, \`red man syndrome glycopeptide\`, \`vancomycin infusion reaction\`, \`vancomycin histamine flushing\`, and the exact printed-key stem search returned no reusable live or pending record.

### Sixteenth-slice delta

- 0 new evidence resources: the governed 40-page beta-lactam and vancomycin deck was reused and pages 37–39 were visually rechecked.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q21 content was emitted.
- +1 explicit key-conflict hold: Q21's anonymous printed key is **C, piperacillin**, while the governed teaching deck identifies **metronidazole or oral vancomycin** for drug-induced pseudomembranous colitis; the bank offers metronidazole as option B. The printed key was preserved as source evidence and was neither corrected nor taught.
- Search gate: \`Clostridium difficile associated diarrhea treatment metronidazole\`, \`pseudomembranous colitis metronidazole treatment\`, \`antibiotic associated diarrhea oral vancomycin metronidazole\`, \`C difficile diarrhea antibiotic treatment\`, and the exact printed-key stem search returned no reusable live or pending record.

### Seventeenth-slice delta

- 0 new evidence resources: the governed 23-page antimicrobial-nucleoprotein-inhibitor deck was reused, and the bank's page-break option field plus teaching pages 4–5 were visually rechecked.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q22 content was emitted.
- +1 explicit dependency hold: Q22's unchanged printed **C, inhibits DNA gyrase**, agrees with the governed teaching deck. Manual collision review found the exact pending concept \`CON-FND-014D200ED96498\`; it was reused as the identity decision and no duplicate ID was minted, but it is not live and depends on a broad pending Alexandria article/evidence chain that cannot be safely imported or overlaid inside this one-question MUST slice.
- Search gate: \`fluoroquinolone DNA gyrase\`, \`ciprofloxacin mechanism of action\`, \`fluoroquinolone topoisomerase inhibition\`, \`DNA gyrase inhibitor fluoroquinolone\`, and the exact stem search returned no live match. The manual all-pending-doc collision check found the exact pending concept above and its pending broad article \`ART-FND-DNA-REPLICATION-REPAIR-PCR\`; neither was silently duplicated or imported.

### Eighteenth-slice delta

- +1 evidence resource: the locally supplied three-page \`102 Basic Virology.pdf\` handout, fully rendered and visually read for Q23.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q23 content was emitted.
- +1 explicit wording/key-form hold: Q23's anonymous printed key is **C**, whose option reads “transcription and translocation of viral particles.” The governed handout instead lists **Transcription** and **Translation** as distinct viral-growth-cycle stages and describes synthesis through transcription and translation. It does not support “translocation of viral particles.” The printed option and key were preserved as source evidence and were neither corrected nor taught through a silent substitution.
- Search gate: \`viral mRNA transcription translation\`, \`virus mRNA production replication\`, \`viral replication transcription\`, \`viral protein synthesis mRNA\`, and the exact stem search returned no exact reusable item. Manual corpus review found related live KAU concepts for Baltimore classification and genome-specific mRNA transcription, but none represents or legitimises the malformed phrase “translocation of viral particles.” Manual pending-doc review also found the triage entry for this same opening-family item, mislabeled there as Q24. No new identity was minted for the held item.

### Nineteenth-slice delta

- +1 bounded evidence resource: pages 1–7 of the official 34-page MUST General Mycology lecture were rendered and visually read for Q24; the remaining pages are not claimed as visually governed by this slice.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q24 content was emitted.
- +1 explicit dependency/identity hold: Q24's unchanged printed **C, Eukaryotic cell with true nucleus**, is stated directly on page 6 and reinforced by the fungi-versus-bacteria table on page 7. Manual corpus review found the exact raw candidate \`concept_a4992569b1751dff3ed9ded3\`, while the pending broad canonical concept \`CON-FND-54F59770FE61B9\` and article \`ART-FND-FUNGI\` already carry the general fungi identity and its eukaryotic claim. Minting a separate MUST concept would risk duplication, while importing or overlaid-updating that broad cross-university chain would exceed this one-question slice.
- Search gate: \`fungi eukaryotic true nucleus\`, \`fungi versus bacteria eukaryotic prokaryotic\`, \`fungal cells have true nucleus\`, \`fungi differentiated from bacteria true nucleus\`, and the exact stem search returned no exact tool match. The manual corpus and pending-batch review above supplied the identity decision, so no new concept ID was minted.

### Twentieth-slice delta

- +1 bounded evidence resource: all 53 pages of the official MUST Bacterial Genetics lecture were rendered to locate the item, and pages 1, 4, 24–26 and 30 were directly visually read; other pages are not claimed as visually governed by this slice.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q25 content was emitted.
- +1 explicit key-conflict hold: Q25's anonymous bank prints **B, A form of mutation**. The official lecture defines phenotypic variation on pp25–26 as reversible, non-heritable and environmentally affected, places mutation under genotypic variation on p25 and calls mutation heritable and irreversible on p30. Offered option **C, Reversible** agrees with the lecture, but no replacement answer was imported and printed B remains source evidence only.
- Search gate: \`phenotypic variation reversible\`, \`bacterial phenotypic variation environmental\`, \`phenotypic variation not heritable\`, \`genotypic versus phenotypic variation\`, and the exact stem search found the pending ASU concept \`CON-INF-3576B51A9E5B1B\`, whose definition and source-keyed questions also identify reversibility. That corroboration was recorded but was not used to overwrite the MUST bank key or create a duplicate identity.

### Twenty-first-slice delta

- +1 bounded evidence resource: pages 1 and 18 of the official 26-page MUST Antifungal Drugs lecture were rendered and visually read for Q26; the other pages are not claimed as visually governed by this slice.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q26 content was emitted.
- +1 explicit key-conflict hold: Q26's anonymous bank prints **A, Inhibit viral RNA synthesis**. The official lecture identifies nystatin as a polyene antifungal and states that it creates pores in the fungal cell membrane by binding ergosterol, directly supporting offered **B, interferes with fungal cell membrane function**. No replacement answer was imported and printed A remains source evidence only.
- Search gate: \`nystatin fungal cell membrane\`, \`nystatin ergosterol pores\`, \`polyene antifungal membrane function\`, \`nystatin mechanism of action\`, and the exact stem returned no tool match. Manual corpus review found existing cross-university polyene and nystatin mechanism content, including a pending ASU polyene concept and indexed nystatin mechanism observations; these corroborate the conflict but were not imported, duplicated or used to overwrite the MUST bank key.

### Twenty-second-slice delta

- 0 new evidence resources: the governed 53-page official MUST Bacterial Genetics lecture was reused, and pages 31, 33 and 35 were directly visually read for Q27.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q27 content was emitted.
- +1 explicit dependency/identity hold: Q27's unchanged printed **A, Free bacteria DNA transfer to other bacteria**, agrees with the lecture's definition of transformation as transfer of free (naked) DNA from a donor to a recipient and its natural-transformation statement that dying bacteria release free DNA which other bacteria take up. Manual collision review found the exact pending concept \`CON-INF-42D77BF4AB3ADD\` and its broad pending ASU article \`ART-INF-BACTERIAL-GENETICS-CONJUGATION-LYSOGENY\`. A duplicate MUST identity was not minted, and the cross-university chain was not imported or overwritten inside this bounded question slice.
- Search gate: \`bacterial transformation naked DNA\`, \`transformation free DNA bacteria\`, \`natural bacterial transformation competence\`, \`free bacterial DNA transfer to another bacterium\`, and the exact stem returned no tool match. Manual pending-doc review supplied the exact identity decision above.

### Twenty-third-slice delta

- +1 bounded evidence resource: pages 1 and 25–26 of the official 40-page MUST Bacterial Growth lecture were rendered and visually read for Q28; the other pages are not claimed as visually governed by this slice.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q28 content was emitted.
- +1 explicit key-conflict hold: Q28's anonymous bank prints **D, Oxygen**. The official lecture states that exacting heterotrophic bacteria require both organic forms of carbon and nitrogen for growth, directly supporting offered **A, Organic source of carbon and nitrogen**. No replacement answer was imported and printed D remains source evidence only.
- Search gate: \`exacting heterotrophic bacteria organic carbon nitrogen\`, \`exacting bacteria nutritional requirements\`, \`heterotrophic bacteria both organic carbon and nitrogen\`, \`fastidious bacteria organic carbon nitrogen\`, and the exact stem returned no tool match. Manual pending-doc review found exact pending ASU concept \`CON-INF-9386E80307EC94\` and article \`ART-INF-GROWTH-REQUIREMENTS-NUTRITION\`; they independently preserve the organic-carbon-and-nitrogen requirement but were not imported, duplicated or used to overwrite the MUST key.

### Twenty-fourth-slice delta

- +1 bounded evidence resource: pages 1 and 28–29 of the official 42-page MUST Introduction to Microbiology and Bacterial Cell Structure lecture were rendered and visually read for Q29; the other pages are not claimed as visually governed by this slice.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q29 content was emitted.
- +1 explicit dependency/identity hold: Q29's unchanged printed **D, Have cell wall containing multiple layers of peptidoglycan**, agrees with the lecture's statement that Gram-positive bacteria have a thick peptidoglycan layer of 40 sheets, versus 1–2 sheets in Gram-negative bacteria. Manual collision review found raw corpus candidates \`concept_5590f9ee7f2d30a322063e69\` and \`concept_c8d5af408cd7b5e10a8ed7d9\`, plus overlapping pending ASU concept \`CON-INF-7E3B831D71A008\` and broad article \`ART-INF-CELL-WALL-OUTER-MEMBRANE\`. No duplicate identity was minted and no cross-university chain was imported or overwritten.
- Search gate: \`gram positive thick peptidoglycan cell wall\`, \`gram positive multiple peptidoglycan layers\`, \`gram positive cell wall composition\`, \`thick peptidoglycan gram positive bacteria\`, and the exact stem returned no tool match. Manual corpus and pending-doc review supplied the identity decision above.

### Twenty-fifth-slice delta

- 0 new evidence resources: the governed 42-page official MUST Introduction to Microbiology and Bacterial Cell Structure lecture was reused, and page 36 was directly visually read for Q30.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q30 content was emitted.
- +1 explicit key-conflict hold: Q30's anonymous bank prints **C, Necessary for the life of bacterial cell**, while the official lecture identifies plasmids as extrachromosomal DNA and explicitly calls them dispensable, "not necessary for the life of bacterial cell." The bank offers **D, Extrachromosomal circular DNA**, which agrees with the teaching statement. No replacement answer was imported and printed C remains source evidence only.
- Search gate: \`plasmid extrachromosomal DNA\`, \`plasmid dispensable not necessary bacterial life\`, \`bacterial plasmid circular extrachromosomal DNA\`, \`plasmid characteristic bacterial cell\`, and the exact stem returned no tool match. Manual corpus review found related plasmid/genetics material but no reusable exact item; this corroboration was not used to overwrite the MUST bank key or mint a student-facing identity.

### Twenty-sixth-slice and terminal-family reconciliation delta

- 0 new evidence resources: the governed 42-page official MUST Introduction to Microbiology and Bacterial Cell Structure lecture was reused, and pages 15 and 34 were directly visually read for Q31.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q31 or Q32 content was emitted.
- +1 explicit dependency/identity hold: Q31's unchanged printed **C, Has one circular chromosome**, agrees with the lecture's direct statement that a prokaryotic cell has one single circular chromosome. Manual collision review found the exact raw corpus candidate \`concept_534bb04ee17ac9b528d81f47\`. No duplicate concept was minted, and no artificial companion article or unsafe external article update was introduced to satisfy the focused sibling-dependency rule.
- +1 source-absent disposition, separate from the hold count: Q32 is a complete four-option prompt about bacterial relatedness and G-C ratio, but neither normalized sibling prints a Q32 answer. No key was inferred from teaching evidence or from the option wording, and no student-facing record was authored.
- Search gate for Q31: \`bacterial cell one circular chromosome\`, \`bacteria single circular chromosome\`, \`prokaryotic cell circular chromosome\`, \`bacterial nucleoid single chromosome\`, and the exact stem returned no tool match. Manual corpus review supplied the exact raw-candidate identity above. Q32 did not enter the authoring search gate because the source answer is absent.

## Explicit authoring holds

- **Q2 is held.** The anonymous bank prints **B, filariform**, while the malaria-pattern stem asks the stage inoculated by the vector and the department carrier states **I.S. → sporozoite** on p6. No Q2 student-facing record was authored, and no replacement answer was imported.
- **Q3 is held.** The anonymous bank prints **C, propagative**, while the stem asks transmission "to offspring mosquitoes," which indicates a cross-generation/transovarian mechanism. The department carrier separately records a transovarian vector example on p6. No Q3 student-facing record was authored, and no replacement answer was imported.
- **Q4 is held.** The anonymous bank prints **C, leishmaniasis**, while its Texas, severe haemolysis, dark urine and cross-shaped tetrad description is identified as **babesiosis** by the department carrier on p6. No Q4 student-facing record was authored, and no replacement answer was imported.
- **Q6 is held.** The anonymous bank prints **A, intermediate host**, while the MUST Parasitology Department carrier identifies female Anopheles as **D.H.** on p4 and states "Female anopheles (D.H), Soldier (I.H)" on p6. No Q6 student-facing record was authored, and no replacement answer was imported.
- **Q13 is held.** The anonymous bank prints **A, retrobulbar neuritis**, while its single-best-answer options also include **D, peripheral neuritis**. The local ethambutol adverse-effects slide on p22 explicitly lists optic neuritis and peripheral neuritis, so two offered answers are supported by the governed teaching evidence. No Q13 student-facing record was authored, and the printed key was not corrected or replaced.
- **Q14 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, pyridoxine**, and the local isoniazid slides on pp15–16 support vitamin B6 depletion and pyridoxine co-administration. The necessary reciprocal link to live article \`ART-INF-TOP-65C8E5125F\` could not be added as a standalone-complete update while keeping that article's four older governed related-article links and satisfying the focused sibling-dependency validator. No unrelated article was substituted, no existing university overlay was replaced, and no Q14 question, concept, claim, span or article record was authored.
- **Q15 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, ototoxicity**. The local teaching deck explicitly lists streptomycin among aminoglycosides on p17, describes aminoglycoside concentration in inner-ear peri- and endolymph leading to ototoxicity on p18, and names eighth-cranial-nerve damage under aminoglycoside adverse effects on p20. The key therefore remains unchanged. Four required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q15 question, concept, claim, citation, span or article record was authored.
- **Q16 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, chloramphenicol**. The governed antimicrobial-protein-inhibitor deck explicitly lists aplastic anemia under chloramphenicol adverse effects on p31. A separate 17-page local 50S-inhibitor deck uses broader bone-marrow-depression wording; that wording was treated only as corroboration and was not rewritten into the stem's exact term. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q16 question, concept, claim, citation, span or article record was authored.
- **Q17 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, clindamycin**. The governed local 50S-inhibitor deck directly lists pseudomembranous colitis and diarrhea under clindamycin adverse effects on p12. Five required searches found no reusable record; an existing pending C. difficile disease-causation concept does not represent this narrower drug-adverse-effect scope. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q17 question, concept, claim, citation, span or article record was authored.
- **Q18 is held on the dependency contract, not on its printed key.** The anonymous bank prints **B, chloramphenicol**. The governed local 50S-inhibitor deck explicitly lists grey baby syndrome in neonates under chloramphenicol adverse effects on p15 and explains reduced neonatal drug clearance; the independently governed antimicrobial-protein-inhibitor deck also lists gray baby syndrome under chloramphenicol adverse effects on p31. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q18 question, concept, claim, citation, span or article record was authored.
- **Q19 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, ciprofloxacin**. The governed antimicrobial-nucleoprotein-inhibitor deck identifies ciprofloxacin as a fluoroquinolone on pp4 and 7, then states on p9 that fluoroquinolones may damage growing cartilage and cause arthropathy. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q19 question, concept, claim, citation, span or article record was authored.
- **Q20 is held.** The anonymous bank prints **B, teicoplanin**, while its options also include **C, vancomycin**. The governed beta-lactam and vancomycin teaching deck explicitly places red man syndrome under vancomycin adverse effects on p38, attributes it to histamine release with rapid infusion, and describes prevention by slow infusion and antihistamine pretreatment. No Q20 student-facing record was authored, and the printed key was not corrected, replaced or silently taught as vancomycin.
- **Q21 is held.** The anonymous bank prints **C, piperacillin**, while its options also include **B, metronidazole**. The governed beta-lactam and vancomycin teaching deck identifies metronidazole or oral vancomycin as treatment for drug-induced pseudomembranous colitis on p39. No Q21 student-facing record was authored, and the printed key was not corrected, replaced or silently taught as metronidazole.
- **Q22 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, inhibits DNA gyrase**. Its stem ends on p3 and the four-option field continues on p4; both pages were visually read as one item. The governed antimicrobial-nucleoprotein-inhibitor deck labels fluoroquinolones as DNA-gyrase inhibitors on p4 and diagrams DNA gyrase/topoisomerase IV at the replication fork on p5. The exact concept already exists pending as \`CON-FND-014D200ED96498\`, but that record points to the broad pending Alexandria article \`ART-FND-DNA-REPLICATION-REPAIR-PCR\` and unresolved Alexandria evidence. Importing or updating that chain here would exceed this bounded MUST slice and risk clobbering another university's complete record. No duplicate concept was minted and no Q22 question, concept, claim, citation, span or article record was authored.
- **Q23 is held.** The anonymous bank asks when viral mRNA production occurs and prints **C, transcription and translocation of viral particles**. The governed three-page Basic Virology handout lists stage 4 as **Transcription** and stage 5 as **Translation**, then describes synthesis of viral nucleic acid and proteins by transcription and translation. It never teaches “translocation of viral particles.” Because importing Q23 would require silently rewriting the keyed option, no Q23 student-facing record was authored and the printed key was not corrected or replaced.
- **Q24 is held on the dependency/identity contract, not on its printed key.** The anonymous bank prints **C, Eukaryotic cell with true nucleus**. The official MUST mycology lecture states on p6 that fungi are eukaryotic organisms containing a true nucleus and on p7 contrasts eukaryotic fungi with prokaryotic bacteria lacking a nuclear membrane. The unchanged key is therefore clean. However, the exact corpus candidate \`concept_a4992569b1751dff3ed9ded3\` already exists and the pending broad concept/article pair \`CON-FND-54F59770FE61B9\` / \`ART-FND-FUNGI\` already represents fungi and its eukaryotic claim. No duplicate MUST concept was minted, no cross-university pending chain was imported or overwritten, and no Q24 student-facing record was authored.
- **Q25 is held.** The anonymous bank prints **B, A form of mutation**, while the same option field offers **C, Reversible**. The official MUST Bacterial Genetics lecture defines phenotypic variation as a reversible, non-heritable, environmentally affected change on pp25–26, places mutation and gene transfer under genotypic variation on p25 and describes mutation as heritable and irreversible on p30. The pending exact ASU concept \`CON-INF-3576B51A9E5B1B\` independently preserves the same distinction. No Q25 student-facing record was authored, and printed B was not corrected, replaced or silently taught as C.
- **Q26 is held.** The anonymous bank prints **A, Inhibit viral RNA synthesis**, while its options also include **B, interferes with fungal cell membrane function**. The official MUST Antifungal Drugs lecture identifies nystatin as a polyene on p18 and states that polyenes bind fungal-membrane ergosterol and create pores. No Q26 student-facing record was authored, and printed A was not corrected, replaced or silently taught as B.
- **Q27 is held on the dependency/identity contract, not on its printed key.** The anonymous bank prints **A, Free bacteria DNA transfer to other bacteria**. The official MUST Bacterial Genetics lecture defines transformation on p33 as transfer of free (naked) DNA from a donor to a recipient and states on p35 that dying bacteria release free DNA which other bacteria take up in nature. The unchanged key is therefore clean. However, exact pending concept \`CON-INF-42D77BF4AB3ADD\` and broad pending article \`ART-INF-BACTERIAL-GENETICS-CONJUGATION-LYSOGENY\` already represent transformation within a multi-mechanism ASU genetics chain. No duplicate concept was minted, no cross-university chain was imported or overwritten, and no Q27 student-facing record was authored.
- **Q28 is held.** The anonymous bank prints **D, Oxygen**, while its options also include **A, Organic source of carbon and nitrogen**. The official MUST Bacterial Growth lecture states on p25 that exacting heterotrophic bacteria require both organic forms of carbon and nitrogen for growth. Pending ASU concept \`CON-INF-9386E80307EC94\` independently preserves the same requirement. No Q28 student-facing record was authored, and printed D was not corrected, replaced or silently taught as A.
- **Q29 is held on the dependency/identity contract, not on its printed key.** The anonymous bank prints **D, Have cell wall containing multiple layers of peptidoglycan**. The official MUST Introduction to Microbiology and Bacterial Cell Structure lecture states on p28 that Gram-positive bacteria have a thick peptidoglycan layer of 40 sheets and 50% of wall thickness, while Gram-negative bacteria have only 1–2 sheets. The unchanged key is therefore clean. However, two raw corpus candidates already express the thick-peptidoglycan identity and pending ASU concept/article \`CON-INF-7E3B831D71A008\` / \`ART-INF-CELL-WALL-OUTER-MEMBRANE\` overlap it inside a broader wall-composition chain. No duplicate concept was minted, no cross-university chain was imported or overwritten, and no Q29 student-facing record was authored.
- **Q30 is held.** The anonymous bank prints **C, Necessary for the life of bacterial cell**, while its options also include **D, Extrachromosomal circular DNA**. The official MUST Introduction to Microbiology and Bacterial Cell Structure lecture states on p36 that plasmids are extrachromosomal DNA, occur in both Gram-positive and Gram-negative bacteria, and are dispensable—"not necessary for the life of bacterial cell." No Q30 student-facing record was authored, and printed C was not corrected, replaced or silently taught as D.
- **Q31 is held on the dependency/identity contract, not on its printed key.** The anonymous bank prints **C, Has one circular chromosome**. The official MUST Introduction to Microbiology and Bacterial Cell Structure lecture states on p15 that a prokaryotic cell has one single circular chromosome and identifies the nucleoid's single double-stranded DNA chromosome on p34. The unchanged key is therefore clean. However, exact raw corpus candidate \`concept_534bb04ee17ac9b528d81f47\` already expresses the same identity, and a new standalone Draft article cannot satisfy the focused related-article contract without an artificial companion or an unsafe update outside this bounded item. No duplicate concept was minted and no Q31 question, claim, citation, span or article record was authored.

Q2, Q3, Q4, Q6, Q13, Q20, Q21, Q23, Q25, Q26, Q28 and Q30 require an authorised medical reviewer to resolve the item disposition before authoring: retain verbatim with a formal source-key correction, rewrite and retire the source wording, or exclude the item. Q14 through Q19 may proceed only when their article dependencies can be represented honestly without clobbering governed live links, inventing unrelated content or weakening the focused validator.

Q22 may proceed only after its exact pending concept and broad article/evidence dependencies are made live or can be represented as standalone-complete cross-university updates without overwriting Alexandria provenance.

Q24 may proceed only after the fungal eukaryote identity is resolved against the pending broad fungi concept/article chain or can be represented as a standalone-complete update without duplicating or overwriting its existing provenance.

Q27 may proceed only after its exact pending transformation concept and broad article/evidence dependencies are made live or can be represented as standalone-complete cross-university updates without overwriting ASU provenance.

Q29 may proceed only after the Gram-positive thick-peptidoglycan identity is reconciled across its raw corpus candidates and pending ASU wall-composition chain, or can be represented as a standalone-complete update without duplication or provenance loss.

Q31 may proceed only after its exact raw-corpus identity is reconciled into a governed concept and a complete article dependency can be represented without an artificial companion, duplicate identity or unsafe external update.

## Source-absent opening-family disposition

- **Q32 is source-absent, not a conflict hold.** The complete prompt asks which measure estimates bacterial relatedness in genetic classification and offers **C, G-C ratio in the total DNA**, but the typed carrier's answer list stops at Q31. The active-attempt sibling also has no selected response for the corresponding final prompt. No Q32 answer was inferred, reconstructed or medically supplied, and no student-facing record was authored.

## Exact backlog after twenty-six slices and terminal reconciliation

- Governed prompt observations: 5,444 total; 8 authored; **5,436 raw prompt observations remain**, including 23 explicit holds and one source-absent opening-family prompt.
- Governed answer observations: 5,211 total; 8 clean source-keyed prompts authored; **5,203 raw answer observations remain**, including the 23 held printed-key observations; Q32 contributes no answer observation.
- Opening 32-prompt normalized family: **8 authored / 23 held / 1 source-absent / 0 unassessed**; therefore **24 prompts remain in the authoring backlog**.
- Record-level backlog is not asserted as 5,436 unique records: repeated and near-repeated prompts must still be deduplicated during authoring, per the one-question-one-record rule.

The next family boundary is the completed third triage source, \`Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf\`, SHA-256 \`4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf\`, a 45-page student-authored revision bank containing five independent 30-MCQ sections (150 prompts / 150 printed answers). It has not been opened for downstream authoring in this slice.

## Upload state

No MUST content has been uploaded or imported. All eight student-facing articles and questions remain Draft; all eight concepts use the concept schema's non-published \`under review\` state and \`publication_status: needs_evidence\`. Q2, Q3, Q4, Q6, Q13 through Q31 exist only as authoring-ledger holds; Q32 exists only as a source-absent ledger disposition.
`
}

function introSources() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${absalamAssessmentResourceId}

## title
FHB102-2 MCQs till Midterm by Absalam101 — Part 1

## institution
Student-authored revision bank attributed to Absalam101; MUST scope appears in the title, but no institution, department, examiner or authenticated faculty key is printed

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025

## accessed_at
2026-09-01

## page_count
45

## sha256
4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
All 45 pages were rendered and visually read across the five bounded 30-prompt families; answer pages 9, 18, 27, 36 and 45 were checked against every authored or held prompt. Pages 19–22 and 27 were rendered and visually read for global Q61–Q75. Pages 23–27 were rendered and visually read for global Q76–Q90. Pages 37–44 and answer page 45 were rendered and visually read for global Q121–Q150. The carrier is visibly attributed to Absalam101 and does not authenticate the answers as a faculty key. Global Q126–Q139, Q142, Q146, Q147, Q149 and Q150 join the prior approved Draft questions with their printed wording, option order and keys unchanged. Global Q121–Q125, Q140, Q141, Q143–Q145 and Q148 join the prior explicit identity, authority, evidence-scope, duplicate, dependency or key-form holds with no student-facing record. Q145 remains an uncorrected teaching conflict: the bank prints piperacillin plus sulbactam while governed teaching gives piperacillin plus tazobactam and ampicillin plus sulbactam.

## confidence
0.6

## is_assessment
yes

---

# Item

## id
${introTeachingResourceId}

## title
An Introduction to Medical Parasitology, FHB102-2

## institution
Misr University for Science and Technology, Faculty of Medicine; teaching updates visibly attributed to Dr Heba Abdel Aaty

## processing_status
visually_read_selected_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/1 - Introduction to Medical Parasitology.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
48

## sha256
f65b3872022ca0b42a79e67c7cf1013a1b5f687b2362c2aa9e0c3fd132605149

## rights
Faculty-distributed teaching material; internal curriculum authoring only.

## qualification
Pages 1, 4–7, 9, 11–12, 14–16, 21–22, 27, 32–34 and 40–41 were rendered and visually read for the bounded Q1–Q30 assessment. Page 1 visibly carries the MUST and FHB102-2 identity. The selected pages directly support all fourteen authored keys, expose Q13's broad single-best-answer ambiguity and expose Q17's malformed key/form conflict, but the deck is teaching authority rather than an authenticated answer key.

## confidence
0.95

## is_assessment
no

---

# Item

## id
${mucizeAssessmentResourceId}

## title
FHB102-2 MCQs till mid — Mucize Doctors Publish

## institution
Student-authored revision bank published by Mucize Doctors; the carrier identifies its student-to-student educational purpose but no MUST faculty member, department, examiner or authenticated answer key

## processing_status
fully_governed_visually_read_all_pages_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf

## source_uri


## media_type
application/pdf

## languages
en
ar

## publication_date
2025

## accessed_at
2026-09-01

## page_count
47

## sha256
352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f

## rights
Locally supplied student study material; internal curriculum authoring only. The source's copyright notice prohibits reproduction, distribution or commercial use without permission, so the PDF is not student-downloadable.

## qualification
All 47 pages were already visually governed in source triage. Physical pages 6–25 and 28 were rendered and visually re-read for the bounded Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q13 authoring audit, including every governed option and printed answer token. Core Q3, Q5, Q8, Q9, Q11, Q15, Q28, Q29, Q31, Q38, Q41–Q49, Q54, Q57–Q60, Q62, Q67–Q72, Q74–Q76, Q80, Q82–Q85, Q87–Q89 and Q91–Q94 plus Case 4 Q2, Case 6 Q1, Case 7 Q2 and Advanced Q11/Q13 are authored only where their unchanged printed keys align with direct MUST faculty teaching and safe governed local concept/article identities. Core Q1–Q2, Q4, Q6–Q7, Q10, Q12–Q14, Q16–Q24, Q26–Q27, Q30, Q32–Q37, Q39–Q40, Q50–Q53, Q55–Q56, Q61, Q63–Q66, Q73, Q77–Q79, Q81, Q86, Q90 and Q95 plus Case 1 Q1–Q2, Case 2 Q1–Q3, Case 3 Q1–Q2, Case 4 Q1, Q3–Q4, Case 5 Q1, Case 6 Q2–Q3, Case 7 Q1/Q3, Case 8 Q1–Q4 and Advanced Q1–Q10/Q12 remain explicit identity, duplicate, dependency, negative-closure, unsupported-precision, non-unique-key or authority-form holds. Core Q25 is source-absent: the answer row skips Q25 and visibly prints “35.B”; no answer was inferred or renumbered. The student answer lines remain source evidence rather than authenticated faculty keys.

## confidence
0.6

## is_assessment
yes
`
}

function introClaims() {
  return generatedItems(introItems.map((item) => `# Item

## id
${introClaimId(item)}

## concept_id
${item.conceptId}

## subject
${item.label}

## predicate
states

## object
${item.claim}

## display_text
${item.claim}

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
source question: ${introBankLabel(item)}`))
}

function introCitations() {
  return generatedItems(introItems.map((item) => `# Item

## id
${introCitationId(item)}

## claim_id
${introClaimId(item)}

## resource_id
${introTeachingResource(item)}

## evidence_role
local_curriculum

## support_span
${item.support}

## locator_type
page

## locator_page
${item.teachingPages ?? item.teachingPage ?? item.page}

## locator_section
${item.teachingTitle ?? 'Introduction to Medical Parasitology'} — ${item.microtopic}

## locator_detail
PDF page ${item.teachingPages ?? item.teachingPage ?? item.page}, visually read direct teaching statement.

## context_note
The university-branded FHB102-2 deck directly supports the unchanged printed ${introBankLabel(item)} answer ${item.key}.

## confidence
0.9

## counts_as_claim_evidence
yes`))
}

function introSpans() {
  return generatedItems(introItems.map((item) => `# Item

## id
${introSpanId(item)}

## article_id
${introArticles[item.article]}

## section_id
${introArticleSectionId(item.article)}

## text
${item.claim}

## claim_ids
${introClaimId(item)}

## citation_ids
${introCitationId(item)}`))
}

function introConcepts() {
  const conceptGroups = [...Map.groupBy(introItems, (item) => item.conceptId).values()]
    .filter((group) => !group.every((item) => item.reuseExternal))
  return generatedItems(conceptGroups.map((group) => {
    const item = group[0]
    const relatedArticles = introArticleRelations[item.article].map((key) => introArticles[key]).join('\n')
    const rejected = [...new Set(group.flatMap((entry) => entry.rejected))]
    const rejectedIds = rejected.length ? rejected.map((entry) => entry.split(' — ')[0]).join('\n') : '[clear]'
    const rejectedNotes = rejected.length ? rejected.join(' ') : 'No manual raw-corpus merge candidate survived the identity audit.'
    return `# Item

## id
${item.conceptId}

## label
${item.label}

## canonical_key
${item.canonicalKey}

## aliases
${item.aliases.join('\n')}

## arabic_label


## arabic_aliases
[clear]

## definition
${item.claim}

## explicit_objective
${item.objective}

## pitfalls
${item.pitfalls}

## concept_type
${item.conceptType}

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
${item.primaryNode}

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
${item.subtopic}

## microtopic
${item.microtopic}

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > ${item.subtopic} > ${item.microtopic}

## article_ids
${introArticles[item.article]}

## related_article_ids
${relatedArticles}

## related_concept_ids
[clear]

## resource_ids
${[...new Set(group.map(introTeachingResource))].join('\n')}
${[...new Set(group.map(introAssessmentResource))].join('\n')}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.45

## exam_weight_by_year
MUST_Y1=0.45

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.55

## confidence
0.9

## atomic_claim_ids
${group.map(introClaimId).join('\n')}

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${group.map((entry) => `${introAssessmentResource(entry)} | tier 3 | 2025 | p${entry.assessmentPage ?? '1–5'} ${introBankLabel(entry)}; printed answer p${introAnswerPage(entry)}`).join('\n')}
${group.map((entry) => `${introTeachingResource(entry)} | tier 2 | ${entry.teachingResourceId ? '2022-04-01' : 'undated'} | p${entry.teachingPages ?? entry.teachingPage ?? entry.page} direct university teaching`).join('\n')}

## original_wording
${group.map((entry) => `${entry.stem} Printed key ${entry.key}; options retained in their original order.`).join('\n')}

## merge_ids
[clear]

## rejected_merge_candidate_ids
${rejectedIds}

## conflicts
${group.map((entry) => `No key conflict affects authored ${introBankLabel(entry)}. Its printed ${entry.key} agrees with the governed university teaching statement.`).join(' ')} Held questions remain outside this concept.

## uncertainty
The Draft is limited to the direct local teaching statement and does not upgrade the student-authored printed key to faculty authority.

## evidence_gaps
Independent standard-reference and medical review remain required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been medically reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
nanotopicId: No verified nanotopic below the selected Parasitology node exists for this concept.
microtopicId: The reviewed taxonomy stops at the selected Parasitology topic; the narrower curriculum phrase remains in module_subject rather than inventing a node.
approvedFileResourceIds: Neither local PDF has been rights-cleared for student download.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed visual evidence; no extraction occurrence was minted.
sourceCandidateIds: The required live/pending search gate returned no record for this exact proposed concept.
rejectedMergeCandidateIds: ${rejectedNotes}
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after first medical review.
relationships: Related reading is restricted to complete reciprocal articles in this bounded batch; existing exact-ID articles retain their prior governed content and relationships.`
  }))
}

function getIntroArticleData() { return {
  definitions: {
    title: 'Parasite definitions and living habits', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Parasite definitions',
    summary: 'A parasite lives in or on a host and harms it. Obligatory parasites depend completely on a host, facultative parasites can alternate between free-living and parasitic modes, and opportunistic parasites may cause severe disease when host immunity is compromised.',
    sections: `### Definition
A parasite is a living organism that lives in or on another organism and harms it. This host-associated harmful relationship distinguishes parasitism from a mutually beneficial association.

### Mechanism
An obligatory parasite is completely dependent on its host and cannot exist without it. A facultative parasite can alternate between free-living and parasitic modes of life. It is therefore not always dependent on a host and is not defined by a multiple-host life cycle. An opportunistic parasite may cause severe disease in an immunocompromised host. The term describes the interaction with reduced host defence rather than a plant-only infection or free-living habit.

### Key determinants
Parasite describes the harmful host relationship, obligatory describes complete host dependence, facultative describes the ability to alternate living modes, and opportunistic describes disease emerging in a susceptible host context.

### Clinical significance
These definitions organise how parasite behaviour and host susceptibility are described in the local curriculum. They provide the recognition language used in the associated questions without extending beyond the governed teaching statements.

### Common misconceptions
Do not treat facultative as synonymous with obligatory parasitism. Obligatory does not mean necessarily endoparasitic or dependent on multiple hosts. Do not define opportunistic parasites as organisms that necessarily cause severe disease in every healthy host.`,
  },
  classification: {
    title: 'Parasite habitat and classification', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Habitat and classification',
    summary: 'Parasites can be classified scientifically by taxonomy or clinically by their habitat in the human host. Malaria parasites are classified by habitat as blood parasites of the haemopoietic system.',
    sections: `### Definition
Parasites may be classified scientifically by taxonomy or clinically by their habitat in the human host. The local curriculum presents both approaches rather than treating either as the sole classification.

### Mechanism
Habitat classification groups parasites by their site in the human body. The approach supports clinical recognition and diagnosis without replacing scientific taxonomy.

### Key determinants
Malaria parasites are blood parasites in the human haemopoietic system. Blood is therefore the best answer when the question asks their human habitat. Taxonomy and habitat are both valid classification approaches in the governed deck, while colour is not.

### Clinical significance
Scientific taxonomic classification of parasites supports laboratory identification and diagnosis. Classification of parasites by their habitat in the human host supports clinical diagnosis. Malaria supplies the direct blood-habitat example used in the bounded question slice.

### Common misconceptions
Do not force a choice between taxonomy and habitat when an option combines both. Do not substitute intestine, muscle, or skin for the stated blood habitat of malaria parasites.`,
  },
  helminths: {
    title: 'Medical helminth taxonomy and morphology', primaryNode: 'DIS-PAR-T02', subtopic: 'Helminthology', microtopic: 'Taxonomy and morphology',
    summary: 'Medical helminths include roundworms and flatworms. Flatworms comprise trematodes and cestodes; trematodes are flat, leaf-like and unsegmented, whereas cestodes are flat and segmented.',
    sections: `### Definition
Medical helminths include roundworms and flatworms. Nematodes are roundworms, while the flatworms comprise trematodes and cestodes. The parasitic flatworms comprise trematodes and cestodes.

### Mechanism
The teaching deck distinguishes the groups through branch relationships and visible body form. Class membership and morphology together separate trematodes, cestodes and nematodes.

### Key determinants
Trematodes are flat, leaf-like, unsegmented helminths. Cestodes are tapeworms and are flat and segmented. Their segmentation is the contrasting feature used beside trematode morphology in the governed teaching deck.

### Clinical significance
The class-level morphology supplies a rapid recognition framework for medical helminth questions. It also prevents roundworm nematodes or unicellular protozoa from being grouped with parasitic flatworms.

### Common misconceptions
Do not combine nematodes with cestodes or trematodes as the two flatworm groups. Do not call trematodes tape-like and segmented.`,
  },
  locomotion: {
    title: 'Protozoan locomotion', primaryNode: 'DIS-PAR-T01', subtopic: 'Protozoology', microtopic: 'Protozoan locomotion',
    summary: 'The local curriculum classifies protozoa by locomotion: amoebae use pseudopodia, flagellates use flagella, ciliates use cilia and Apicomplexa move by gliding.',
    sections: `### Definition
Protozoan groups are distinguished in the local curriculum by their organs or mode of locomotion. The local curriculum classifies Apicomplexa as moving by gliding.

### Mechanism
Amoebae use pseudopodia, flagellates use flagella and ciliates use cilia. The same classification slide places Apicomplexa under “By gliding.”

### Key determinants
Gliding selects Apicomplexa among the offered groups. Entamoeba histolytica and Amoeba belong with pseudopodial movement, while ciliates use cilia.

### Clinical significance
Locomotion supplies a foundational classification framework for recognising the main protozoan groups in the MUST FHB102-2 curriculum.

### Common misconceptions
The source question uses singular “an organism” although Apicomplexa is a group; that wording is preserved rather than silently repaired. Do not substitute flagella, cilia or pseudopodia for the slide’s gliding classification.`,
  },
  transmission: {
    title: 'Parasite transmission, vectors and zoonoses', primaryNode: 'DIS-PAR', subtopic: 'Foundations', microtopic: 'Transmission and zoonoses',
    summary: 'Vectors transmit parasites between hosts. Parasites may enter through ingestion, skin penetration or vectors, and zoonotic parasitic diseases originate from animal sources and are transmitted to humans.',
    sections: `### Definition
A vector transmits parasites from one host to another. Zoonotic parasitic diseases originate from animal sources and are transmitted to humans.

### Mechanism
Parasites can enter hosts through ingestion, skin penetration and vector transmission.

### Key determinants
Host-to-host parasite transmission defines the vector role in the associated question. All three offered entry routes—ingestion, skin penetration and vectors—are taught directly. Animal origin distinguishes zoonotic disease from diseases limited to humans.

### Clinical significance
Recognising source and entry route supports introductory reasoning about exposure, transmission and prevention without promoting the student bank to faculty-key authority.

### Common misconceptions
Vectors are not defined by nourishing parasites or always serving as reservoirs. Zoonoses are not restricted to protozoa or vector-only spread. Do not exclude one of the three directly taught entry routes.`,
  },
  arthropodClasses: {
    title: 'Arthropod class morphology', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Arthropod classification',
    summary: 'The local curriculum distinguishes Insecta by three pairs of legs and Arachnida by four pairs of legs.',
    sections: `### Definition
Insecta and Arachnida are arthropod classes distinguished in the local curriculum by their typical leg-pair counts.

### Mechanism
Insects typically have three pairs of legs. Arachnids have four pairs of legs. The count is applied at class level rather than inferred from a disease association.

### Key determinants
Three pairs selects Insecta. Four pairs selects Arachnida.

### Clinical significance
Class-level morphology provides the first recognition step when separating medically important insects from arachnids.

### Common misconceptions
Do not assign the four-pair arachnid pattern to insects or the three-pair insect pattern to arachnids.`,
  },
  arthropodMetamorphosis: {
    title: 'Complete and incomplete arthropod metamorphosis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Metamorphosis',
    summary: 'Complete metamorphosis is holometabolous, whereas incomplete metamorphosis is hemimetabolous.',
    sections: `### Definition
Complete metamorphosis is called holometabolous metamorphosis.

### Mechanism
The governed deck contrasts complete holometabolous development with incomplete hemimetabolous development.

### Key determinants
The word complete selects holometabolous. Hemimetabolous is the contrasting incomplete pattern.

### Clinical significance
Metamorphosis terminology supports classification of medically important arthropod life cycles.

### Common misconceptions
Do not treat holometabolous and hemimetabolous as interchangeable or select both for a prompt asking specifically about complete metamorphosis.`,
  },
  transovarian: {
    title: 'Transovarian transmission in arthropods', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Transovarian transmission',
    summary: 'Transovarian transmission passes an infectious agent from an arthropod to its offspring.',
    sections: `### Definition
Transovarian transmission passes a pathogen from an arthropod to its offspring.

### Mechanism
The infected arthropod carries the agent into the next generation through its reproductive pathway.

### Key determinants
The offspring relationship identifies transovarian transmission. It is distinct from multiplication, developmental change, or their combination within one vector.

### Clinical significance
Recognising vertical vector transmission separates pathogen persistence across arthropod generations from the biological events used to classify vector transmission.

### Common misconceptions
Do not substitute propagative, cyclodevelopmental or cyclopropagative transmission when the prompt specifically asks about passage to offspring.`,
  },
  muscidIdentification: {
    title: 'Muscidae identification: Stomoxys and Musca', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Muscidae identification',
    summary: 'Stomoxys calcitrans has a piercing and sucking proboscis. Musca domestica larvae have D-shaped posterior spiracles with a medial button and three M-shaped sinuous slits.',
    sections: `### Definition
Adult mouthparts and larval posterior-spiracle morphology provide direct identification features for medically important muscid flies.

### Mechanism
Stomoxys calcitrans has a piercing and sucking proboscis. Musca domestica larva has a D-shaped posterior spiracle with a medial button and three M-shaped sinuous slits.

### Key determinants
The piercing and sucking proboscis selects Stomoxys. The D-shaped spiracle, medial button and M-shaped sinuous slits select Musca.

### Clinical significance
These features separate adult stable flies and housefly larvae from alternative fly patterns in the local identification tables.

### Common misconceptions
Do not apply the rounded incomplete-peritreme Sarcophaga pattern or a triangular complete-peritreme pattern to Musca. Stomoxys is winged and blood-feeding.`,
  },
  cutaneousMyiasis: {
    title: 'Cutaneous myiasis and Dermatobia phoresis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Cutaneous myiasis',
    summary: 'Cutaneous myiasis produces skin lesions or nodules. Cordylobia, Dermatobia and Hypoderma can cause cutaneous myiasis, and Dermatobia hominis reaches the host by attaching its eggs to another insect that carries them.',
    sections: `### Definition
Cutaneous myiasis is skin infestation by fly larvae and produces lesions or nodules in the skin. Cordylobia, Dermatobia and Hypoderma can each cause cutaneous myiasis.

### Mechanism
Dermatobia hominis uses another insect to carry and deliver its eggs. This phoresis attaches eggs to another insect, which carries them to the human host; the mechanism is therefore insect carriage rather than direct deposition of Dermatobia eggs on skin.

### Key determinants
Skin lesions or nodules identify the cutaneous presentation. Cordylobia, Dermatobia and Hypoderma are all represented in the local cutaneous-myiasis teaching. A question offering the three separately and an all-of-the-above option selects all three. For Dermatobia transmission, the decisive clue is another insect carrying its eggs.

### Clinical significance
Recognising the causative genera and the phoretic transfer mechanism helps connect cutaneous lesions with fly exposure in the local myiasis framework.

### Common misconceptions
Do not restrict cutaneous myiasis to only one of the three governed genera. Do not rewrite phoresis as ingestion, water deposition or direct Dermatobia egg deposition on skin.`,
  },
  clinicalSiteMyiasis: {
    title: 'Clinical-site patterns of myiasis', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Clinical myiasis',
    summary: 'Clinical myiasis is classified by involved site. Fannia is associated with urogenital myiasis, while Sarcophaga is associated with aural myiasis in the local curriculum.',
    sections: `### Definition
Clinical myiasis may be classified by the body site involved. Urogenital and aural myiasis are two site-specific patterns in the governed teaching.

### Mechanism
Fannia is associated with urogenital myiasis. Sarcophaga is associated with aural myiasis in the local curriculum. These are source-specific organism–site associations rather than a claim that either fly is restricted to one clinical presentation.

### Key determinants
Urogenital selects Fannia among the offered flies. Aural selects Sarcophaga among the offered alternatives.

### Clinical significance
Site and fly association together organise recognition of myiasis presentations and connect specimen context with the broader wound-myiasis and prevention material.

### Common misconceptions
Do not substitute a manifestation-only definition for an organism association. Do not infer that a fly listed at one site can never occur elsewhere.`,
  },
  forensicMyiasis: {
    title: 'Forensic use of myiasis-associated flies', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Forensic entomology',
    summary: 'Lucilia and Sarcophaga are used in forensic parasitology and entomology. Their evidence can help estimate the post-mortem interval or time since death.',
    sections: `### Definition
Forensic entomology applies insect evidence to legal investigation. Lucilia and Sarcophaga are used in forensic parasitology and entomology.

### Mechanism
Forensic entomology can estimate the post-mortem interval from fly evidence. Fly colonisation and larval evidence can be related to decomposition timing, allowing estimation of time since death.

### Key determinants
Both Lucilia and Sarcophaga are supported when offered together. Determining the post-mortem interval is the forensic application supported by the deck.

### Clinical significance
The time relationship between flies and decomposing remains can contribute evidence in a criminal investigation without replacing the broader forensic examination.

### Common misconceptions
The source stem calls Lucilia and Sarcophaga “species,” although both offered names are genera; that wording is preserved and disclosed rather than silently corrected. Do not conflate fly-based interval estimation with rigor-mortis estimation, blood toxicology or infection diagnosis.`,
  },
  myiasisTherapyPrevention: {
    title: 'Myiasis therapy and prevention', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Myiasis management',
    summary: 'Maggot debridement therapy is used for diabetic foot ulcers. Proper wound hygiene, cleaning and protective dressing help prevent myiasis.',
    sections: `### Definition
The local curriculum presents a therapeutic use of selected larvae and practical prevention of unwanted myiasis.

### Mechanism
Maggot debridement therapy is used to treat diabetic foot ulcers. Proper wound hygiene and covering a clean wound help prevent myiasis. Prevention includes cleaning a wound and closing it with surgical dressing, which limits exposure to flies.

### Key determinants
The source's literal option “Diabetes foot ulcers” corresponds to the deck's diabetic-foot use of maggot debridement therapy. Proper wound hygiene is the preventive action among the offered choices.

### Clinical significance
The paired teaching distinguishes controlled therapeutic larval use from accidental wound infestation and links prevention to direct wound care.

### Common misconceptions
Do not silently rewrite the source's “Diabetes foot ulcers” wording. Keeping flies, increasing humidity and avoiding antibiotics are not substitutes for cleaning and protecting a wound.`,
  },
  mosquitoBiology: {
    title: 'Mosquito taxonomy, morphology, life cycle and bionomics', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito biology',
    summary: 'Mosquitoes are dipteran insects with complete metamorphosis. Their aquatic immature stages, adult morphology, female parasitic habit and characteristic bionomics support genus and stage recognition.',
    sections: `### Definition
Mosquitoes belong to class Insecta and order Diptera and undergo complete metamorphosis. Eggs, larvae and pupae are aquatic immature stages.

### Mechanism
The female piercing-sucking proboscis supports temporary obligatory ectoparasitism. Anopheles rests at 45 degrees and its larvae remain closest to the surface because they lack a siphon. Culex produces an annoying hum. Pupae do not feed, a blood meal stimulates ovulation, and bright light plus dark clothes attract mosquitoes.

### Key determinants
Insecta and Diptera define taxonomy; 45-degree resting identifies Anopheles; an annoying hum identifies Culex; non-feeding identifies the pupa.

### Clinical significance
These recognition features organise the mosquito life cycle and help distinguish medically important genera before disease-vector associations are applied.

### Common misconceptions
Do not treat Culex or Aedes as the 45-degree resting genus. Do not classify pupae as feeding larvae or omit eggs and pupae from the aquatic boundary.`,
  },
  mosquitoDiseases: {
    title: 'Mosquito-borne disease and transmission patterns', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito-borne disease',
    summary: 'The MUST teaching deck links maternal Zika infection to congenital microcephaly and classifies Culex transmission of Wuchereria bancrofti as cyclodevelopmental.',
    sections: `### Definition
Mosquito genera transmit characteristic pathogens through biological transmission patterns. The bounded clean items cover Zika-associated congenital microcephaly and Culex-borne filariasis.

### Mechanism
Maternal Zika infection during pregnancy is associated with congenital microcephaly. In Culex, Wuchereria bancrofti develops to the infective filariform stage without multiplication, giving cyclodevelopmental transmission.

### Key determinants
Congenital microcephaly selects Zika virus. Culex filariasis selects cyclodevelopmental transmission.

### Clinical significance
Pairing disease manifestations with vector biology helps distinguish arboviral pregnancy effects from helminth developmental transmission.

### Common misconceptions
Do not substitute malaria, yellow fever or Rift Valley fever for the governed Zika association. Do not label Wuchereria transmission propagative or cyclopropagative.`,
  },
  mosquitoControl: {
    title: 'Integrated mosquito control methods', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Mosquito control',
    summary: 'Mosquito control combines physical breeding-site management, biological enemies, chemical larvicides and adulticides, mechanical barriers and genetic approaches.',
    sections: `### Definition
Integrated mosquito control targets aquatic stages and adults through physical, biological, chemical, mechanical and genetic methods.

### Mechanism
Gambusia fish and Bacillus thuringiensis provide biological control. Draining swamps is physical control. DDT and Malathion are chemical residual insecticides, although DDT persistence, accumulation and toxicity discourage its use. Window screens are mechanical control. Paris green is a stomach poison that kills feeding larvae but not non-feeding pupae.

### Key determinants
Gambusia and Bacillus thuringiensis identify biological control; drainage identifies physical control; DDT and Malathion identify chemical control; window screens identify mechanical control; Paris green identifies larvicidal-only stomach poisoning.

### Clinical significance
Method classification links mosquito bionomics to practical prevention and supports recognition of stage-specific interventions.

### Common misconceptions
Do not classify insecticide spraying as mechanical control or fish as chemical control. Pyrethrum is non-residual in the governed comparison, while Malathion is residual.`,
  },
  sandflyBiology: {
    title: 'Sandfly taxonomy, development and bionomics', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly biology',
    summary: 'Sandflies are small sandy-yellow dipteran vectors. Phlebotomus and Lutzomyia are the principal genera, and their complete metamorphosis, nocturnal feeding and weak hopping flight define the governed recognition profile.',
    sections: `### Definition
Sandflies are sandy-yellow insects represented by Phlebotomus in the Old World and Lutzomyia in the New World. Phlebotomus papatasi is the locally prevalent species named in the Egypt teaching context.

### Mechanism
Sandflies undergo complete metamorphosis, with development from egg to adult taking about thirty days. The name Phlebotomus refers to sucking blood from veins. Females feed at night; adults rest by day in rodent burrows and in cracks or crevices in buildings. They are weak fliers with hopping movement and are more exophilic than endophilic while still using indoor refuges.

### Key determinants
Sandy-yellow colour explains the common name. Phlebotomus plus Lutzomyia identifies the genera; complete metamorphosis and thirty days define development; nocturnal feeding and weak hopping movement define bionomics.

### Clinical significance
Taxonomy, development and resting behaviour support vector recognition and explain why control must address both outdoor refuges and indoor cracks.

### Common misconceptions
Sandflies are not named because they breed in sand and do not breed in water. Exophilic behaviour does not mean that indoor refuges are absent.`,
  },
  sandflyDiseases: {
    title: 'Sandfly bite reactions and transmitted diseases', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly-transmitted disease',
    summary: 'Sandflies cause the local Harrara bite reaction and transmit leishmaniasis, viral sandfly fever and Bartonella bacilliformis infection causing Oroya fever.',
    sections: `### Definition
The direct local sandfly-bite reaction is Harrara, a painful itchy red papule surrounded by erythema. Distinct transmitted diseases include leishmaniasis, viral sandfly fever and Oroya fever.

### Mechanism
Sandfly fever is caused by a virus. Oroya fever is caused by Bartonella bacilliformis, produces acute hemolytic anemia and follows a propagative transmission pattern in the vector.

### Key determinants
Harrara identifies the local bite reaction; virus identifies sandfly fever; Bartonella bacilliformis, hemolytic anemia and propagative transmission identify the Oroya-fever profile.

### Clinical significance
Separating the local reaction from vector-borne infection prevents confusion between Harrara, leishmaniasis, sandfly fever and Oroya fever.

### Common misconceptions
Malaria is not in the governed sandfly disease list. Leishmania and Bartonella bacilliformis do not cause viral sandfly fever, and Oroya fever is not classified as mechanical transmission.`,
  },
  sandflyControl: {
    title: 'Sandfly bite prevention and habitat control', primaryNode: 'DIS-PAR-T03', subtopic: 'Arthropods and vectors', microtopic: 'Sandfly control',
    summary: 'Sandfly control combines narrow-mesh bed nets, repellents, crack filling and insecticides and is directed at non-aquatic resting and breeding habitats.',
    sections: `### Definition
Sandfly prevention uses personal barriers and habitat control suited to a very small, non-aquatic vector.

### Mechanism
Narrow-mesh mosquito nets help prevent bites. Filling wall cracks removes refuges, and insecticide spraying targets resting adults. Because sandflies do not breed in water, draining stagnant water is not the sandfly-specific control action in the governed set.

### Key determinants
Narrow mesh identifies the protective net; crack filling and insecticides identify habitat control; non-aquatic breeding excludes stagnant-water drainage from the offered sandfly measures.

### Clinical significance
Matching intervention to vector habitat supports practical bite prevention without importing mosquito breeding-site assumptions.

### Common misconceptions
Do not stop using repellents or replace narrow-mesh nets with unsupported measures. Do not treat stagnant-water drainage as the defining sandfly-control method.`,
  },
} }

function introArticleRecords() {
  const introArticleData = getIntroArticleData()
  return generatedItems(Object.entries(introArticleData).map(([key, article]) => {
    const articleItems = introItems.filter((item) => item.article === key)
    const related = introArticleRelations[key].map((other) => `${introArticles[other]}: ${introArticleTitle(other, introArticleData)}`).join('\n')
    const teachingResources = [...new Set(articleItems.map(introTeachingResource))]
    const assessmentResources = [...new Set(articleItems.map(introAssessmentResource))]
    return `# Item

## id
${introArticles[key]}

## title
${article.title}

## arabic_title


## aliases
MUST FHB102-2 ${article.microtopic}

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
${article.subtopic}

## microtopic
${article.microtopic}

## nanotopic


## primary_node_id
${article.primaryNode}

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > ${article.subtopic} > ${article.microtopic}

## summary
${article.summary}

## sections
${article.sections}

### Exam-linked statements
${[...new Set(articleItems.map((item) => item.claim))].join('\n')}

## published_summary


## published_sections


## hold_these
${articleItems.map((item) => item.claim).join('\n')}

## lose_the_mark
${articleItems.map((item) => item.pitfalls).join('\n')}

## callout_evidence
${articleItems.map((item) => `### ${item.claim}\nClaims: ${introClaimId(item)}\nCitations: ${introCitationId(item)}\nReviewed by: pending medical review`).join('\n\n')}

## related_concepts
${[...new Set(articleItems.map((item) => item.conceptId))].join('\n')}

## related_articles
${related}

## question_ids
${articleItems.map(introQuestionId).join('\n')}

## resource_ids
${teachingResources.join('\n')}
${assessmentResources.join('\n')}

## article_source_ids
${teachingResources.join('\n')}

## claim_ids
${articleItems.map(introClaimId).join('\n')}

## span_ids
${articleItems.map(introSpanId).join('\n')}

## university_notes
must: The bounded Absalam questions are retained with their printed wording, options and keys and checked against the governed MUST FHB102-2 teaching deck named in article_source_ids.

## annotations
${articleItems.map((item) => `### definition_of · ${item.conceptId}\nQuote: ${item.claim}\nBlock: body\nId: ann-must-fhb1022-${introPrefix(item).toLowerCase()}-q${String(item.q).padStart(2, '0')}`).join('\n\n')}

## media


## publication_gate
needs_evidence

## evidence_basis
Governed MUST FHB102-2 teaching decks, visually read on the exact cited pages.
Absalam101 revision banks, visually read on the exact prompt pages and corresponding printed answer tables.

## evidence_gaps
Independent standard-reference and medical review remain required before publication. Held questions have no student-facing projection.

## conflicts
No authored question has a teaching contradiction. The source-printed keys remain student-bank evidence and were not upgraded to authenticated faculty keys.

## last_reviewed


## review_due


## notes
Bounded Absalam authoring slices only. Every record remains Draft and local; this file is not an upload instruction.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected Parasitology node exists.
media: The questions are text-only and do not require student-facing media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after first medical review.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Every listed relationship is reciprocal through complete records generated in this bounded import. Prior exact-ID records preserve their governed content and relationships while adding only the approved links.`
  }))
}

function introQuestions() {
  return generatedItems(introItems.map((item) => {
    const correct = item.options['ABCD'.indexOf(item.key)]
    const explanation = `${item.claim} The governed university slide directly supports ${correct} for this prompt. Therefore ${item.key} is retained as the unchanged source-printed answer, pending medical review.`
    return `# Item

## id
${introQuestionId(item)}

## title
${item.stem}

## question
${item.stem}

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed verbatim from ${introAssessmentResource(item)}; printed key checked against ${introTeachingResource(item)} without treating the student bank as an authenticated faculty key.

## correct_answer
${item.key}

${item.options.map((option, index) => `## answer_${'abcd'[index]}\n${option}\n\n## explanation_${'abcd'[index]}\n${'ABCD'[index] === item.key ? explanation : `Incorrect. ${item.pitfalls} The supported answer is ${item.key}, ${correct}.`}`).join('\n\n')}

## topic
Parasitology

## subtopic
${item.subtopic}

## main_concept
${item.conceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
30

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.45

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > ${item.subtopic} > ${item.microtopic}

## question_only_for
MUST_Y1

## library_ids
${introArticles[item.article]}

## resource_ids
${introAssessmentResource(item)}
${introTeachingResource(item)}

## learning_objective
${item.objective}

## source_citation
${introBankSourceTitle(item)}, p${item.assessmentPage ?? '1–5'} ${introBankLabel(item)}, printed key p${introAnswerPage(item)} (${item.bankQ ?? item.q} = ${item.key}); MUST FHB102-2 ${item.teachingTitle ?? (item.teachingResourceId ? 'Flies and Myiasis' : 'Introduction to Medical Parasitology')}, p${item.teachingPages ?? item.teachingPage ?? item.page}.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed source key: ${introBankLabel(item)} = ${item.key}. The wording, option order and key are preserved exactly. ${item.q === 11 && !item.idPrefix ? 'The duplicated word “is is” is a visible source typo and is intentionally retained transparently rather than silently corrected. ' : ''}${item.q === 18 && !item.idPrefix ? 'Q18 preserves the source\'s singular “an organism” wording although Apicomplexa is a group; the wording is disclosed and not silently corrected. ' : ''}${item.q === 53 ? 'Q53 preserves the source\'s “species” wording although Lucilia and Sarcophaga are genus names; this taxonomy-form risk is disclosed and not silently corrected. ' : ''}${item.q === 54 ? 'Q54 preserves the source\'s literal “Diabetes foot ulcers” wording although the governed teaching says diabetic foot; the wording is disclosed and not silently corrected. ' : ''}${item.idPrefix === 'MOSQ2' && item.q === 9 ? 'The source option “Larve” is retained exactly and disclosed rather than silently repaired. ' : ''}${item.idPrefix === 'SAND2' && item.q === 5 ? 'The assessment spelling “papatasi” is retained exactly; the teaching deck spells the name “papatasii”, and the mismatch is disclosed without silently changing the question. ' : ''}${item.idPrefix === 'SAND2' && item.q === 30 ? 'The assessment wording “highly exophilic but can adapt to indoor environments” is retained; the governed deck directly states “more exophilic than endophilic” and lists indoor cracks and crevices as resting sites. ' : ''}The question remains Draft/local-only and is not authorised for upload.`
  }))
}

function coverage() {
  const delta = `### First Absalam introduction slice delta

- +2 governed local resources: the 45-page Absalam101 student-authored bank and the 48-page MUST FHB102-2 Introduction to Medical Parasitology teaching deck.
- +7 claims, +7 citations, +7 article spans and +7 under-review / needs-evidence concepts.
- +3 standalone-complete reciprocal Draft articles and +7 Draft questions: Q2, Q4, Q5, Q9, Q11, Q14 and Q15.
- +8 explicit holds with no student-facing record: Q1, Q3, Q6, Q7, Q8, Q10, Q12 and Q13.
- Every authored stem, option and printed key is unchanged. Q11's visible “is is” typo is retained and disclosed; no silent correction was made.
- First 15-prompt Absalam introduction slice: **7 authored / 8 held / 0 unassessed**. The remaining source boundary is Q16–Q30 in this section plus four later 30-prompt sections, for **135 unassessed prompts** in this source.

### Second Absalam introduction slice delta

- +7 teaching claims, +7 citations and +7 article spans for Q18, Q19 and Q21–Q25.
- +5 under-review / needs-evidence concepts for Q18, Q19, Q22, Q24 and Q25; Q21 and Q23 safely reuse the existing broad classification concept \`CON-INF-D13F9697E5B95F\` without minting duplicates.
- +2 standalone-complete reciprocal Draft articles for protozoan locomotion and parasite transmission/vectors/zoonoses.
- +2 exact-ID-preserving complete Draft article updates: parasite classification gains Q21/Q23 and the approved reciprocal links; parasite definitions gains Q25 while retaining its prior content and relationships.
- +7 Draft questions: Q18, Q19, Q21, Q22, Q23, Q24 and Q25.
- +8 explicit holds with no student-facing record: Q16, Q17, Q20, Q26, Q27, Q28, Q29 and Q30.
- Q18's singular “an organism” wording is preserved and disclosed although Apicomplexa is a group. Q17's printed A is preserved only as source evidence because “Flagella” is a locomotor organ, not an example organism; no correction was imported.
- Second 15-prompt Absalam introduction slice: **7 authored / 8 held / 0 unassessed**.
- Absalam Parasitology Introduction Q1–Q30: **14 authored / 16 held / 0 unassessed**. The remaining source boundary is the four later 30-prompt sections, for **120 unassessed prompts** in this source.

### First Absalam Arthropoda slice delta

- +6 teaching claims, +6 citations and +6 article spans for global Q31, Q32, Q33, Q40, Q41 and Q44.
- +5 under-review / needs-evidence concepts: the shared Insecta/Arachnida leg-count classification, complete holometabolous metamorphosis, transovarian transmission, Stomoxys proboscis morphology and Musca posterior-spiracle morphology.
- +4 standalone-complete reciprocal Draft articles: arthropod class morphology, arthropod metamorphosis, transovarian transmission and Muscidae identification.
- +1 exact-ID-preserving complete Draft article update: the Sarcophaga article retains its cyclopropagative link and gains the reciprocal Muscidae comparison. The cyclopropagative article remains byte-for-byte unchanged because its retained live Medical Parasitology relation cannot be widened safely inside this bounded batch.
- +6 Draft questions: global Q31, Q32, Q33, Q40, Q41 and Q44.
- +9 explicit holds with no student-facing record: global Q34–Q39, Q42–Q43 and Q45.
- Global Q38 remains an uncorrected teaching-conflict hold: the student bank calls Stomoxys a biological vector for Leishmaniasis and Trypanosomiasis, while the official MUST deck teaches direct mechanical transmission. No answer correction or student-facing record was emitted.
- Global Q36 and Q42 retain clean printed keys as source evidence only, but both are dependency-chain holds: the necessary exact-ID cyclopropagative article update cannot pass the focused contract without either dropping its existing Medical Parasitology relationship or recursively importing an unrelated live article graph. Neither unsafe action was taken.
- First 15-prompt Absalam Arthropoda slice: **6 authored / 9 held / 0 unassessed**.
- Absalam source global Q1–Q45: **20 authored / 25 held / 0 unassessed**. The remaining boundary is Arthropoda Q16–Q30 plus the three later 30-prompt sections, for **105 unassessed prompts** in this source.

### Second Absalam Arthropoda slice delta

- +10 teaching claims, +10 citations and +10 article spans for global Q47–Q49, Q51–Q54 and Q56–Q58.
- +10 under-review / needs-evidence concepts, each preserving the exact governed question scope after rejecting broader, narrower or mechanism-mismatched raw candidates.
- +4 standalone-complete reciprocal Draft articles: cutaneous myiasis and Dermatobia phoresis, clinical-site myiasis, forensic myiasis, and myiasis therapy/prevention.
- +1 exact-ID-preserving complete Draft article update: the Sarcophaga article retains every prior field, relation, concept and Q12 link while adding the wound-family and Calliphoridae morphology evidence for Q49/Q56 and reciprocal clinical-site/forensic links.
- +10 Draft questions: global Q47, Q48, Q49, Q51, Q52, Q53, Q54, Q56, Q57 and Q58.
- +5 explicit holds with no student-facing record: global Q46, Q50, Q55, Q59 and Q60.
- Q53 retains and discloses the source's “species” wording although Lucilia and Sarcophaga are genus names. Q54 retains and discloses the literal “Diabetes foot ulcers” wording although the governed teaching says diabetic foot. Neither wording nor any printed key was silently corrected.
- Second 15-prompt Absalam Arthropoda slice: **10 authored / 5 held / 0 unassessed**.
- Absalam source global Q1–Q60: **30 authored / 30 held / 0 unassessed**. The next unopened boundary is global Q61–Q90, Microbiology Ch1-3, leaving **90 unassessed prompts** in this source.

`
  const holds = `- **Q1 is held in the Absalam introduction family.** Its clean printed C is supported by the teaching deck, but raw identities \`concept_67e3dcb99284cae795d4cf8f\` and \`concept_8de933ca4fcbba40f533edac\` overlap the same medical-parasitology definition. No duplicate concept or student-facing record was minted.
- **Q3 is held in the Absalam introduction family.** Its printed B is supported, but raw lice/ectoparasite identities \`concept_7bbc067f755c9cdfc88ab06c\` and \`concept_db670dbd615a4a13896cb1a4\` create unresolved identity overlap. No student-facing record was minted.
- **Q6 is held in the Absalam introduction family.** Its printed C is supported, but exact raw identity \`concept_4cf60f293dd2603501b07838\` already states the definitive-host concept. No duplicate was minted.
- **Q7 is held in the Absalam introduction family.** Its printed B is supported, but exact raw identity \`concept_379bf3d8ea267775959b6004\` already states the intermediate-host concept. No duplicate was minted.
- **Q8 is held in the Absalam introduction family.** Its printed C is supported, but exact raw identity \`concept_49b33fb2fff7f5b6f66ebc34\` already states the reservoir-host concept. No duplicate was minted.
- **Q10 is held in the Absalam introduction family.** Its printed B is directionally supported by the diagnostic-stage teaching, but raw identity \`concept_dfede741e82d80ac0f2f30b2\` overlaps the same scope and the selected teaching wording does not independently sharpen “detected in lab diagnosis” enough to justify a new identity. No student-facing record was minted.
- **Q12 is held in the Absalam introduction family.** Its printed C is supported, but raw identity \`concept_b80a272b4cd80d7b91bc7ee6\` already links cestodes and tapeworm morphology. No duplicate was minted.
- **Q13 is held in the Absalam introduction family.** Printed B is supported by the locomotion slide, but the preceding classification slide also includes morphological identification, reproduction/locomotion and habitat; option A can therefore overlap the broad stem. Exact raw identity \`concept_9dc1156f5fddd3a2c18a42af\` adds duplication risk. The key was neither corrected nor taught through a new student-facing record.
- **Q16 is held in the Absalam introduction family.** Its printed C, Pseudopodia, is supported by page 41, but exact raw identities \`concept_529981449491192c1b4f5a29\` and \`concept_1766c9903841d22dec992ac8\` already represent amoebic pseudopodial locomotion. No duplicate concept or student-facing record was minted.
- **Q17 is held in the Absalam introduction family.** The student bank prints A, “Flagella,” as an example of a flagellate protozoan. The governed slide instead presents Zoomastigophora as the flagellate group and “Flagella” as its locomotor organ. “Flagella” is the locomotor organ, not the requested example organism. No correction was imported, and no student-facing record was authored.
- **Q20 is held in the Absalam introduction family.** Its printed B, Nematodes, is visually supported by the nematode mouth–intestine–anus diagram, but exact raw identity \`concept_af313c18c2fc4f03d7ccb32e\` already states that nematodes have a complete digestive tract. No duplicate was minted.
- **Q26 is held in the Absalam introduction family.** Its printed C, Live inside the host, is supported, but raw identity \`concept_5c4d7c3f025582504ad5e86a\` already classifies parasites as ectoparasites or endoparasites by location. No duplicate was minted.
- **Q27 is held in the Absalam introduction family.** Its printed B, Definitive host, is supported, but exact raw identity \`concept_4cf60f293dd2603501b07838\` already states that a definitive host carries adult or sexual parasite stages. This is the same collision that held earlier Q6; no duplicate was minted.
- **Q28 is held in the Absalam introduction family.** Its printed B, Live on the host’s external surface, is supported, but raw identity \`concept_5c4d7c3f025582504ad5e86a\` already represents the ectoparasite/endoparasite location classification. No duplicate was minted.
- **Q29 is held in the Absalam introduction family.** Its printed B, Facilitate mechanical or biological transmission, is supported, but exact raw identity \`concept_cbe678b590c9d68db81d4ed5\` already states mechanical or biological arthropod transmission and the item overlaps Q19's vector scope. The prompts were not silently merged and no duplicate was minted.
- **Q30 is held in the Absalam introduction family.** Its printed D, An infected mother transmits the parasite to her fetus, is supported, but raw identity \`concept_c623cf376abcb64b5fbc4e89\` already states transplacental transmission from mother to fetus. No duplicate was minted.
- **Q34 is held in the Absalam Arthropoda family.** Its printed B, Sleeping sickness, is supported, but raw identity \`concept_7bf8806533d667d1cd65b96a\` already connects Glossina tsetse flies with African trypanosomiasis. No duplicate concept or student-facing record was minted.
- **Q35 is held in the Absalam Arthropoda family.** Its printed B, The arthropod acts as a passive carrier, is supported, but exact raw identity \`concept_a42b36f3cee0d189109260e7\` already states mechanical transmission without multiplication or development, and \`concept_cbe678b590c9d68db81d4ed5\` overlaps the broader mechanical-versus-biological classification. No duplicate was minted.
- **Q36 is held in the Absalam Arthropoda family as a dependency-chain hold.** Its printed C, Undergoes both multiplication and morphological changes, is directly supported and maps to existing concept \`CON-INF-23265735EECCA1\`. Authoring would require an exact-ID cyclopropagative article update whose retained live Medical Parasitology relation cannot satisfy the focused local dependency contract without recursively importing unrelated live articles. The existing relation was not dropped or clobbered, and no student-facing Q36 record was created.
- **Q37 is held in the Absalam Arthropoda family.** Its printed B, Anopheles mosquito, is supported, but exact raw identities \`concept_7482060cb7f283619c078023\` and \`concept_c85bd6a9786422a574f8a50a\` already represent Anopheles transmission of malaria. No duplicate was minted.
- **Q38 is held in the Absalam Arthropoda family as an uncorrected teaching conflict.** The bank asks for the biological vector and prints D, A & B, for Stomoxys transmission of Leishmaniasis and Trypanosomiasis. The official MUST Flies and Myiasis deck instead classifies both associations under direct mechanical transmission. Printed D remains source evidence only; no answer correction or student-facing record was created.
- **Q39 is held in the Absalam Arthropoda family.** Its printed C, Intestinal, is supported as accidental myiasis associated with Musca, but exact raw identities \`concept_8d9cafb99baef390a663df18\` and \`concept_8f98d380a95e2bd806b1f319\` already represent accidental and intestinal myiasis. The source's truncated option A, “Gastri,” remains recorded only in the audit; no duplicate was minted.
- **Q42 is held in the Absalam Arthropoda family as a dependency-chain hold.** Its printed B, Cyclo-propagative transmission, is directly supported and maps to existing concept \`CON-INF-23265735EECCA1\`. The same unsafe exact-ID article dependency chain that holds Q36 prevents a focused-gate-clean student-facing record; the printed key was not changed and no record was created.
- **Q43 is held in the Absalam Arthropoda family.** Its printed B, Mechanical transmission, is supported, but exact raw identities \`concept_012efb068aac441646ea164f\` and \`concept_ed540a67619ad2d979d7558f\` already represent housefly mechanical carriage and contamination. The source typo “Musca domesticA” was not silently repaired through a student-facing record.
- **Q45 is held in the Absalam Arthropoda family.** Its printed C, Flies, is supported, but exact raw identities \`concept_029a51c793d756b91bf5e550\` and \`concept_a0958f268e6d2701352c57da\` already define myiasis as invasion by dipterous fly larvae. No duplicate was minted.
- **Q46 is held in the Absalam Arthropoda family.** Its printed B, “Larvae must invade living tissues to complete their life cycle,” is directly supported, but exact raw identity \`concept_1ffd40812a4df1ef0eb6ca09\` already represents the obligatory-myiasis living-tissue requirement. No duplicate concept or student-facing record was minted.
- **Q50 is held in the Absalam Arthropoda family.** Its printed D says “Erystalis,” while the governed deck presents \`Eristalis\` only as an example associated with gastric myiasis and does not establish it as the “most common” cause. Neither spelling nor answer was corrected, and no student-facing record was created.
- **Q55 is held in the Absalam Arthropoda family.** Its printed C, purgatives, is represented by exact raw identity \`concept_0d6ad71378af78716219e769\`, which already covers site-specific myiasis treatment including purgation. No duplicate concept or student-facing record was minted.
- **Q59 is held in the Absalam Arthropoda family.** Its printed A, Calliphora, is directionally related to the official deck's statement that Calliphora larvae can invade wounds, but that teaching does not state that Calliphora lays eggs in wounds as the stem specifically asks. The source grammar “flies lays” and printed key remain evidence only; no correction or student-facing record was created.
- **Q60 is held in the Absalam Arthropoda family.** Its printed B, Ivermectin, appears in the official treatment list, but the deck does not support the stem's additional “commonly” or “severe” qualifiers. The printed answer was not promoted beyond its source authority and no student-facing record was created.

`
  return baseCoverage()
    .replace('| Evidence resources | 20 |', '| Evidence resources | 22 |')
    .replace('| Claims | 8 |', '| Claims | 38 |')
    .replace('| Citations | 13 |', '| Citations | 43 |')
    .replace('| Article spans | 8 |', '| Article spans | 38 |')
    .replace('| Concepts | 8 |', '| Concepts | 35 |')
    .replace('| Articles | 8 |', '| Articles | 21 |')
    .replace('| Questions | 8 |', '| Questions | 38 |')
    .replace('| Question authoring holds | 23 |', '| Question authoring holds | 53 |')
    .replace('## Explicit authoring holds\n\n', `${delta}## Explicit authoring holds\n\n${holds}`)
    .replace('Governed prompt observations: 5,444 total; 8 authored; **5,436 raw prompt observations remain**, including 23 explicit holds', 'Governed prompt observations: 5,444 total; 38 authored; **5,406 raw prompt observations remain**, including 53 explicit holds')
    .replace('Governed answer observations: 5,211 total; 8 clean source-keyed prompts authored; **5,203 raw answer observations remain**, including the 23 held printed-key observations', 'Governed answer observations: 5,211 total; 38 clean source-keyed prompts authored; **5,173 raw answer observations remain**, including the 53 held printed-key observations')
    .replace('Record-level backlog is not asserted as 5,436 unique records', 'Record-level backlog is not asserted as 5,406 unique records')
    .replace('It has not been opened for downstream authoring in this slice.', 'Its Parasitology Introduction Q1–Q30 and Arthropoda Q1–Q30 boundaries are fully dispositioned; global Q61–Q90 (Microbiology Ch1-3) and the two later 30-prompt sections remain unopened for downstream authoring.')
    .replace('All eight student-facing articles and questions remain Draft; all eight concepts', 'All twenty-one student-facing articles and all thirty-eight questions remain Draft; all thirty-five concepts')
}

function generatedItems(items) {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->\n\n${items.join('\n\n---\n\n')}`
}

function introPrefix(item) { return item.idPrefix ?? 'INTRO' }
function introClaimId(item) { return `CLM-INF-MUST-FHB1022-${introPrefix(item)}-Q${String(item.q).padStart(2, '0')}-01` }
function introCitationId(item) { return `CIT-INF-MUST-FHB1022-${introPrefix(item)}-Q${String(item.q).padStart(2, '0')}-01` }
function introSpanId(item) { return `SPN-INF-MUST-FHB1022-${introPrefix(item)}-Q${String(item.q).padStart(2, '0')}-01` }
function introQuestionId(item) { return `QST-MUST-FHB1022-PARA-${introPrefix(item)}-Q${String(item.q).padStart(2, '0')}` }
function introArticleSectionId(key) { return `${introArticles[key].toLowerCase()}-definition` }
function introTeachingResource(item) { return item.teachingResourceId ?? introTeachingResourceId }
function introAssessmentResource(item) { return item.assessmentResourceId ?? absalamAssessmentResourceId }
function introAnswerPage(item) { return item.answerPage ?? (item.bankQ ? 18 : 9) }
function introBankSourceTitle(item) {
  if (item.idPrefix?.startsWith('MUCIZE')) return 'Mucize Doctors FHB102-2 MCQ bank'
  return ['MOSQ2', 'SAND2'].includes(item.idPrefix) ? 'Absalam101 Part 2' : 'Absalam101 Part 1'
}
function introBankLabel(item) {
  if (item.idPrefix === 'MOSQ2') return `Mosquitoes Q${item.bankQ}`
  if (item.idPrefix === 'SAND2') return `Sandfly Q${item.bankQ}`
  if (item.idPrefix === 'MUCIZE') return `Mucize Parasitology core Q${item.bankQ}`
  if (item.idPrefix?.startsWith('MUCIZECASE')) return `Mucize case-based learning Case ${item.caseNumber} Q${item.bankQ}`
  if (item.idPrefix === 'MUCIZEADV') return `Mucize Advanced MCQ Q${item.bankQ}`
  return item.bankQ ? `Arthropoda Q${item.bankQ} (global Q${item.q})` : `Introduction Q${item.q}`
}
function introArticleTitle(key, data) {
  if (data[key]) return data[key].title
  if (key === 'sarcophaga') return 'Sarcophaga identification in traumatic wound myiasis'
  throw new Error(`Unknown intro article key: ${key}`)
}

function microPrefix(item) { return item.idPrefix ?? 'MICRO' }
function microClaimId(item) { return `CLM-INF-MUST-FHB1022-${microPrefix(item)}-Q${item.q}-01` }
function microCitationId(item) { return `CIT-INF-MUST-FHB1022-${microPrefix(item)}-Q${item.q}-01` }
function microSpanId(item) { return `SPN-INF-MUST-FHB1022-${microPrefix(item)}-Q${item.q}-01` }
function microQuestionId(item) { return item.idPrefix ? `QST-MUST-FHB1022-${item.idPrefix}-Q${item.q}` : `QST-MUST-FHB1022-MICRO-INTRO-Q${item.q}` }
function microArticleSectionId(key) { return `${microArticles[key].toLowerCase()}-definition` }
function microTeachingResource(item) { return item.teachingResourceId ?? bacterialCellResourceId }
function microAssessmentResource(item) { return item.assessmentResourceId ?? absalamAssessmentResourceId }
function microTeachingTitle(item) { return item.teachingTitle ?? 'Introduction to Microbiology and Bacterial Cell Structure' }
function microBankLabel(item) { return item.bankLabel ?? 'Microbiology' }
function microAnswerPage(item) { return item.answerPage ?? 27 }
function microTopic(item) { return item.topic ?? 'Microbiology' }
function microSubtopic(item) { return item.subtopic ?? 'General bacteriology' }
function microPrimaryNode(item) { return item.primaryNode ?? 'DIS-MIC-T01' }
function microSecondaryNodes(item) { return item.secondaryNodes ?? ['SYS-FND-T05-S01', 'DIS-MIC'] }

function microClaims() {
  return generatedItems(microItems.map((item) => `# Item

## id
${microClaimId(item)}

## concept_id
${item.conceptId}

## subject
${item.label}

## predicate
states

## object
${item.claim}

## display_text
${item.claim}

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 ${microBankLabel(item)}
source question: Absalam ${microBankLabel(item)} Q${item.bankQ}${item.idPrefix ? '' : ` (global Q${item.q})`}`))
}

function microCitations() {
  return generatedItems(microItems.map((item) => `# Item

## id
${microCitationId(item)}

## claim_id
${microClaimId(item)}

## resource_id
${microTeachingResource(item)}

## evidence_role
local_curriculum

## support_span
${item.support}

## locator_type
page

## locator_page
${item.teachingPage}

## locator_section
${microTeachingTitle(item)} — ${item.microtopic}

## locator_detail
PDF page ${item.teachingPage}, visually read direct teaching statement.

## context_note
The official MUST teaching deck directly supports the unchanged printed ${microBankLabel(item)} Q${item.bankQ}${item.idPrefix ? '' : ` (global Q${item.q})`} answer ${item.key}; the student bank remains source-key evidence rather than an authenticated faculty key.

## confidence
0.95

## counts_as_claim_evidence
yes`))
}

function microSpans() {
  return generatedItems(microItems.map((item) => `# Item

## id
${microSpanId(item)}

## article_id
${microArticles[item.article]}

## section_id
${microArticleSectionId(item.article)}

## text
${item.claim}

## claim_ids
${microClaimId(item)}

## citation_ids
${microCitationId(item)}`))
}

function microConcepts() {
  const groups = [...Map.groupBy(microItems, (item) => item.conceptId).values()]
  return generatedItems(groups.map((group) => {
    const item = group[0]
    const articleKeys = [...new Set(group.map((entry) => entry.article))]
    const relatedArticleKeys = [...new Set(articleKeys.flatMap((key) => microArticleRelations[key]))].filter((key) => !articleKeys.includes(key))
    const rejected = [...new Set(group.flatMap((entry) => entry.rejected))]
    const rejectedIds = rejected.length ? rejected.map((entry) => entry.split(' — ')[0]).join('\n') : '[clear]'
    const rejectedNotes = rejected.length ? rejected.join(' ') : 'No exact live, pending or raw-corpus identity survived the manual search gate.'
    return `# Item

## id
${item.conceptId}

## label
${item.label}

## canonical_key
${item.canonicalKey}

## aliases
${item.aliases.join('\n')}

## arabic_label


## arabic_aliases
[clear]

## definition
${group.map((entry) => entry.claim).join(' ')}

## explicit_objective
${group.map((entry) => entry.objective).join(' ')}

## pitfalls
${group.map((entry) => entry.pitfalls).join(' ')}

## concept_type
${item.conceptType}

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
${microPrimaryNode(item)}

## secondary_node_ids
${microSecondaryNodes(item).join('\n')}

## topic
${microTopic(item)}

## subtopic
${microSubtopic(item)}

## microtopic
${item.microtopic}

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > ${microTopic(item)} > ${microSubtopic(item)} > ${item.microtopic}

## article_ids
${articleKeys.map((key) => microArticles[key]).join('\n')}

## related_article_ids
${relatedArticleKeys.map((key) => microArticles[key]).join('\n')}

## related_concept_ids
[clear]

## resource_ids
${microTeachingResource(item)}
${microAssessmentResource(item)}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.45

## exam_weight_by_year
MUST_Y1=0.45

## clinical_relevance
0.25

## academic_relevance
0.95

## weight_confidence
0.55

## confidence
0.95

## atomic_claim_ids
${group.map(microClaimId).join('\n')}

## resource_occurrence_ids
[clear]

## source_candidate_ids
${item.sourceCandidates?.join('\n') ?? '[clear]'}

## exam_signal
${group.map((entry) => `${microAssessmentResource(entry)} | tier 3 | 2025 | p${entry.assessmentPage} ${microBankLabel(entry)} Q${entry.bankQ}${entry.idPrefix ? '' : ` (global Q${entry.q})`}; printed answer p${microAnswerPage(entry)}`).join('\n')}
${group.map((entry) => `${microTeachingResource(entry)} | tier 1 local teaching | p${entry.teachingPage} direct MUST teaching`).join('\n')}

## original_wording
${group.map((entry) => `${entry.stem} Printed key ${entry.key}; options retained in their original order.`).join('\n')}

## merge_ids
[clear]

## rejected_merge_candidate_ids
${rejectedIds}

## conflicts
${group.map((entry) => `No key conflict affects authored ${microBankLabel(entry)} Q${entry.bankQ}${entry.idPrefix ? '' : ` (global Q${entry.q})`}; printed ${entry.key} agrees with the governed MUST teaching.`).join(' ')} Held questions remain outside this concept.

## uncertainty
The Draft is limited to direct local teaching and does not promote the student-authored answer table to faculty-key authority.

## evidence_gaps
Independent standard-reference and medical review remain required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been medically reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
nanotopicId: No verified nanotopic below the selected ${microTopic(item)} node exists.
microtopicId: The reviewed taxonomy stops at the selected ${microTopic(item)} topic; the narrower curriculum phrase remains in module_subject rather than inventing a node.
approvedFileResourceIds: Neither local PDF has been rights-cleared for student download.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed visual evidence; no extraction occurrence was minted.
sourceCandidateIds: ${item.sourceCandidates?.length ? `Raw candidate ${item.sourceCandidates.join(', ')} was retained as provenance but did not replace this narrower governed identity.` : 'The required live-and-pending search gate returned no exact record for this concept.'}
rejectedMergeCandidateIds: ${rejectedNotes}
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after first medical review.
relationships: Related reading is restricted to the two complete reciprocal Draft articles in this bounded batch; rejected external near-misses are not dependencies.`
  }))
}

function getMicroArticleData() { return {
  foundations: {
    title: 'Microbiology scope, saprophytes and scientific nomenclature', microtopic: 'Microbiology foundations',
    summary: 'The local curriculum defines the major microorganism groups, associates saprophytes with dead animal or plant material, capitalizes the genus rather than the species in a scientific name, and bases the new classification system on molecular biology and genetic composition.',
    sections: `### Definition
Microorganisms are minute living things. The five major groups listed in the governed MUST deck are bacteria, fungi, protozoa, helminths and viruses; plants are not in that closed list.

### Mechanism
Saprophytes feed on dead animal or plant material and thereby decompose dead organic matter. The deck contrasts these mostly harmless organisms with the minority that are pathogenic.

### Key determinants
Scientific nomenclature assigns two names. The genus is the first name and is always capitalized; the species name follows and is not capitalized.

The new system of classification is based on molecular biology and genetic composition. Cell-wall nature, staining characteristics and spore formation are not substituted for that source-stated basis.

### Clinical significance
These definitions supply the vocabulary used before the course moves into microbial cellular structure and clinical bacteriology.

### Common misconceptions
Do not remove viruses from the deck's microorganism list merely because they are acellular. Do not capitalize the species position or define saprophytes by obligate intracellular replication. Do not replace the stated molecular-genetic basis of the new classification system with one older phenotypic characteristic.`,
  },
  organisation: {
    title: 'Cellular organisation of microorganisms', microtopic: 'Microbial cell organisation',
    summary: 'Viruses are acellular agents, bacteria are prokaryotic microorganisms, a true membrane-bound nucleus distinguishes eukaryotic from prokaryotic cells, Gram staining reflects cell-wall structure, and penicillin acts against peptidoglycan synthesis.',
    sections: `### Definition
The local curriculum divides microorganisms into cellular and acellular categories. Viruses are acellular agents and are not true cells. Bacteria occupy the prokaryotic branch, while fungi occupy the eukaryotic branch.

### Mechanism
Prokaryotic cells lack a true nucleus, nuclear membrane and nucleolus. Their DNA lies in a nucleoid. Eukaryotic cells have a true nucleus bounded by a nuclear membrane and containing a nucleolus.

### Key determinants
Viruses select acellular. Bacteria select prokaryotic. Presence of a true membrane-bound nucleus is the structural distinction tested between prokaryotic and eukaryotic cells.

Gram-positive and Gram-negative bacteria differ in cell-wall structure, including peptidoglycan thickness; this is the governed structural basis for Gram-stain differentiation. The deck also lists penicillins among agents that prevent synthesis of the bacterial peptidoglycan layer, so the peptidoglycan layer is retained as the literal source-level answer to the bounded prompt.

### Clinical significance
This cellular framework explains why later microbiology teaching assigns different structures and targets to bacteria, fungi and viruses.

### Common misconceptions
Do not classify viruses as prokaryotic cells. Do not use cell-wall presence as the universal separator: the governed comparison identifies the true nucleus as the defining distinction for that prompt. Capsule composition, nucleoid shape and growth pattern are not the stated basis of Gram differentiation. The penicillin item is kept at the deck's peptidoglycan-layer level and is not silently rewritten into a more specific uncited molecular-target question.`,
  },
  colonizationCarriage: {
    title: 'Colonization, carriage and opportunistic disease', microtopic: 'Colonization and carrier states',
    summary: 'The official MUST Chapter 6 teaching distinguishes colonization without clinical infection from asymptomatic carrier-state shedding and explains how normally harmless flora can become opportunistic pathogens after habitat change, broad-spectrum antimicrobial disruption or weakened host defenses.',
    sections: `### Definition
An opportunistic pathogen is a microorganism that normally does not cause disease but can become pathogenic when host defenses weaken or when it moves from its normal habitat. Colonization is the establishment of proliferating microorganisms on skin or mucous membranes without clinical evidence of infection. In the carrier state an infected individual has no apparent symptoms but may shed the organism.

### Mechanism
Normal flora remain harmless in their usual niche while host defenses and the microbial community remain intact. A habitat change can place organisms in a vulnerable site; broad-spectrum antimicrobials can disrupt protective flora; and weak host immunity can permit organisms of otherwise limited pathogenicity to cause harm.

Normal flora may produce harmful effects when host resistance is lowered or organisms move from their normal habitat. Harmful effects may follow a change in natural habitat, broad-spectrum antimicrobial use or lowered host resistance.

### Key determinants
Colonization is defined by establishment without clinical infection. Carrier state is defined by absent apparent symptoms despite possible organism shedding. Opportunism is defined by disease emerging under permissive host or habitat conditions rather than by obligatory pathogenicity.

Carrier state: no apparent symptoms, but organisms may shed.

### Clinical significance
An asymptomatic carrier can still transmit an organism through shedding. Likewise, disturbing normal flora or host resistance can convert a previously harmless relationship into clinically important infection risk.

### Common misconceptions
Do not equate colonization with infectious disease: the governed deck lists elimination or incorporation into resident flora as colonization outcomes and treats infection as a separate branch. Do not treat carrier state as complete microbial elimination, and do not call every commensal relationship opportunistic disease.`,
  },
  virulenceEvasion: {
    title: 'Virulence, immune evasion and iron acquisition', microtopic: 'Virulence mechanisms',
    summary: 'Virulence is the degree of pathogenicity. The official MUST Chapter 6 deck identifies adherence, resistance to host defenses, antigenic variation, iron competition and toxin-mediated damage as virulence capabilities, and directly teaches coagulase, leukocidin, Protein A and siderophores as mechanisms that protect bacteria or support growth in the host.',
    sections: `### Definition
Virulence is the degree of pathogenicity of a microorganism. Virulence factors are positive capabilities that help bacteria adhere, invade, resist host immune defenses, survive, obtain nutrients or damage the host.

Virulence is the degree of pathogenicity. Virulence factors include ability to adhere, resist host immune defense and damage host cells by toxins.

### Mechanism
Antigenic variation changes surface antigens to avoid immune destruction. Protein A is antiphagocytic; leukocidin destroys neutrophils and macrophages; and coagulase converts plasma fibrinogen to fibrin, depositing a protective fibrin layer around the organism. Bacteria also produce iron-chelating siderophores to capture iron sequestered by host iron-binding proteins.

Protein A is antiphagocytic; coagulase protects organisms from phagocytes; leukocidin destroys neutrophils and macrophages. Bacteria obtain iron by producing iron chelators called siderophores. Coagulase converts fibrinogen in plasma to fibrin and protects the organism from phagocytes.

### Key determinants
Virulence measures degree, not simply presence in a host. Adherence, immune-defense resistance and toxin production are virulence capabilities, whereas inability to survive is not. Coagulase, leukocidin and Protein A all contribute to escape from phagocytosis by different mechanisms.

### Clinical significance
Immune evasion and nutrient acquisition allow bacteria to persist and multiply despite host defenses. Recognising the distinct mechanisms prevents a named enzyme, surface protein or chelator from being assigned the wrong function.

### Common misconceptions
Do not substitute antibiotic resistance, spore formation or tissue-degrading enzymes for antigenic variation. Do not confuse siderophores with pili, capsule or exotoxins. Hyaluronidase, collagenase and lecithinase do not perform coagulase's fibrinogen-to-fibrin reaction.`,
  },
  cellWallAntibiotics: {
    title: 'Cell-wall antibiotics: beta-lactams, vancomycin and bacitracin', microtopic: 'Cell-wall antibiotic mechanisms',
    topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'],
    summary: 'Beta-lactams are time-dependent bactericidal cell-wall inhibitors. PBPs catalyze peptidoglycan transpeptidation, vancomycin binds D-Ala-D-Ala precursors, bacitracin blocks precursor transport, and beta-lactamase inhibitors protect susceptible partner penicillins.',
    sections: `### Definition
Cell-wall-active antibiotics include beta-lactams and non-beta-lactam agents. Penicillins, cephalosporins and carbapenems are beta-lactams; vancomycin and bacitracin inhibit cell-wall formation by different non-beta-lactam mechanisms.

### Mechanism
Beta-lactams inhibit bacterial cell-wall synthesis through PBPs, which catalyze the transpeptidase reaction used to cross-link peptidoglycan. Vancomycin binds the D-alanyl-D-alanyl terminus of peptidoglycan precursors. Bacitracin blocks transport of cell-wall precursors across the membrane. Beta-lactamase inhibitors protect susceptible partner penicillins from enzymatic degradation.

### Key determinants
Vancomycin is not a beta-lactam. PBPs are transpeptidase targets rather than ribosomal or DNA enzymes. Penicillins and cephalosporins share beta-lactam cell-wall inhibition. Beta-lactam killing is time dependent.

### Clinical significance
Keeping the mechanisms separate prevents classifying every cell-wall inhibitor as a beta-lactam and supports rational interpretation of protected penicillin combinations.

### Common misconceptions
Do not assign vancomycin to the beta-lactam class. Do not replace bacitracin's precursor-transport block with ribosomal or DNA-gyrase inhibition. Beta-lactamase inhibitors protect the partner antibiotic; they do not repair adverse effects or inhibit DNA replication.`,
  },
  penicillins: {
    title: 'Penicillin classes, combinations, uses and hypersensitivity', microtopic: 'Penicillin pharmacology',
    topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'],
    summary: 'Penicillin G is natural; amoxicillin is an aminopenicillin; dicloxacillin is an oral beta-lactamase-resistant antistaphylococcal agent; piperacillin is extended-spectrum and antipseudomonal. Benzathine penicillin supports rheumatic-fever prophylaxis, named inhibitor combinations pair amoxicillin with clavulanate and ampicillin with sulbactam, and hypersensitivity is a major adverse effect.',
    sections: `### Definition
Penicillins are grouped by spectrum, beta-lactamase resistance, route and clinical use. Penicillin G is natural, amoxicillin is an aminopenicillin, dicloxacillin is an antistaphylococcal enzyme-resistant penicillin, and piperacillin is extended-spectrum and antipseudomonal.

### Mechanism
Clavulanate protects amoxicillin from beta-lactamase. Sulbactam is paired with ampicillin in Unasyn. These inhibitors preserve the partner beta-lactam rather than supplying an unrelated antimicrobial target.

### Key determinants
Benzathine penicillin is used for rheumatic-fever prophylaxis. Cloxacillin and dicloxacillin are oral antistaphylococcal formulations in the governed table. Dicloxacillin is used for susceptible staphylococcal infection. Piperacillin is labelled the most potent antipseudomonal penicillin in the governed classification.

### Clinical significance
Correct class and combination recognition guides spectrum and administration decisions, while penicillin hypersensitivity remains an important safety consideration.

### Common misconceptions
Do not classify amoxicillin as natural or piperacillin as penicillinase resistant. Do not interchange amoxicillin-clavulanate, ampicillin-sulbactam and piperacillin-tazobactam. The held piperacillin-sulbactam source item is not taught here.`,
  },
  cephalosporins: {
    title: 'Cephalosporin generations and governed uses', microtopic: 'Cephalosporin classification',
    topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'],
    summary: 'The official MUST deck classifies cefazolin as first generation, cefaclor as second generation, cefepime as fourth generation and ceftaroline as fifth generation, with direct governed uses and spectrum statements.',
    sections: `### Definition
Cephalosporins are beta-lactam cell-wall antibiotics divided into five generations. The governed deck places cefazolin in first generation, cefaclor in second generation, cefepime in fourth generation and ceftaroline in fifth generation.

### Mechanism
As beta-lactams, cephalosporins inhibit bacterial cell-wall synthesis; the governed generation tables then distinguish members by spectrum and named use.

### Spectrum and use
First-generation cefazolin is used for surgical prophylaxis. The second-generation group retains Gram-positive activity while increasing Gram-negative activity. Cefepime is used empirically for nosocomial infection. Ceftaroline has activity against MRSA.

### Key determinants
Generation labels, spectrum and named uses are kept separate. The bounded questions preserve the exact offered drug names and source keys.

### Clinical significance
Generation recognition supports selection by spectrum and the specific local-curriculum use statements.

### Common misconceptions
Do not move cefazolin, cefaclor, cefepime or ceftaroline between generations. The held prompts' unsupported skin-infection, sepsis and broadest-spectrum wording is not taught here.`,
  },
  otherBetaLactams: {
    title: 'Carbapenems and monobactams', microtopic: 'Carbapenem and monobactam pharmacology',
    topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'],
    summary: 'Carbapenems provide broad Gram-positive, Gram-negative and anaerobic coverage; imipenem is paired with cilastatin. Aztreonam is a monobactam directed at aerobic Gram-negative organisms without beta-lactam cross-allergy or aminoglycoside nephrotoxicity.',
    sections: `### Definition
Carbapenems and monobactams are beta-lactam antibiotic groups. Imipenem, meropenem and ertapenem are carbapenems; aztreonam is the named monobactam.

### Mechanism
The governed deck describes carbapenems as the broadest-spectrum beta-lactams across Gram-positive, Gram-negative and anaerobic organisms. Aztreonam has a narrow spectrum directed at aerobic Gram-negative organisms.

### Key determinants
Imipenem is degraded by renal dipeptidase and therefore is combined with cilastatin. Aztreonam has no cross-allergy with other beta-lactams and is not nephrotoxic or ototoxic like aminoglycosides.

### Clinical significance
These properties distinguish the broad carbapenem group from the narrow, allergy-sparing monobactam profile.

### Common misconceptions
Do not assign cilastatin to meropenem. Do not expand aztreonam to Gram-positive, anaerobic or fungal activity. The held absolute beta-lactamase question is not taught here.`,
  },
  vancomycinClinical: {
    title: 'Vancomycin clinical profile and pseudomembranous colitis', microtopic: 'Vancomycin use and safety',
    topic: 'Pharmacology', subtopic: 'Antimicrobials', primaryNode: 'DIS-PHA-T05', secondaryNodes: ['DIS-PHA'],
    summary: 'Vancomycin is a Gram-positive agent used for resistant staphylococcal infection including MRSA and orally for pseudomembranous colitis; rapid infusion produces histamine-mediated red man syndrome, prevented by slow infusion and antihistamine pretreatment.',
    sections: `### Definition
Vancomycin is a non-beta-lactam cell-wall antibiotic directed primarily at Gram-positive organisms. The official deck lists resistant staphylococcal infection including MRSA among its uses.

### Mechanism
Oral vancomycin remains in the gut because it is unabsorbed, whereas rapid intravenous infusion can release histamine and produce red man syndrome.

### Administration and colitis
Vancomycin is unabsorbed orally, so systemic treatment uses intravenous infusion. Oral vancomycin acts locally in pseudomembranous colitis. The same teaching lists metronidazole or vancomycin for drug-induced pseudomembranous colitis and identifies clindamycin as a prominent inciting antibiotic.

### Adverse effects
Rapid infusion can trigger histamine-mediated red man syndrome. Slow infusion and antihistamine pretreatment are the governed prevention measures.

### Key determinants
Gram-positive spectrum, resistant staphylococcal use, oral treatment of pseudomembranous colitis and infusion-rate-dependent red man syndrome are the source-governed differentiators.

### Clinical significance
Route, spectrum and infusion rate determine whether vancomycin is being used appropriately and safely in the bounded curriculum context.

### Common misconceptions
Do not extend vancomycin to primary Gram-negative, fungal or viral activity. Hepatotoxicity and last-resort wording were not established by this deck, so those prompts remain held.`,
  },
  mycologyFoundations: {
    title: 'General mycology foundations', microtopic: 'Fungal form and terminology',
    topic: 'Microbiology', subtopic: 'General mycology', primaryNode: 'DIS-MIC', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'Mycology is the study of fungi. The local teaching identifies Candida and Cryptococcus neoformans as yeasts and defines a mycelium as a mass or network of fungal hyphae.',
    sections: `### Definition
Mycology is the study of fungi. A mycelium is the mass or network formed by fungal hyphae.

### Mechanism
Fungal hyphae collectively form the mycelial network described in the governed teaching.

### Morphological examples
The diagnostic teaching presents Candida as Gram-positive oval budding yeast cells and Cryptococcus neoformans as oval yeast cells surrounded by an unstained capsule.

### Key determinants
Mycology names the discipline, mycelium names the hyphal mass, and both Candida and Cryptococcus neoformans satisfy the bounded yeast-example question.

### Clinical significance
These terms support recognition of basic fungal form before diagnostic methods are selected.

### Common misconceptions
Do not confuse mycelium with bacterial cells, viral structures or protozoal organelles. Do not omit one of the two directly taught yeast examples when the option field offers both.`,
  },
  mycologyDisease: {
    title: 'Fungal spores, allergy, mycotoxicosis and opportunism', microtopic: 'Fungal disease mechanisms',
    topic: 'Microbiology', subtopic: 'General mycology', primaryNode: 'DIS-MIC', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'Fungal spores support reproduction and spread and can carry respiratory allergens. Mycotoxicosis follows ingestion of fungal toxins, while Candida is presented as a commensal that may cause opportunistic infection under permissive conditions.',
    sections: `### Definition
Fungal spores are reproductive and dispersal structures. Mycotoxicosis is food poisoning caused by ingestion of food containing mycotoxins. Opportunistic infection may emerge when a normally commensal organism causes disease under permissive host conditions.

### Mechanism
Airborne spores promote spread and may contain allergens that trigger sinusitis, bronchial asthma and other respiratory symptoms. Candida species are the local teaching example of commensals that may cause opportunistic infection.

### Key determinants
Reproduction and spread identify the spore function; ingestion of toxins identifies mycotoxicosis; fungal spores identify the allergen-bearing component; Candida identifies the offered opportunistic organism.

### Clinical significance
Separating infection, toxin-mediated illness and allergy prevents conflating three distinct fungal disease mechanisms.

### Common misconceptions
Do not equate mycotoxicosis with direct invasion. Do not assign the governed allergic trigger to ergosterol, mycotoxin or chitin. The source grammar in Q20 and Q27 remains disclosed rather than silently repaired.`,
  },
  mycologyDiagnosis: {
    title: 'Core methods for fungal laboratory diagnosis', microtopic: 'Fungal diagnostics',
    topic: 'Microbiology', subtopic: 'General mycology', primaryNode: 'DIS-MIC', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'PCR detects fungal DNA, calcofluor white produces fluorescent blue-white fungal elements, and specific-antibody detection is used mainly for systemic fungal infections.',
    sections: `### Definition
The governed laboratory sequence includes direct microscopy, culture, fungal-antigen detection, nucleic-acid methods and serological assays.

### Mechanism
PCR detects fungal DNA in pathological specimens. Calcofluor white stain gives fungal elements a fluorescent blue-white appearance. Indirect detection of specific antibodies is used mainly in diagnosis of systemic fungal infections.

### Key determinants
PCR maps to fungal DNA; calcofluor maps to fluorescent blue-white appearance; antibody detection maps mainly to systemic fungal diagnosis.

### Clinical significance
The tested methods distinguish a molecular target, a microscopy appearance and an indirect serological response.

### Common misconceptions
Do not substitute latex antigen detection for PCR, or assign the main antibody-detection use to superficial or cutaneous mycosis. Held stain, culture and antigen questions remain outside this article.`,
  },
  virusSusceptibility: {
    title: 'Viral components and physical susceptibility', microtopic: 'Viral structure and heat susceptibility',
    topic: 'Microbiology', subtopic: 'General virology', primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'The governed MUST teaching lists nucleic acid and capsid as basic viral components, an envelope in some viruses, and no ribosomes; it also identifies HBV as an exception to usual heat susceptibility at 60°C for 30 minutes.',
    sections: `### Definition
Viruses contain nucleic acid and a protein coat or capsid. Some viruses also possess an envelope. Ribosomes are not listed as a viral structural component.

### Mechanism
Most viruses are stated to be heat susceptible above 60°C for 30 minutes, with hepatitis B virus identified as the exception in the governed lecture.

### Key determinants
Ribosomes are excluded from the component list. HBV is the named heat-susceptibility exception.

### Clinical significance
Separating viral components from host-cell machinery and recognising an explicitly taught susceptibility exception prevents bacterial cell structures from being assigned to viruses.

### Common misconceptions
Do not remove capsid or nucleic acid from the viral component list. Do not treat the optional envelope as a ribosome, and do not substitute influenza, poliovirus or herpes virus for the stated HBV exception.`,
  },
  viralCarrier: {
    title: 'Chronic carrier viral infection', microtopic: 'Persistent viral infection',
    topic: 'Microbiology', subtopic: 'General virology', primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'The governed MUST teaching defines chronic carrier infection by continued virus secretion after clinical recovery.',
    sections: `### Definition
In chronic carrier infection, virus continues to be secreted from the infected individual for some time after clinical recovery.

### Mechanism
Clinical recovery does not necessarily mean immediate cessation of viral shedding in the chronic-carrier pattern.

### Key determinants
Post-recovery secretion distinguishes the governed chronic-carrier pattern from complete resolution and from non-shedding latency.

### Clinical significance
Continued secretion after apparent recovery creates an ongoing transmission concern despite improvement in symptoms.

### Common misconceptions
Do not equate clinical recovery with complete virological resolution. Do not replace chronic carriage with latent infection without shedding or rapid host death.`,
  },
  staphylococci: {
    title: 'Staphylococcal arrangement, catalase and S. aureus phenotype', microtopic: 'Staphylococcal identification',
    topic: 'Microbiology', subtopic: 'Medical bacteriology', primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'The governed MUST Chapter 10 teaching identifies staphylococci as grape-like clustered catalase-positive cocci and records the golden-yellow pigment and beta hemolysis of Staphylococcus aureus.',
    sections: `### Definition
Staphylococci are Gram-positive cocci arranged in grape-like irregular clusters or bunches. The Greek word staphyle means bunch of grapes.

### Mechanism
All staphylococci are catalase positive. Catalase activity distinguishes them from catalase-negative streptococci in the governed comparison.

### Key determinants
Staphylococcus aureus produces a golden-yellow endopigment and is beta-hemolytic. These source-stated features are kept separate from the held coagulase and mannitol identities already governed elsewhere.

### Clinical significance
Arrangement, catalase activity, pigment and hemolysis provide a staged laboratory framework for recognising staphylococci and narrowing toward S. aureus.

### Common misconceptions
Do not describe staphylococci as chains or pairs. Coagulase is not produced by every staphylococcus. The existing coagulase and mannitol identities are not duplicated or silently widened here.`,
  },
  streptococci: {
    title: 'Streptococcal arrangement, hemolysis and classification', microtopic: 'Streptococcal classification',
    topic: 'Microbiology', subtopic: 'Medical bacteriology', primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'The governed MUST Chapter 10 teaching describes catalase-negative streptococci in chains or pairs, classifies their blood-agar hemolysis, assigns S. pyogenes to group A, uses M protein for Griffith typing, and profiles Peptostreptococci.',
    sections: `### Definition
Streptococci are Gram-positive cocci arranged in chains or pairs, and all streptococci are catalase negative. Blood agar separates beta-hemolytic, alpha-hemolytic and nonhemolytic groups.

### Mechanism
Catalase testing separates catalase-negative streptococci from catalase-positive staphylococci. Growth on blood agar then reveals beta, alpha or absent hemolysis for the source-level classification.

### Classification
Viridans streptococci are alpha-hemolytic. Streptococcus pyogenes belongs to Lancefield group A and displays beta hemolysis. Enterococci are nonhemolytic in the governed table. Griffith classification uses M protein.

### Anaerobic streptococci
Peptostreptococci are anaerobic Gram-positive cocci arranged in chains. Their normal commensal reservoirs include the mouth, upper respiratory tract, intestine and female genital tract. They participate in mixed anaerobic infections of wounds, abdomen, lung and genital tract.

### Key determinants
Chains or pairs and catalase negativity identify the broad streptococcal profile. Blood-agar effect, Lancefield group and Griffith M-protein typing answer different classification questions and must not be interchanged.

### Clinical significance
Arrangement, catalase activity and blood-agar effect distinguish major coccal groups before species-level interpretation. Reservoir and mixed-infection context help identify the anaerobic streptococcal profile.

### Common misconceptions
Do not assign clustered arrangement to streptococci. Do not classify viridans as beta-hemolytic or enterococci as catalase positive. Lancefield's carbohydrate-antigen identity remains held because it already exists live; it is not duplicated by this article.`,
  },
  branchingGramPositive: {
    title: 'Nocardia and Actinomyces in the Gram-positive classification tree', microtopic: 'Branching Gram-positive bacteria',
    topic: 'Microbiology', subtopic: 'Medical bacteriology', primaryNode: 'DIS-MIC-T01', secondaryNodes: ['SYS-FND-T05-S01', 'DIS-MIC'],
    summary: 'The governed MUST classification tree separates aerobic weakly acid-fast Nocardia from anaerobic non-acid-fast Actinomyces.',
    sections: `### Definition
The Chapter 10 Gram-positive classification tree places Nocardia and Actinomyces among branching Gram-positive bacteria.

### Mechanism
The weak acid-fast property belongs to Nocardia, whereas Actinomyces is non-acid fast; the oxygen relationship runs in parallel, with Nocardia aerobic and Actinomyces anaerobic.

### Key determinants
Nocardia is aerobic and weakly acid fast. Actinomyces is anaerobic and non-acid fast. Weak acid-fast staining therefore distinguishes Nocardia from Actinomyces in this bounded comparison.

### Clinical significance
Using the oxygen and acid-fast pair together prevents the two branching Gram-positive genera from being interchanged.

### Common misconceptions
Do not assign anaerobic growth to Nocardia or weak acid-fast staining to Actinomyces. The source does not use endospores or motility for this specific distinction, and unsupported species-level bacillary claims remain held.`,
  },
} }

function microArticleRecords() {
  const data = getMicroArticleData()
  return generatedItems(Object.entries(data).map(([key, article]) => {
    const articleItems = microItems.filter((item) => item.article === key)
    const teachingResources = [...new Set(articleItems.map(microTeachingResource))]
    const related = microArticleRelations[key].map((other) => `${microArticles[other]}: ${data[other].title}`).join('\n')
    const needsEvidenceStatements = article.topic === 'Pharmacology' || articleItems.some((item) => !item.annotationQuote)
    const bodySections = needsEvidenceStatements
      ? `${article.sections}\n\n### Governed evidence statements\n${articleItems.map((item) => item.annotationQuote ?? item.support).join('\n')}`
      : article.sections
    return `# Item

## id
${microArticles[key]}

## title
${article.title}

## arabic_title


## aliases
MUST FHB102-2 ${article.microtopic}

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
${article.topic ?? 'Microbiology'}

## subtopic
${article.subtopic ?? 'General bacteriology'}

## microtopic
${article.microtopic}

## nanotopic


## primary_node_id
${article.primaryNode ?? 'DIS-MIC-T01'}

## secondary_node_ids
${(article.secondaryNodes ?? ['SYS-FND-T05-S01', 'DIS-MIC']).join('\n')}

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > ${article.topic ?? 'Microbiology'} > ${article.subtopic ?? 'General bacteriology'} > ${article.microtopic}

## summary
${article.summary}

## sections
${bodySections}

## published_summary


## published_sections


## hold_these
${articleItems.map((item) => item.claim).join('\n')}

## lose_the_mark
${articleItems.map((item) => item.pitfalls).join('\n')}

## callout_evidence
${articleItems.map((item) => `### ${item.claim}\nClaims: ${microClaimId(item)}\nCitations: ${microCitationId(item)}\nReviewed by: pending medical review`).join('\n\n')}

## related_concepts
${[...new Set(articleItems.map((item) => item.conceptId))].join('\n')}

## related_articles
${related}

## question_ids
${articleItems.map(microQuestionId).join('\n')}

## resource_ids
${teachingResources.join('\n')}
${[...new Set(articleItems.map(microAssessmentResource))].join('\n')}

## article_source_ids
${teachingResources.join('\n')}

## claim_ids
${articleItems.map(microClaimId).join('\n')}

## span_ids
${articleItems.map(microSpanId).join('\n')}

## university_notes
must: Global Q${articleItems.map((item) => item.q).join(', Q')} retain literal student-bank wording, option order and printed keys; the official MUST deck supplies teaching support but does not authenticate the bank key.

## annotations
${articleItems.map((item) => `### definition_of · ${item.conceptId}\nQuote: ${item.annotationQuote ?? item.support}\nBlock: body\nId: ann-must-fhb1022-micro-q${item.q}`).join('\n\n')}

## media


## publication_gate
needs_evidence

## evidence_basis
${[...new Set(articleItems.map((item) => `Official MUST FHB102-2 ${microTeachingTitle(item)} deck, visually read on exact cited pages.`))].join('\n')}
Absalam101 Part 1 revision bank, visually read on exact prompt and printed-answer pages.

## evidence_gaps
Independent standard-reference and medical review remain required before publication. All held questions have no student-facing projection.

## conflicts
No authored question has a teaching contradiction. The student-bank keys remain source evidence and were not promoted to authenticated faculty keys.

## last_reviewed


## review_due


## notes
Bounded Absalam subject slices only. Every record remains Draft and local; this file is not an upload instruction.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected ${article.topic ?? 'Microbiology'} node exists.
media: These questions are text-only and do not require student-facing media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after first medical review.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The listed relationships are reciprocal through standalone-complete records in this bounded import.`
  }))
}

function microQuestions() {
  return generatedItems(microItems.map((item) => {
    const correct = item.options['ABCD'.indexOf(item.key)]
    const explanation = `${item.claim} The official MUST teaching directly supports ${correct} for this prompt. Therefore ${item.key} is retained as the unchanged source-printed answer, pending medical review.`
    return `# Item

## id
${microQuestionId(item)}

## title
${item.stem}

## question
${item.stem}

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed verbatim from ${microAssessmentResource(item)}; printed key checked against ${microTeachingResource(item)} without treating the student bank as an authenticated faculty key.

## correct_answer
${item.key}

${item.options.map((option, index) => `## answer_${'abcd'[index]}\n${option}\n\n## explanation_${'abcd'[index]}\n${'ABCD'[index] === item.key ? explanation : `Incorrect. ${item.pitfalls} The supported answer is ${item.key}, ${correct}.`}`).join('\n\n')}

## topic
${microTopic(item)}

## subtopic
${microSubtopic(item)}

## main_concept
${item.conceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
30

## exam_relevance
6

## clinical_relevance
0.25

## academic_relevance
0.95

## exam_weight_by_year
MUST_Y1=0.45

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > ${microTopic(item)} > ${microSubtopic(item)} > ${item.microtopic}

## question_only_for
MUST_Y1

## library_ids
${microArticles[item.article]}

## resource_ids
${microAssessmentResource(item)}
${microTeachingResource(item)}

## learning_objective
${item.objective}

## source_citation
Absalam101 ${item.idPrefix ? 'Part 2' : 'Part 1'}, p${item.assessmentPage}, ${microBankLabel(item)} Q${item.bankQ}${item.idPrefix ? '' : ` (global Q${item.q})`}, printed key p${microAnswerPage(item)} (${item.bankQ} = ${item.key}); official MUST ${microTeachingTitle(item)}, p${item.teachingPage}.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed source key: ${microBankLabel(item)} Q${item.bankQ}${item.idPrefix ? '' : ` (global Q${item.q})`} = ${item.key}. Wording, options and key are preserved exactly. The bank is student-authored; the key was checked against official local teaching and was not promoted to faculty authority. This question remains Draft/local-only and is not authorised for upload.`
  }))
}

function microCoverage() {
  const delta = `### First Absalam Microbiology Ch1-3 slice delta

- +6 verified local-curriculum claims, +6 citations and +6 article spans for global Q62–Q67.
- +5 under-review / needs-evidence concepts; global Q65 and Q66 share the cellular-classification concept \`CON-INF-98A3DF2E20880C\` rather than minting duplicates.
- +2 standalone-complete reciprocal Draft articles and +6 Draft questions: global Q62, Q63, Q64, Q65, Q66 and Q67.
- +9 explicit holds with no student-facing record: global Q61 and Q68–Q75.
- Every authored stem, option and printed key is unchanged. The official MUST deck supplies teaching evidence but does not authenticate the student-authored bank key.
- First Absalam Microbiology Ch1-3 slice, global Q61–Q75: **6 authored / 9 held / 0 unassessed**.
- Absalam source global Q1–Q75: **36 authored / 39 held / 0 unassessed**. The next unassessed boundary is global Q76–Q90, the second half of Microbiology Chapters 1–3.

`
  const holds = `- **Q61 is held in the Absalam Microbiology Ch1-3 family as an authority/form hold.** The student bank prints B, “Study of microorganisms and their effects.” Official page 9 supplies the microbiology word derivation and defines microorganisms, but it does not state the keyed option's added “and their effects” wording. The key was not shortened, corrected or taught through a student-facing record.
- **Q68 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Mesosomes, follows the local deck's classical respiratory-enzyme teaching, but exact pending concept \`CON-INF-E4012E20B5A13D\` and article \`ART-INF-SURFACE-APPENDAGES-MESOSOMES\` already govern this identity and its historical uncertainty. No duplicate or unsafe cross-university dependency update was created.
- **Q69 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed D, All of the above, is directly supported by shape, structural-support and osmotic-protection statements on official page 28, but exact pending \`CON-INF-3FBC905C4F778F\` / \`ART-INF-CELL-WALL-OUTER-MEMBRANE\` already represents the identity. No student-facing record was created.
- **Q70 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed C, Flagella, is supported on official page 37, but exact pending \`CON-INF-83707B09F53803\` and broad \`ART-INF-SURFACE-APPENDAGES-MESOSOMES\` already govern bacterial motility. No duplicate was minted.
- **Q71 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Conjugation and adhesion, is supported by the official ordinary-pili and sex-pili distinction, but exact pending \`CON-INF-BC446C9816D9CE\` and its broad surface-appendages article already govern the identity. No student-facing record was created.
- **Q72 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Thick, is supported on official page 28, but \`CON-INF-7E3B831D71A008\`, raw candidates \`concept_5590f9ee7f2d30a322063e69\` and \`concept_c8d5af408cd7b5e10a8ed7d9\`, and the broad wall article already collide with the identity. No duplicate was minted.
- **Q73 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Lipopolysaccharide layer, is supported on official page 30, but pending \`CON-INF-7E3B831D71A008\`, \`CON-INF-BF26D7E563FB78\` and \`ART-INF-CELL-WALL-OUTER-MEMBRANE\` already govern the identity. No unsafe update was made.
- **Q74 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed C, Mycoplasma, is directly supported on official page 32, but pending \`CON-INF-271E9930B4B73A\`, \`CON-INF-D2C104EA01CE30\` and \`ART-INF-MYCOPLASMA-L-FORMS\` already govern the cell-wall-deficient identity. No duplicate was minted.
- **Q75 is held in the Absalam Microbiology Ch1-3 family as an authority hold.** The bank prints D, All of the above. Official page 38 explicitly supports heat and chemicals but does not mention radiation, while pending \`CON-INF-3E6590C8AC2166\` covers only the broader highly resistant endospore identity. The printed key was neither corrected nor promoted to student-facing content.

`
  const secondDelta = `### Second Absalam Microbiology Ch1-3 slice delta

- +3 verified local-curriculum claims, +3 citations and +3 article spans for global Q85, Q88 and Q90.
- +3 under-review / needs-evidence concepts. Q85 records raw candidate \`concept_0678baa786a55cfe68dc9d7f\` as a rejected broader merge without losing provenance; Q90 rejects carbapenem-specific raw candidate \`concept_2ea5d75f7d95e485adc3d8ef\`.
- +0 resources and +0 articles. The two existing standalone-complete reciprocal MUST Draft articles were expanded by exact ID without changing their identity or reciprocal relationship.
- +3 Draft questions: global Q85, Q88 and Q90.
- +12 explicit holds with no student-facing record: global Q76–Q84, Q86–Q87 and Q89.
- Every authored stem, option and printed key is unchanged, including Q88's “genetics composition” wording and the trailing colon in option D. The official MUST deck supplies teaching evidence but does not authenticate the student-authored bank key.
- Second Absalam Microbiology Ch1-3 slice, global Q76–Q90: **3 authored / 12 held / 0 unassessed**.
- Absalam source global Q1–Q90: **39 authored / 51 held / 0 unassessed**. The next unassessed boundary is global Q91–Q120, Microbiology Chapter 6.

`
  const secondHolds = `- **Q76 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed D, A & B, is supported by official page 38, but live \`CON-INF-3E6590C8AC2166\` and \`ART-INF-TOP-1181606D78\` already govern the spore-forming Bacillus-and-Clostridium identity. No duplicate or unsafe dependency update was created.
- **Q77 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed C, Protect against phagocytosis, is supported by official page 35, but live \`CON-INF-7789C0F6154E35\` and \`ART-INF-TOP-1181606D78\` already govern this capsule function. No duplicate or unsafe dependency update was created.
- **Q78 is held in the Absalam Microbiology Ch1-3 family as a non-unique key-form hold.** The bank prints B, Hydrolytic enzymes, but official page 30 places both peptidoglycan and hydrolytic enzymes in the Gram-negative periplasm. Both options A and B are therefore supported by the governed teaching; no answer was corrected and no student-facing record was created.
- **Q79 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Ribosomes, is supported by official page 34, but live \`CON-INF-AB3EC3956C007F\` and pending semantic twin \`CON-INF-29351FD540E214\` / \`ART-INF-BACTERIAL-MEMBRANE-RIBOSOME\` already govern bacterial protein synthesis. No duplicate or unsafe merge was created.
- **Q80 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed D, All of the above, is supported by official page 33, but pending \`CON-INF-16D6694E224671\` / \`ART-INF-BACTERIAL-MEMBRANE-RIBOSOME\` already govern the cytoplasmic-membrane function identity. No unsafe dependency update was created.
- **Q81 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Circular pieces of extra-chromosomal DNA, is supported by official page 36, but live \`CON-DEV-FE47A8F9B0768E\` / \`ART-DEV-TOP-39535C6C81\` already govern plasmid identity. No duplicate or cross-scope update was created.
- **Q82 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed A, Provide antibiotic resistance, is supported by official page 36, but pending \`CON-INF-134BE2C9B827D5\` / \`ART-INF-ANTIBIOTIC-RESISTANCE-MECHANISMS\` already govern plasmid-mediated resistance. No unsafe dependency update was created.
- **Q83 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Lack a cell wall, is supported by official page 32, but pending \`CON-INF-D2C104EA01CE30\` / \`ART-INF-MYCOPLASMA-L-FORMS\` already govern the L-form identity. No duplicate was minted.
- **Q84 is held in the Absalam Microbiology Ch1-3 family as a non-unique key-form hold.** The bank prints C, Mediate adherence, but governed raw concept \`concept_e33f14bb7abc2aa7188b82c8\` and official page 35 support both adherence and nutrient storage as glycocalyx functions. Options C and D are both supported; no answer was corrected and no student-facing record was created.
- **Q86 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Gram-negative bacteria, is supported by official page 30, but pending \`CON-INF-D60EAAF763C476\` / \`ART-INF-EXOTOXIN-ENDOTOXIN-SHOCK\` already govern endotoxin identity. No unsafe dependency update was created.
- **Q87 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed B, Penicillins, is supported by official pages 30 and 33, but pending \`CON-INF-64A7823DCEC6E5\` / \`ART-INF-ANTIBIOTIC-RESISTANCE-MECHANISMS\` already govern beta-lactamase resistance. No duplicate or unsafe dependency update was created.
- **Q89 is held in the Absalam Microbiology Ch1-3 family as an identity/dependency hold.** Printed A, Gram-positive cell walls, is supported by official page 30, but pending \`CON-INF-7E3B831D71A008\` / \`ART-INF-CELL-WALL-OUTER-MEMBRANE\` already govern the Gram-positive wall identity. No unsafe dependency update was created.

`
  const thirdDelta = `### Absalam Microbiology Chapter 6 delta

- +1 evidence resource: the official MUST Host-Microbe Relationship Chapter 6 deck, all 41 pages visually governed.
- +10 verified local-curriculum claims, +10 citations and +10 article spans for global Q94, Q95, Q99, Q102, Q104, Q105, Q110, Q115, Q116 and Q117.
- +10 under-review / needs-evidence concepts. Raw corpus identities retained as provenance never replace the narrower governed MUST records.
- +2 standalone-complete reciprocal Draft articles and +10 Draft questions.
- +20 explicit holds with no student-facing record: global Q91–Q93, Q96–Q98, Q100–Q101, Q103, Q106–Q109, Q111–Q114 and Q118–Q120.
- Every authored stem, option and printed key is unchanged. Q100 and Q111 are retained as uncorrected authority conflicts; no answer was silently corrected or taught through a student-facing record.
- Absalam Microbiology Chapter 6, global Q91–Q120: **10 authored / 20 held / 0 unassessed**.
- Absalam source global Q1–Q120: **49 authored / 71 held / 0 unassessed**. The next unassessed boundary is global Q121–Q150, the final 30-prompt family.

`
  const thirdHolds = `- **Q91 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, Normal flora, is supported by official page 3, but pending \`ART-INF-HOST-RELATIONSHIPS-NORMAL-FLORA\` already governs the normal-flora identity; no duplicate or unsafe cross-university article update was created.
- **Q92 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed C, Blood, is supported by official page 4, but pending sterile-site \`CON-INF-3E10BA25A4998E\` / \`ART-INF-HOST-RELATIONSHIPS-NORMAL-FLORA\` already governs this family. The lower-respiratory concept was not broadened into a different blood-site identity.
- **Q93 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed D, All of the above, is supported by official pages 5–6, but exact pending \`CON-INF-C8EE841CE9808D\` / \`ART-INF-HOST-RELATIONSHIPS-NORMAL-FLORA\` already govern normal-flora functions.
- **Q96 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed C, Both the microbe and host benefit, is supported by official page 10, but exact pending \`CON-INF-0B4BAFFD525FDF\` / \`ART-INF-HOST-RELATIONSHIPS-NORMAL-FLORA\` already govern mutualism.
- **Q97 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed C, Commensal, is supported by official page 11, but the same pending relationship concept/article governs commensalism and a nearby pending ASU question tests the same identity.
- **Q98 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed C, A virus causing disease in a human, is supported by official page 12, but the same pending relationship concept/article already governs parasitism.
- **Q100 is held in the Absalam Microbiology Chapter 6 family as an uncorrected teaching conflict.** The bank prints D, All of the above, but official page 15 gives only elimination by host defenses or incorporation into resident flora as colonization outcomes and treats infection as a separate branch. The printed key was neither corrected nor promoted to student-facing content.
- **Q101 is held in the Absalam Microbiology Chapter 6 family as an authority/form hold.** The bank prints B, “The invasion and growth of a microbe, causing harm,” but official pages 14–16 do not state that offered definition. No external definition was substituted.
- **Q103 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed A, The ability of an organism to cause disease, is supported by official page 18, but pending \`CON-INF-A6DFAC5D14B3D4\` / \`ART-INF-BACTERIAL-INVASION-PATHOGENICITY\` already govern pathogenicity.
- **Q106 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, Allowing bacteria to adhere to host cells, is supported by official page 20, but exact pending \`CON-INF-BC446C9816D9CE\` / \`ART-INF-SURFACE-APPENDAGES-MESOSOMES\` already govern ordinary-pilus adhesion.
- **Q107 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, Allowing bacteria to enter host cells, is supported by official page 22, but exact pending \`CON-INF-59379B20FF9F38\` / \`ART-INF-BACTERIAL-INVASION-PATHOGENICITY\` already govern invasins.
- **Q108 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, Hyaluronidase, is supported by official page 25, but pending \`CON-INF-1EAFF70A6FC769\` / \`ART-INF-BACTERIAL-INVASION-PATHOGENICITY\` already govern hyaluronidase among spreading factors.
- **Q109 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, It provides resistance to phagocytosis, is supported by official page 27, but live \`CON-INF-7789C0F6154E35\` and \`ART-INF-TOP-1181606D78\` already govern the capsule function.
- **Q111 is held in the Absalam Microbiology Chapter 6 family as an authority/wording conflict.** The bank prints B, “Released from the cell wall of Gram-negative bacteria,” while official page 34 calls endotoxin an integral part of bacterial cell walls and does not state the offered release wording. The key was not rewritten or silently taught.
- **Q112 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, They are highly antigenic, is supported by official page 34, but pending \`CON-INF-C87DF729E2ADDF\` / \`ART-INF-EXOTOXIN-ENDOTOXIN-SHOCK\` already govern the exotoxin/endotoxin identity.
- **Q113 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, B subunit, is supported by official pages 35–36, but the AB-exotoxin dependency chain already runs through \`CON-INF-F6DC0E99178186\` / \`ART-INF-EXOTOXIN-ENDOTOXIN-SHOCK\`; no unsafe broad update was made.
- **Q114 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, They stimulate a massive immune response, is supported by official page 38, but pending \`CON-INF-6F8D6DE961F269\` / \`ART-INF-MEMBRANE-TOXINS-SUPERANTIGENS\` already govern the superantigen mechanism.
- **Q118 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed A, Hemolysin, is supported by official page 37, but exact pending \`CON-INF-2A6CE8EF5F40F7\` / \`ART-INF-MEMBRANE-TOXINS-SUPERANTIGENS\` already govern membrane-disrupting hemolysins.
- **Q119 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, They trigger fever and inflammation, is supported by official pages 34–35, but pending \`CON-INF-D60EAAF763C476\` / \`ART-INF-EXOTOXIN-ENDOTOXIN-SHOCK\` already govern LPS-mediated host effects.
- **Q120 is held in the Absalam Microbiology Chapter 6 family as an identity/dependency hold.** Printed B, It leads to inflammation and tissue damage, is supported by official page 35, but the same pending endotoxin article chain already governs complement-mediated inflammation and cannot be duplicated safely.

`
  const fourthDelta = `### Absalam Pharmacology final-family delta

- +1 evidence resource: the 46-page locally supplied Antibiotics Introd Mechan teaching deck, already fully visually governed; the existing governed beta-lactam and vancomycin resource and Absalam assessment resource are reused.
- +19 verified local-curriculum claims, +19 citations and +19 article spans for global Q126–Q139, Q142, Q146, Q147, Q149 and Q150.
- +16 under-review / needs-evidence concepts. Q126/Q149 share the beta-lactam cell-wall identity; Q132/Q142/Q146 share the oral beta-lactamase-resistant antistaphylococcal dicloxacillin identity. Raw candidates are retained only as rejected-merge lineage.
- +2 standalone-complete reciprocal Draft articles and +19 Draft questions.
- +11 explicit holds with no student-facing record: global Q121–Q125, Q140, Q141, Q143–Q145 and Q148.
- Every authored stem, option and printed key is unchanged. Q145 remains an uncorrected teaching conflict; Q140, Q141, Q143, Q144 and Q148 remain exact precision or wording holds. No key was repaired or silently taught through a student-facing record.
- Absalam Pharmacology, global Q121–Q150: **19 authored / 11 held / 0 unassessed**.
- Absalam source global Q1–Q150: **68 authored / 82 held / 0 unassessed**. The source is fully dispositioned.

`
  const fourthHolds = `- **Q121 is held in the Absalam Pharmacology family as an identity/dependency hold.** Printed B, Treating infections caused by microorganisms, overlaps live concept \`CON-INF-25871D95E4E1D3\` and live article \`ART-INF-TOP-65C8E5125F\`. No duplicate concept or unsafe live-article update was created.
- **Q122 is held in the Absalam Pharmacology family as an exact duplicate hold.** Printed C, Kill bacteria and reduce bacterial load, duplicates live bactericidal concept \`CON-INF-1249475C90F47B\`; no second identity was minted.
- **Q123 is held in the Absalam Pharmacology family as a dependency hold.** Printed B, In immunocompromised patients, is supported by local teaching, but its broad antimicrobial-principles dependency overlaps live article \`ART-INF-TOP-65C8E5125F\`, whose complete relationship graph cannot be widened safely inside this bounded batch.
- **Q124 is held in the Absalam Pharmacology family as a dependency hold.** Printed C, A wide range of bacterial species, is supported by local teaching, but the necessary broad-spectrum definition belongs in the same unsafe live antimicrobial-principles dependency chain; no duplicate article was created.
- **Q125 is held in the Absalam Pharmacology family as a dependency hold.** Printed B, Antineoplastic, follows the local antibacterial/antiviral/antifungal category list, but the broad antimicrobial-category identity again overlaps the live antimicrobial-principles article and was not duplicated or overwritten.
- **Q140 is held in the Absalam Pharmacology family as an unsupported quantitative-authority hold.** The bank prints B, 5-15%, while governed local teaching states only that penicillin-cephalosporin cross-allergy may occur or is low and gives no exact rate. No number was inferred or imported.
- **Q141 is held in the Absalam Pharmacology family as an unsupported wording hold.** The bank prints B, A severe reaction that can be fatal. Governed teaching identifies penicillin anaphylaxis as the most serious hypersensitivity reaction but does not state the offered “can be fatal” wording. No external wording was substituted.
- **Q143 is held in the Absalam Pharmacology family as an unsupported precision hold.** The bank prints B, Staphylococcus aureus. Governed teaching supports beta-lactamase-producing staphylococci but does not state the offered species-level “commonly produce” formulation.
- **Q144 is held in the Absalam Pharmacology family as an unsupported category-form hold.** The bank prints B, Gram-negative aerobes. Governed teaching supports broader Gram-negative and antipseudomonal activity for carbenicillin and ticarcillin but does not state the exact “aerobes” category.
- **Q145 is held in the Absalam Pharmacology family as an uncorrected teaching conflict.** The bank prints B, Piperacillin + sulbactam. Governed teaching consistently gives piperacillin + tazobactam and ampicillin + sulbactam. The printed key was neither corrected nor promoted to student-facing content.
- **Q148 is held in the Absalam Pharmacology family as an unsupported formulation-wording hold.** The bank prints B, Procaine penicillin (Penicillin G), as a long-acting IM formulation. Governed teaching lists procaine penicillin as a depot IM preparation dosed every 12–24 hours but explicitly labels only benzathine penicillin as long-acting. No equivalence was inferred.

`
  const mosquitoDelta = `### Absalam Part 2 Mosquitoes Q1–Q30 delta

- +1 evidence resource: the 56-page Absalam101 Part 2 assessment bank; Mosquitoes prompts and options were visually governed on pages 1–8 and the printed answer table on page 9. The existing 47-page official MUST Mosquitoes teaching resource is reused.
- +22 verified local-curriculum claims, +22 citations and +22 article spans for Mosquitoes Q1–Q4, Q6–Q10, Q15, Q17–Q19, Q21–Q24 and Q26–Q30.
- +20 under-review / needs-evidence concepts. Q1 and Q2 share one mosquito-development identity, while Q29 reuses and safely expands the exact paratransgenesis concept rather than creating a duplicate.
- +3 standalone-complete reciprocal Draft articles and +22 Draft questions. The existing paratransgenesis article is expanded by exact ID without changing its identity or removing any prior content or relationships.
- +8 explicit identity/dependency holds with no student-facing record: Mosquitoes Q5, Q11–Q14, Q16, Q20 and Q25.
- Every authored stem, option and printed key is unchanged, including Q9's source spelling “Larve”. The student bank remains tier 3 assessment evidence; the official MUST deck supplies teaching evidence but does not authenticate the bank key.
- Absalam Part 2 Mosquitoes Q1–Q30: **22 authored / 8 held / 0 unassessed**. The next source boundary is Sandfly Q1–Q30 on assessment pages 10–18.

`
  const mosquitoHolds = `- **Mosquitoes Q5 is held as an identity/dependency hold.** Printed B, Thorax, is cleanly supported by official teaching page 6, but exact raw candidate \`concept_e5ff93a03d9d8361b0a8bbf1\` already occupies the identity. No duplicate or unsafe raw-candidate merge was created.
- **Mosquitoes Q11 is held as an identity/dependency hold.** Printed B, Malaria, is cleanly supported by official teaching pages 14–17, but exact raw candidates \`concept_7482060cb7f283619c078023\` and \`concept_c85bd6a9786422a574f8a50a\` already occupy this scope, which also overlaps the prior Part 1 Anopheles-malaria hold. No duplicate was minted.
- **Mosquitoes Q12 is held as a dependency-chain hold.** Printed B, Cyclopropagative, is cleanly supported by official teaching pages 14–15, but existing \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the same unsafe dependency chain that held prior Part 1 Q36 and Q42. No duplicate or partial exact-ID update was created.
- **Mosquitoes Q13 is held as an identity/dependency hold.** Printed C, Head, is cleanly supported by official teaching page 19, but exact raw candidate \`concept_67e667ad81d088a8265cb35b\` already occupies the identity. No duplicate or unsafe merge was created.
- **Mosquitoes Q14 is held as an identity/dependency hold.** Printed A, Long palp, is cleanly supported by official teaching page 27, but exact raw candidate \`concept_cfb7223e74ffec3dd67afaa0\` already occupies the identity. No duplicate or unsafe merge was created.
- **Mosquitoes Q16 is held as an identity/dependency hold.** Printed C, Bends upwards during penetration, is cleanly supported by official teaching page 27, but exact raw candidate \`concept_a0aff0c30fa4c2646a6e9ddf\` already occupies the identity. No duplicate or unsafe merge was created.
- **Mosquitoes Q20 is held as an identity/dependency hold.** Printed C, 3, is cleanly supported by official teaching pages 14–15, but exact raw candidates \`concept_d4f5e10459aea16bd4fe67ac\` and \`concept_e3a15998a42152b368395e79\` already occupy the salivary-gland and lobe-count scope. No duplicate or unsafe merge was created.
- **Mosquitoes Q25 is held as an identity/dependency hold.** Printed A, Eggs are laid singly, is cleanly supported by official teaching page 41, but exact raw candidate \`concept_56ba665277758beb236f7371\` already occupies the identity. No duplicate or unsafe merge was created.

`
  const sandflyDelta = `### Absalam Part 2 Sandfly Q1–Q30 delta

- The existing 56-page Absalam101 Part 2 assessment resource and the existing 34-page official MUST Sandfly teaching resource are reused; no new resource or download was created. Assessment pages 10–17 and answer page 18 were rendered and visually read, and the teaching pages cited below were visually checked.
- +19 verified local-curriculum claims, +19 citations and +19 article spans for Sandfly Q1–Q11, Q13, Q14, Q21, Q23, Q24, Q26, Q27 and Q30.
- +14 under-review / needs-evidence concepts. Q3/Q4 share one development identity, Q9/Q11 share one Harrara identity, Q13/Q14 share one disease-profile identity, and Q21/Q23/Q24 share one Oroya-fever identity.
- +3 standalone-complete reciprocal Draft articles and +19 Draft questions.
- +11 explicit dependency, authority or key-conflict holds with no student-facing record: Sandfly Q12, Q15–Q20, Q22, Q25, Q28 and Q29.
- Every authored stem, option and printed key is unchanged. Q5 retains the assessment spelling “papatasi” while disclosing the teaching deck's “papatasii” spelling. Sandfly Q29 remains an uncorrected direct key conflict: the bank prints D, None of the above, while the official deck directly supports B, DDT.
- Absalam Part 2 Sandfly Q1–Q30: **19 authored / 11 held / 0 unassessed**. The exact next Part 2 boundary is Mycology Q1–Q30 on assessment pages 19–29.

`
  const sandflyHolds = `- **Sandfly Q12 is held as a dependency-chain hold.** Printed B, Cyclo-propagative, is cleanly supported by official teaching pages 10 and 12, but existing \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the established unsafe dependency chain. No duplicate or partial exact-ID update was created.
- **Sandfly Q15 is held as a dependency-chain hold.** Printed B, Promastigote, is supported by official teaching pages 12–13, but the infective-stage identity belongs to the existing cutaneous-leishmaniasis concept/article chain \`CON-INF-5EAC54C4EC6F18\` / \`ART-INF-MUST-FHB1022-CUTANEOUS-LEISHMANIASIS-VECTOR\`. No duplicate was minted.
- **Sandfly Q16 is held as a dependency-chain hold.** Printed B, By the bite of an infected female sandfly, is supported by official teaching page 15, but the same live cutaneous-leishmaniasis vector chain already governs transmission and cannot be partially widened safely here.
- **Sandfly Q17 is held as a dependency-chain hold.** Printed D, All of the above, is supported by the official leishmaniasis classification, but the broad disease-type identity overlaps the same existing live article chain and was not duplicated.
- **Sandfly Q18 is held as a dependency-chain hold.** Printed B, Macrophages of the skin, is supported by official teaching page 24, but it overlaps the existing cutaneous-leishmaniasis concept/article identity. No second concept was created.
- **Sandfly Q19 is held as a dependency-chain hold.** Printed B, By manipulating macrophage signaling and lysosomal response, is supported by official teaching pages 17–19, but macrophage invasion and evasion belong to the same existing live dependency chain. No unsafe partial update was made.
- **Sandfly Q20 is held as a dependency-chain hold.** Printed B, Raised borders and a crusted surface, is supported by official teaching page 24, but the lesion morphology already belongs to the existing cutaneous-leishmaniasis article identity.
- **Sandfly Q22 is held as a dependency-chain hold.** Printed A, Amastigote, is supported by official teaching pages 18–19, but promastigote-to-amastigote transformation is already part of the same live cutaneous-leishmaniasis chain and was not duplicated.
- **Sandfly Q25 is held as a negative-form authority hold.** The bank prints D, Respiratory distress, but the governed teaching defines the Oroya-fever profile without explicitly establishing this option as the uniquely uncommon manifestation. No exclusion was inferred.
- **Sandfly Q28 is held as an unsupported-precision hold.** The bank prints D, Introducing genetically modified bacteria, while official teaching page 32 only names paratransgenesis and the governed existing definition uses symbiont bacteria without the offered genetic-modification wording. No precision was invented.
- **Sandfly Q29 is held as an uncorrected direct key conflict.** The bank prints D, None of the above, while official teaching page 32 directly lists DDT, option B, for sandfly control. The printed key was neither corrected nor taught through a student-facing record.

`
  const mycologyDelta = `### Absalam Part 2 Mycology Q1–Q30 delta

- The existing 56-page Absalam101 Part 2 assessment resource and existing 34-page official MUST General Mycology resource are reused; no new resource or download was created. Assessment pages 19–28, answer page 29 and all 34 teaching pages were rendered and visually read.
- +12 verified local-curriculum claims, +12 citations and +12 article spans for Mycology Q1, Q7, Q8, Q12, Q16, Q19–Q22 and Q25–Q27.
- +10 under-review / needs-evidence concepts. Q16/Q25 share the fungal-PCR identity and Q20/Q21 share the fungal-spore-allergy identity.
- +3 standalone-complete reciprocal Draft articles and +12 Draft questions.
- +18 explicit identity, authority, wording or key-conflict holds with no student-facing record: Mycology Q2–Q6, Q9–Q11, Q13–Q15, Q17, Q18, Q23, Q24 and Q28–Q30.
- Every authored stem, option and printed key is unchanged. Q20 retains “is a causes” and Q27 retains “a opportunistic” transparently. Q30 remains held because official teaching does not support assigning bacterial-contamination inhibition to cycloheximide alone.
- Absalam Part 2 Mycology Q1–Q30: **12 authored / 18 held / 0 unassessed**. The exact next Part 2 boundary is Virology Q1–Q30 on assessment pages 30–38.

`
  const mycologyHolds = `- **Mycology Q2 is held as an identity/dependency hold.** Printed C, They lack a true nucleus, is the clean negative-form answer, but exact raw fungal-structure identity \`concept_60605d2cc13f26f4d4e1d67a\` and the pending broad fungal chain already govern eukaryotic organisation.
- **Mycology Q3 is held as an identity/dependency hold.** Printed B, Ergosterol, is supported but belongs to the same exact raw and pending broad fungal-structure chain.
- **Mycology Q4 is held as an unsupported-generalization hold.** Printed B says fungi reproduce by budding and spore formation, while general teaching establishes spores and shows budding only for Candida. No general budding claim was inferred.
- **Mycology Q5 is held as an identity/dependency hold.** Printed D, Plasmodium, is excluded by the official mold/yeast/dimorphic classification, but exact raw identity \`concept_ec1d090ce380eb51d14070d9\` already occupies the scope.
- **Mycology Q6 is held as an identity/dependency hold.** Printed B, both yeast and filamentous forms, is supported but exact raw dimorphism identity \`concept_0931b39113de00d4b6e3a247\` already occupies the scope.
- **Mycology Q9 is held as an authority/wording hold.** The bank says disease occurs “only” in immunocompromised individuals; teaching describes opportunistic infection under certain conditions and does not support that absolute qualifier.
- **Mycology Q10 is held as an identity/dependency hold.** Printed C, Histoplasma capsulatum, is the official example but belongs to the existing exact raw dimorphism identity.
- **Mycology Q11 is held as an unsupported-precision hold.** The lecture lists mycosis categories but does not define superficial mycosis by the bank's skin, hair and nail wording.
- **Mycology Q13 is held as an identity/dependency hold.** India ink demonstration of the Cryptococcus capsule is supported, but the exact raw diagnostic identity already exists.
- **Mycology Q14 is held as an identity/dependency hold.** KOH digestion of keratin is supported, but a governed cross-university fungal-diagnosis chain already occupies the exact identity.
- **Mycology Q15 is held as an identity/dependency hold.** Sabouraud dextrose agar for fungal isolation is supported but already governed by the exact cross-university Sabouraud chain.
- **Mycology Q17 is held as an identity/dependency hold.** Printed A, It stains fungal cells black, is supported, but the exact raw GMS/silver-stain identity already exists.
- **Mycology Q18 is held as an identity/dependency hold.** Latex agglutination detection of fungal antigen in CSF is supported, but the existing raw fungal-antigen diagnostic chain occupies the identity.
- **Mycology Q23 is held as an identity/dependency hold.** Sabouraud selectivity is the same existing Sabouraud identity that holds Q15.
- **Mycology Q24 is held as an identity/dependency hold.** Latex agglutination detection of fungal antigens is the same existing identity that holds Q18.
- **Mycology Q28 is held as an identity/dependency hold.** Printed B, structural component of the cell wall, is supported but already belongs to exact raw fungal-structure identity \`concept_60605d2cc13f26f4d4e1d67a\` and its broad pending chain.
- **Mycology Q29 is held as an identity/dependency hold.** Printed C, Viral, is excluded by the official mycosis categories, but exact raw identity \`concept_e01cc670b0ccd38700d65d86\` already occupies the scope.
- **Mycology Q30 is held as an uncorrected authority/key conflict.** The bank prints B, Inhibits bacterial contamination. Official page 30 attributes bacterial-contamination minimisation and saprophytic-fungus suppression to the combined addition of chloramphenicol and cycloheximide and does not assign the bacterial effect to cycloheximide alone. The printed key was neither corrected nor promoted.

`
  const virologyDelta = `### Absalam Part 2 Virology Q1–Q30 delta

- +1 evidence resource: the official 60-page MUST General Virology Chapter 8 deck, all pages rendered and visually read. The existing Absalam Part 2 assessment resource is reused; assessment pages 30–37 and printed answers on page 38 were visually read.
- +3 verified local-curriculum claims, +3 citations and +3 article spans for Virology Q2, Q5 and Q26.
- +3 under-review / needs-evidence concepts and +2 standalone-complete reciprocal Draft articles.
- +3 Draft questions and +27 explicit identity, dependency, authority-form or key-form holds with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q14 remains a non-unique key-form hold because the teaching supports B, C and D during eclipse; Q25 remains an unsupported comparative-authority hold. No key was repaired.
- Absalam Part 2 Virology Q1–Q30: **3 authored / 27 held / 0 unassessed**.

`
  const virologyHolds = `- **Virology Q1 is held as an identity/dependency hold.** Printed C is supported, but live \`CON-INF-1165F8B9564697\` and \`ART-INF-VIRAL-STRUCTURE-CAPSID-ENVELOPE-VIROID\` already govern the DNA-or-RNA viral-property identity; no duplicate or partial live-article update was created.
- **Virology Q3 is held as an exact identity/dependency hold.** Printed C is supported, but the same live general-properties concept already states that a viral genome is DNA or RNA, never both.
- **Virology Q4 is held as an identity/dependency hold.** Printed B is supported, but live structure concepts including \`CON-INF-9C0D5FBED79267\` already occupy the nucleic-acid/capsid/envelope composition chain.
- **Virology Q6 is held as an identity/dependency hold.** Printed A is supported, but live envelope concept \`CON-INF-7952070C4BD8AF\` and the existing viral-structure article already govern envelope susceptibility.
- **Virology Q7 is held as a raw-identity hold.** Printed B is supported, but exact raw candidate \`concept_6a9ebe37944de9e2c237a143\` already occupies bacteriophage head-and-tail morphology.
- **Virology Q8 is held as an exact live-identity hold.** Printed B is supported, but \`CON-INF-6EE705523FD61C\` already governs circular RNA without a protein coat.
- **Virology Q9 is held as an exact live-identity hold.** Printed C is supported, but \`CON-INF-7952070C4BD8AF\` already governs host-membrane derivation of the viral envelope. The source's stray leading “W” was recorded but not normalized into a question.
- **Virology Q10 is held as an exact live-identity hold.** Printed B is supported, but \`CON-INF-1165F8B9564697\` already governs viral non-susceptibility to antibiotics.
- **Virology Q11 is held as a raw-identity hold.** Printed C is supported, but raw classification candidate \`concept_3df1ddd197fac04c440106f5\` already occupies viral classification criteria.
- **Virology Q12 is held as a raw-identity hold.** Printed B is supported by official pages 21–22, but raw \`concept_2fa34c2867939a07564033a1\` already governs herpesviruses as double-stranded DNA viruses.
- **Virology Q13 is held as a raw-identity hold.** Printed A is supported, but raw \`concept_965009168cb0925e5509b54a\` already governs the segmented rotavirus genome.
- **Virology Q14 is held as a non-unique key-form conflict.** The bank prints D, but official page 26 also supports option B, structural-protein synthesis, and option C, genome replication, during the eclipse period. No option was corrected or promoted.
- **Virology Q15 is held as a dependency-chain hold.** Printed B is supported, but budding/release belongs to existing \`ART-INF-VIRAL-CULTURE-DETECTION-ENTRY-REPLICATION\`; no partial exact-ID article update was created.
- **Virology Q16 is held as a dependency-chain hold.** Printed B is supported, but the isolation-system scope belongs to the same existing viral culture/replication article chain.
- **Virology Q17 is held as an exact live-identity hold.** Printed D is supported, but \`CON-INF-CE64E7CD7B4393\` already governs receptor, proteolytic-enzyme and local-condition determinants of cell tropism.
- **Virology Q18 is held as an exact live-identity hold.** Printed A is supported, but \`CON-INF-8989679385BD3C\` already governs rabies-associated Negri bodies.
- **Virology Q19 is held as a raw-identity hold.** Printed C is supported, but \`concept_9158d0ea377c345d36c8b7e9\` already states that IgM indicates recent primary infection.
- **Virology Q20 is held as a raw-identity hold.** Printed B is supported, but \`concept_f66e9e09c6cf77d93e704b57\` already governs the interferon-induced antiviral state in uninfected cells.
- **Virology Q21 is held as a raw-identity hold.** Printed A is supported, but viral-antigen ELISA candidates including \`concept_22df42119d8b19b9b2da0f12\` already occupy the diagnostic identity.
- **Virology Q22 is held as a raw-identity hold.** Printed B is supported, but raw cytopathic-effect identities including \`concept_540c5b040f5782052b027c0a\` already govern morphological changes in infected culture cells.
- **Virology Q23 is held as a raw-identity hold.** Printed B is supported, but exact \`concept_9bc7df59ff7b140112a1e52e\` already governs Sabin as a live attenuated vaccine.
- **Virology Q24 is held as a raw-identity hold.** Printed B is supported, but exact \`concept_b4c15496b4ae04abc15d36b8\` already governs mRNA delivery of an immunizing protein code.
- **Virology Q25 is held as an unsupported comparative-authority hold.** The bank prints A, but official teaching distinguishes active and passive immunization without stating that active immunization is the uniquely “most effective” long-term method.
- **Virology Q27 is held as a raw-identity hold.** Printed B is supported, but raw viral-cytology candidates including \`concept_d2eff968111204a7d8263fed\` already govern syncytia formation.
- **Virology Q28 is held as a raw-identity hold.** Printed C is supported, but exact \`concept_d11e2f053f9ed77216024361\` already governs hemagglutination inhibition.
- **Virology Q29 is held as a raw-identity hold.** Printed B is supported, but existing vaccine-platform and subunit candidates including \`concept_aa94332d7b3ae24367c3fff0\` already occupy the identity.
- **Virology Q30 is held as a raw-identity hold.** Printed B is supported, but exact \`concept_08c5f780c446991dba7ada3a\` already governs viral-vector delivery of foreign genetic material.

`
  const chapter10Delta = `### Absalam Part 2 Microbiology Chapter 10 Q1–Q30 delta

- +1 evidence resource: the official 25-page MUST General Characteristics of Medically Relevant Bacteria Chapter 10 deck, all pages rendered and visually read. The existing Absalam Part 2 assessment resource is reused; assessment pages 39–46 and the printed answer table on page 47 were visually read.
- +19 verified local-curriculum claims, +19 citations and +19 article spans for Chapter 10 Q1–Q3, Q6, Q7, Q9–Q11, Q13–Q19 and Q26–Q29.
- +13 under-review / needs-evidence concepts and +3 standalone-complete reciprocally linked Draft articles.
- +19 Draft questions and +11 exact identity, unsupported-precision or key-conflict holds with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q25 remains an uncorrected key conflict; Q20, Q21, Q24 and Q30 remain unsupported precision holds. No key was repaired.
- Absalam Part 2 Microbiology Chapter 10 Q1–Q30: **19 authored / 11 held / 0 unassessed**. The exact next boundary is Part 2 Pharmacology Q1–Q30 on pages 48–56.

`
  const chapter10Holds = `- **Chapter 10 Q4 is held as an exact live-identity/dependency hold.** Printed B is supported, but live \`CON-INF-329FB33012ABFC\` and \`CON-INF-542EE15AEA860B\` already govern coagulase as a principal S. aureus marker and the coagulase-positive versus coagulase-negative division. No duplicate or partial live-article update was created.
- **Chapter 10 Q5 is held as an exact live-identity/dependency hold.** Printed C is supported, but the same live coagulase classification chain already governs S. aureus as coagulase positive.
- **Chapter 10 Q8 is held as an exact live-identity hold.** Printed C is supported, but live \`CON-INF-DED05E5A2620BC\` already governs mannitol salt agar and S. aureus mannitol fermentation.
- **Chapter 10 Q12 is held as an exact live-identity hold.** Printed B is supported, but live \`CON-INF-6B7D8A0C6A464E\` already governs Lancefield classification by group-specific cell-wall carbohydrate antigen.
- **Chapter 10 Q20 is held as an unsupported species/morphology precision hold.** The bank prints B, Corynebacterium diphtheriae. The official Chapter 10 deck places Corynebacterium among non-spore-forming Gram-positive bacilli but does not state the offered club-shaped “Chinese letters” morphology or authenticate the species-level key.
- **Chapter 10 Q21 is held as an unsupported species precision hold.** The bank prints C, Clostridium perfringens. The official classification tree supports Clostridium generally as anaerobic, spore-forming Gram-positive bacilli but does not make the offered species-level statement.
- **Chapter 10 Q22 is held as an exact live-identity hold.** Printed B is supported, but live \`CON-INF-B08918C582699C\` already governs S. epidermidis among coagulase-negative staphylococci.
- **Chapter 10 Q23 is held as an exact pending-identity hold.** Printed B is supported, but pending \`CON-INF-8C390C9DA26E6D\` already governs coagulase conversion of fibrinogen to fibrin. No duplicate question dependency was minted.
- **Chapter 10 Q24 is held as an unsupported precision hold.** The bank prints C, Capsulated. The official Chapter 10 deck does not state capsulation of Clostridium perfringens, so no external fact was substituted.
- **Chapter 10 Q25 is held as an uncorrected key conflict.** The bank prints A, Nocardia, while the official deck identifies S. epidermidis as a skin commensal and provides no support for Nocardia as the keyed skin-flora opportunist. Although option C may appear plausible externally, it is not taught by this governed deck; no answer was corrected or silently taught.
- **Chapter 10 Q30 is held as an unsupported genus/key-form hold.** The bank prints C, Bacillus. The official classification tree supports Bacillus as aerobic, spore-forming Gram-positive bacilli but does not state the offered combined nonmotile, chain-forming genus description.

`
  const pharmacologyPart2Delta = `### Absalam Part 2 Pharmacology Q1–Q30 delta

- +1 evidence resource: the official 36-page MUST Cell Wall and Cell Membrane Inhibitors deck, all pages rendered and visually read. The existing Absalam Part 2 assessment resource is reused; assessment pages 48–55 and the printed answer table on page 56 were visually read.
- +22 verified local-curriculum claims, +22 citations and +22 article spans for Pharmacology Q1, Q3, Q5, Q6, Q8–Q17, Q19–Q21, Q23–Q25, Q27 and Q30.
- +10 under-review / needs-evidence concepts, with exact reuse of three governed local concepts, and +3 standalone-complete reciprocally linked Draft articles.
- +22 Draft questions and +8 authority, ambiguity, conflict or non-unique-form holds with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q26 remains an uncorrected generation/spectrum conflict or ambiguity; Q28 remains non-unique under the governed resistance teaching. No key was repaired.
- Absalam Part 2 Pharmacology Q1–Q30: **22 authored / 8 held / 0 unassessed**. All 56 pages and all six Part 2 thirty-prompt families are now fully dispositioned.

`
  const pharmacologyPart2Holds = `- **Pharmacology Q2 is held as an unsupported compound-use hold.** Printed C combines surgical prophylaxis with skin infections. The official deck directly supports cefazolin surgical prophylaxis but does not state the full keyed compound wording including skin infections; no partial answer was promoted.
- **Pharmacology Q4 is held as an unsupported compound-use hold.** Printed B combines meningitis with sepsis. The official deck directly supports ceftriaxone entry into the CNS and use in meningitis but does not state the full keyed compound wording including sepsis.
- **Pharmacology Q7 is held as a generation/spectrum ambiguity hold.** Printed D names fourth generation as the broadest spectrum including resistant Gram-positive and Gram-negative bacteria, while the official deck separately assigns fourth-generation resistant streptococcal/staphylococcal and nosocomial coverage and fifth-generation MRSA/VRSA coverage. It does not support the keyed superlative as written.
- **Pharmacology Q18 is held as an unsupported negative-closure hold.** Printed C, hepatotoxicity, is absent from the deck's vancomycin adverse-effect list, but absence alone does not establish a safe universal “NOT” answer and hypotension overlaps the source's histamine-mediated shock wording.
- **Pharmacology Q22 is held as an unsupported comparative-causation hold.** Printed B, beta-lactamase production, is mechanistically relevant in the governed slides, but the official deck does not establish it as the singular “primary reason” for beta-lactam resistance across the class.
- **Pharmacology Q26 is held as an uncorrected generation/spectrum conflict or ambiguity.** Printed D names fifth generation as broadest including resistant Gram-negative organisms. The deck assigns fifth-generation ceftaroline MRSA/VRSA coverage while fourth generation and cefiderocol carry separate resistant Gram-negative statements; no answer was corrected or silently reconciled.
- **Pharmacology Q28 is held as a non-unique/absolute-form hold.** Printed B, aztreonam, is described as resistant to beta-lactamase from most Gram-negative bacteria, but the deck also describes fourth-generation cephalosporin resistance and does not support the absolute “not susceptible” wording as uniquely true.
- **Pharmacology Q29 is held as an unsupported superlative-use hold.** Printed B, vancomycin, is supported for resistant Gram-positive infection including MRSA, but the official deck does not state that it is the singular “last-resort antibiotic” for resistant infections.

`
  const mucizeParasitologyDelta = `### Mucize Doctors Parasitology core Q1–Q30 delta

- +1 governed assessment resource: the 47-page student-authored Mucize Doctors bank. All pages were already governed in triage; physical pages 6–10 were rendered and visually re-read for this exact boundary.
- +8 verified local-curriculum claims, +8 citations and +8 article spans for Q3, Q5, Q8, Q9, Q11, Q15, Q28 and Q29.
- +0 concepts and +0 articles. All eight questions reuse exact governed MUST concept and reciprocal Draft article identities; those complete records are expanded by exact ID without dropping prior content, universities, relationships or question links.
- +8 Draft questions and +21 explicit identity, dependency, negative-closure, unsupported-precision or malformed-form holds with no student-facing record.
- +1 source-absent disposition: Q25 has a complete prompt, but its same-page answer row skips Q25 and visibly prints “35.B”; no answer was inferred, corrected or renumbered.
- Every authored stem, option and printed key is unchanged. The Mucize carrier identifies itself as student-to-student material and directs readers to official faculty resources; its answer lines remain source evidence rather than authenticated faculty keys.
- Mucize Parasitology core Q1–Q30: **8 authored / 21 held / 1 source-absent / 0 unassessed**. The exact next boundary is Mucize Parasitology Q31.

`
  const mucizeParasitologyHolds = `- **Mucize Parasitology Q1 is held as an identity/authority hold.** Printed C is directionally supported, but raw medical-parasitology scope identities \`concept_67e3dcb99284cae795d4cf8f\` and \`concept_8de933ca4fcbba40f533edac\` overlap the same broad definition; no duplicate concept was minted.
- **Mucize Parasitology Q2 is held as a broad negative-closure/authority hold.** Printed C excludes bacterial infections from the listed parasitology objectives, but the official introduction deck does not state the offered closed “NOT” set as a single authenticated answer.
- **Mucize Parasitology Q4 is held as an identity hold.** Printed B is supported, but exact raw identity \`concept_4cf60f293dd2603501b07838\` already states that the definitive host carries adult or sexual stages; no duplicate was minted.
- **Mucize Parasitology Q6 is held as an unsupported compound-purpose hold.** Printed C combines disease pathogenesis, diagnosis and prevention. The official deck supports life-cycle study and its practical importance but does not state this full three-part option as a single governed teaching claim.
- **Mucize Parasitology Q7 is held as a malformed negative-closure hold.** The source duplicates option label B and asks which route is NOT common. The entry-route slides do not establish a safe universal exclusion for hair-follicle absorption; the key was not normalized or inferred.
- **Mucize Parasitology Q10 is held as an identity/dependency hold.** Printed B is supported by the protozoan classification, but no exact governed local atomic concept/article dependency for “unicellular parasite = Protozoa” can be added without duplicating broader raw identities.
- **Mucize Parasitology Q12 is held as an identity/ambiguity hold.** Printed B is directionally supported by the locomotion slide, but raw \`concept_9dc1156f5fddd3a2c18a42af\` already governs the four-group classification and the broader teaching also uses morphology, reproduction and habitat.
- **Mucize Parasitology Q13 is held as an identity/dependency hold.** Printed C is standard terminology, but the bounded governed records do not contain an exact atomic Helminthology-definition identity and no duplicate terminology concept was minted.
- **Mucize Parasitology Q14 is held as an unsupported closed-classification hold.** Printed A includes Insecta, Arachnida and Crustacea, while the selected official teaching directly governs Insecta and Arachnida but does not establish this exact three-class closed set.
- **Mucize Parasitology Q16 is held as an identity hold.** Printed B is supported, but raw \`concept_7482060cb7f283619c078023\` and \`concept_c85bd6a9786422a574f8a50a\` already represent Anopheles transmission of malaria.
- **Mucize Parasitology Q17 is held as a negative-closure hold.** Printed C identifies scorpion, but the selected teaching does not authenticate the offered universal “NOT a vector of disease” closure across all options and contexts.
- **Mucize Parasitology Q18 is held as an identity hold.** Printed B is supported, but exact raw \`concept_a42b36f3cee0d189109260e7\` already governs propagative multiplication without development.
- **Mucize Parasitology Q19 is held as an identity hold.** Printed B is supported, but raw \`concept_029a51c793d756b91bf5e550\` and \`concept_a0958f268e6d2701352c57da\` already define myiasis as living-tissue infestation by fly larvae.
- **Mucize Parasitology Q20 is held as a scope/dependency hold.** Printed A is supported for furuncular myiasis, but the existing local Dermatobia concept governs a broader cutaneous-myiasis genus set rather than this furuncular identity; it was not silently broadened.
- **Mucize Parasitology Q21 is held as an identity hold.** Printed C is supported, but raw \`concept_a5e0413816dbec96b1178762\` already governs facultative myiasis in diseased or dead tissue.
- **Mucize Parasitology Q22 is held as an unsupported superlative hold.** Printed B names Calliphora as “most associated” with forensic investigations, while governed teaching supports multiple fly genera and does not establish that singular superlative.
- **Mucize Parasitology Q23 is held as an identity/precision hold.** Printed B names Wohlfahrtia, while raw \`concept_e7b846627f08540d850c1978\` already governs traumatic myiasis and the bounded official evidence does not safely narrow the whole identity to the offered genus.
- **Mucize Parasitology Q24 is held as an identity hold.** Printed B is supported, but raw \`concept_8d9cafb99baef390a663df18\` and \`concept_8f98d380a95e2bd806b1f319\` already govern accidental ingestion and intestinal myiasis.
- **Mucize Parasitology Q26 is held as an identity hold.** Printed B is supported, but raw \`concept_7bf8806533d667d1cd65b96a\` already connects Glossina tsetse flies with African trypanosomiasis.
- **Mucize Parasitology Q27 is held as an identity hold.** Printed A is supported as mechanical carriage, but raw \`concept_012efb068aac441646ea164f\` and \`concept_ed540a67619ad2d979d7558f\` already govern Musca domestica carriage and contamination.
- **Mucize Parasitology Q30 is held as an unsupported symptom-precision hold.** Printed B gives skin nodules with central pores, but the selected governed local cutaneous-myiasis concept/article does not independently state that exact symptom formulation.

`
  const mucizeParasitologySecondDelta = `### Mucize Doctors Parasitology core Q31–Q60 delta

- The governed Mucize assessment resource is reused. Physical pages 10–14 were rendered and visually read for every prompt, option and same-page answer token in Q31–Q60.
- +16 verified local-curriculum claims, +16 citations and +16 article spans for Q31, Q38, Q41–Q49, Q54, Q57–Q60.
- +9 under-review / needs-evidence concepts and +0 articles. Seven questions safely reuse exact governed local concepts; the existing standalone-complete reciprocal Draft articles are expanded by exact ID without dropping prior fields, universities, relationships or question links.
- +16 Draft questions and +14 explicit identity, duplicate, dependency-chain, negative-closure, unsupported-superlative, non-unique-key or teaching-conflict holds with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q34 and Q39 remain uncorrected key-form or teaching conflicts; Q35 and Q52 remain in the established cyclopropagative dependency-chain hold. The Mucize answer lines remain student-bank evidence rather than authenticated faculty keys.
- Mucize Parasitology core Q31–Q60: **16 authored / 14 held / 0 source-absent / 0 unassessed**.
- Mucize Parasitology core Q1–Q60 cumulative: **24 authored / 35 held / 1 source-absent / 0 unassessed**. The exact next boundary is Mucize Parasitology Q61.

`
  const mucizeParasitologySecondHolds = `- **Mucize Parasitology Q32 is held as a negative-closure hold.** Printed C, Using antibiotics, is absent from the official prevention list, but the governed deck does not authenticate the offered universal “NOT a method” closure; no answer was inferred from omission.
- **Mucize Parasitology Q33 is held as a raw-identity hold.** Printed B is supported, but exact raw \`concept_25690ce10dd47faf309ae1f3\` already governs aural myiasis as maggot infestation of the ear; no duplicate concept was minted.
- **Mucize Parasitology Q34 is held as a non-unique key-form conflict.** The bank prints B, Housefly, while official teaching states that myiasis-causing fly larvae generally are identified by characteristic posterior spiracles. Option C is therefore also supported by the governed teaching; the key was not corrected or promoted.
- **Mucize Parasitology Q35 is held as an established dependency-chain hold.** Printed B is directly supported and maps to \`CON-INF-23265735EECCA1\`, but the cyclopropagative article's retained live relationship graph cannot pass the focused dependency contract without importing unrelated content or dropping a relation. Neither action was taken.
- **Mucize Parasitology Q36 is held as an unsupported terminology hold.** The student bank prints B, Entomophobia, but the selected MUST arthropod teaching does not define fear-of-insects terminology; no external definition was substituted.
- **Mucize Parasitology Q37 is held as an unsupported superlative hold.** Official teaching lists fly control or eradication among several myiasis-prevention measures but does not establish it as the singular “main method.” The printed B was preserved only as source evidence.
- **Mucize Parasitology Q39 is held as an uncorrected teaching conflict.** The bank prints B, Biological requires pathogen multiplication inside the vector, but official teaching includes cyclodevelopmental biological transmission with development and no multiplication. No key or wording was repaired.
- **Mucize Parasitology Q40 is held as an exact same-source identity duplicate.** Its printed C, Diptera, is supported, but Mucize Q15 already authors the complete Class Insecta / Order Diptera mosquito classification against \`CON-INF-4EEE8525216319\`; no second same-source taxonomy record was minted.
- **Mucize Parasitology Q50 is held as a raw-identity hold.** Printed C is supported, but raw \`concept_7482060cb7f283619c078023\` already governs Anopheles transmission of malaria sporozoites; no duplicate identity was created.
- **Mucize Parasitology Q51 is held as a host-direction ambiguity and raw-identity hold.** Printed B, Sporozoite, is the stage inoculated into humans, while gametocytes are taken up by the mosquito. The stem says only “in malaria transmission,” and raw \`concept_77cb95db160e84cced2b2efb\` and \`concept_d4f5e10459aea16bd4fe67ac\` already govern the human-infective sporozoite identity. No host was inferred.
- **Mucize Parasitology Q52 is held as an established dependency-chain hold.** Printed B, Cyclo-propagative, is supported for Plasmodium development and multiplication inside Anopheles, but the same unsafe cyclopropagative article dependency chain prevents a focused-gate-clean exact-ID update.
- **Mucize Parasitology Q53 is held as a raw-identity/precision hold.** Printed D, Ring stage, is shown as one diagnostic blood stage, but official teaching also displays an amoeboid diagnostic stage and raw \`concept_ebc42effc375d0fa2f2c8985\` already governs ring-stage morphology. The broad singular stem was not narrowed.
- **Mucize Parasitology Q55 is held as a raw-identity hold.** Printed C is supported, but raw \`concept_67e667ad81d088a8265cb35b\` already governs Aedes transmission of dengue and yellow-fever viruses; no duplicate identity was minted.
- **Mucize Parasitology Q56 is held as an exact same-source duplicate.** Its printed C, Culex, repeats the vector identity already authored from earlier Mucize Q38 against \`CON-INF-476CFE4CB1DE34\`; no second occurrence was minted.

`
  const mucizeParasitologyThirdDelta = `### Mucize Doctors Parasitology core Q61–Q90 delta

- The governed Mucize assessment resource is reused. Physical pages 14–18 were rendered and visually read for every prompt, option and same-page answer token in Q61–Q90.
- +18 verified local-curriculum claims, +18 citations and +18 article spans for Q62, Q67–Q72, Q74–Q76, Q80, Q82–Q85 and Q87–Q89.
- +5 under-review / needs-evidence concepts and +0 articles. Thirteen questions safely reuse exact governed local concepts; the existing standalone-complete reciprocal Draft articles are expanded by exact ID without dropping prior fields, universities, relationships or question links.
- +18 Draft questions and +12 explicit authority-form, unsupported-terminology, non-unique-key, scope, dependency-chain or governed-identity holds with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q61, Q63–Q66 and Q73 are not promoted beyond the official teaching wording; Q77–Q79, Q81 and Q86 remain in the established leishmaniasis dependency chain; Q90 remains a governed-identity hold rather than a third paratransgenesis definition record.
- Mucize Parasitology core Q61–Q90: **18 authored / 12 held / 0 source-absent / 0 unassessed**.
- Mucize Parasitology core Q1–Q90 cumulative: **42 authored / 47 held / 1 source-absent / 0 unassessed**. The exact next boundary is Mucize Parasitology Q91.

`
  const mucizeParasitologyThirdHolds = `- **Mucize Parasitology Q61 is held as an unsupported-specificity hold.** Printed A, Pyrethrum, is not authenticated for treated bed nets by the official mosquito deck. The deck says nets may be impregnated with insecticides, while Pyrethrum is separately taught as a coil smoke or non-residual aerosol; no insecticide identity was inferred across those uses.
- **Mucize Parasitology Q63 is held as an unsupported-terminology hold.** Printed A calls citronella oil a “contact repellent,” while official teaching only calls citronella a short-duration repellent applied to skin or clothing and does not teach the offered contact/systemic classification.
- **Mucize Parasitology Q64 is held as an unsupported-superlative hold.** Printed B, Draining stagnant water, is a governed physical control method, but the official deck does not establish it as the singular “most environmentally safe” method.
- **Mucize Parasitology Q65 is held as an unsupported-modifier hold.** Official teaching states that Malathion is toxic to man and should be used with care, but it does not authenticate the option's stronger “Highly toxic to humans” wording.
- **Mucize Parasitology Q66 is held as a non-unique negative-form hold.** Printed C, Spraying insecticides, is not physical control, but the governed taxonomy also treats bed nets and window screens as barrier/mechanical adult control rather than the physical aquatic-stage category. The offered NOT set is therefore not uniquely keyed.
- **Mucize Parasitology Q73 is held as a scope hold.** Printed C says sandflies generically are most active at night, while the official bionomics statement is narrower: females are nocturnal blood feeders. The sex-specific teaching was not broadened.
- **Mucize Parasitology Q77 is held as an established leishmaniasis dependency-chain hold.** Printed B is supported, but the intermediate-host identity belongs to \`CON-INF-5EAC54C4EC6F18\` / \`ART-INF-MUST-FHB1022-CUTANEOUS-LEISHMANIASIS-VECTOR\`; no partial or duplicate update was created.
- **Mucize Parasitology Q78 is held as an established cyclopropagative dependency-chain hold.** Printed B is directly supported, but \`CON-INF-23265735EECCA1\` and its retained article graph cannot pass the focused dependency contract through a bounded partial update.
- **Mucize Parasitology Q79 is held as an established leishmaniasis dependency-chain hold.** Printed B, Promastigote, is supported, but the infective-stage identity belongs to the existing cutaneous-leishmaniasis concept/article chain and was not duplicated.
- **Mucize Parasitology Q81 is held as an established leishmaniasis dependency-chain hold.** Printed C, Oriental sore, is supported, but the exact naming identity belongs to the existing cutaneous-leishmaniasis article chain; no unsafe partial widening was made.
- **Mucize Parasitology Q86 is held as an established leishmaniasis dependency-chain hold.** Printed B, Skin ulcers with raised borders, is supported, but lesion morphology already belongs to the cutaneous-leishmaniasis article identity and was not duplicated.
- **Mucize Parasitology Q90 is held as a governed-identity hold.** Printed B is supported, but the paratransgenesis definition and purpose are already represented by two governed Draft questions against \`CON-INF-A0D40E9CB0E211\` / \`ART-INF-MUST-FHB1022-PARATRANSGENESIS\`; no third definition-level record was minted.

`
  const mucizeParasitologyFourthDelta = `### Mucize Doctors Parasitology core Q91–Q95 delta

- The governed Mucize assessment resource is reused. Physical page 19 was rendered and visually read for all five terminal core prompts, options and same-page answer tokens.
- +4 verified local-curriculum claims, +4 citations and +4 article spans for Q91–Q94.
- +3 under-review / needs-evidence concepts and +0 articles. Q94 safely reuses the exact governed Phlebotomus-papatasii identity; the existing standalone-complete reciprocal Draft articles are expanded by exact ID without dropping prior fields or links.
- +4 Draft questions and +1 explicit leishmaniasis dependency-chain hold with no student-facing record.
- Every authored stem, option and printed key is unchanged. Q95's printed B is supported but remains outside student-facing content because the diagnosis identity overlaps the existing leishmaniasis article chain.
- Mucize Parasitology core Q91–Q95: **4 authored / 1 held / 0 source-absent / 0 unassessed**.
- Mucize Parasitology core Q1–Q95 cumulative: **46 authored / 48 held / 1 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 1 on physical page 20.

`
  const mucizeParasitologyFourthHolds = `- **Mucize Parasitology Q95 is held as an established leishmaniasis dependency-chain hold.** Printed B, Microscopic examination of amastigotes in tissue samples, is supported by the official visceral and cutaneous slides, but tissue microscopy and amastigote morphology overlap the existing cutaneous-leishmaniasis concept/article chain. No duplicate or partial exact-ID widening was created.

`
  const mucizeCaseOneDelta = `### Mucize Doctors case-based learning Case 1 delta

- The governed Mucize assessment resource is reused. Physical page 20 was rendered and visually read in full, including the complete Case 1 vignette, both four-option prompts and the printed answer line.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +2 explicit holds with no student-facing record: Case 1 Q1 is an existing-identity hold and Case 1 Q2 is an established dependency-chain hold.
- The printed keys remain unchanged as source evidence: Q1 A, Anopheles mosquito; Q2 B, Cyclo-propagative transmission. No answer was repaired, inferred or promoted.
- Mucize case-based learning Case 1: **0 authored / 2 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 2 on physical page 20.

`
  const mucizeCaseOneHolds = `- **Mucize case-based learning Case 1 Q1 is held as an existing-identity hold.** Printed A, Anopheles mosquito, is supported by the malaria vignette and governed MUST teaching, but raw identities \`concept_7482060cb7f283619c078023\` and \`concept_c85bd6a9786422a574f8a50a\` already represent Anopheles transmission of malaria. No duplicate case-specific concept or student-facing question was minted.
- **Mucize case-based learning Case 1 Q2 is held as an established cyclopropagative dependency-chain hold.** Printed B, Cyclo-propagative transmission, is supported for Plasmodium development and multiplication inside Anopheles, but \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the unsafe focused dependency chain already documented for Mucize core Q52 and Q78. No partial exact-ID update or duplicate question was created.

`
  const mucizeCaseTwoDelta = `### Mucize Doctors case-based learning Case 2 delta

- The governed Mucize assessment resource is reused. Physical page 20 was visually re-read in full for the complete Case 2 vignette, all three four-option prompts and the printed answer line.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +3 explicit governed-identity or same-source duplicate holds with no student-facing record.
- The printed keys remain unchanged as source evidence: Q1 B, Elephantiasis; Q2 B, Culex mosquito; Q3 C, Cyclo-developmental transmission. No answer was repaired, inferred or promoted.
- Mucize case-based learning Case 2: **0 authored / 3 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 3 on physical page 21.

`
  const mucizeCaseTwoHolds = `- **Mucize case-based learning Case 2 Q1 is held as an exact same-source identity duplicate.** Printed B, Elephantiasis, is supported by lymphatic obstruction with lower-limb and external-genital swelling, but Mucize core Q57 already authors the reciprocal elephantiasis limb-swelling identity against \`CON-INF-43040B7549A6C2\`. No second same-source question was minted.
- **Mucize case-based learning Case 2 Q2 is held as an exact same-source identity duplicate.** Printed B, Culex mosquito, is supported for Wuchereria bancrofti in the governed local curriculum, but Mucize core Q38 already authors the Culex–Wuchereria vector identity against \`CON-INF-476CFE4CB1DE34\`. No duplicate case-specific question was created.
- **Mucize case-based learning Case 2 Q3 is held as an existing governed-question identity hold.** Printed C, Cyclo-developmental transmission, is directly supported, but Absalam Part 2 Mosquitoes Q18 already authors that exact Culex-filariasis transmission identity against \`CON-INF-476CFE4CB1DE34\` and the reciprocal Draft article. The repeated occurrence is preserved in the ledger without another student-facing record.

`
  const mucizeCaseThreeDelta = `### Mucize Doctors case-based learning Case 3 delta

- The governed Mucize assessment resource is reused. Physical page 21 was rendered and visually read in full for the complete Case 3 vignette, both four-option prompts and the printed answer line.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +2 explicit raw-identity holds with no student-facing record.
- The printed keys remain unchanged as source evidence: Q1 B, Aedes mosquito; Q2 B, Yellow fever. No answer was repaired, inferred or promoted.
- Mucize case-based learning Case 3: **0 authored / 2 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 4 on physical page 21.

`
  const mucizeCaseThreeHolds = `- **Mucize case-based learning Case 3 Q1 is held as a raw-identity hold.** Printed B, Aedes mosquito, is supported by the South-Sudan yellow-fever vignette and governed local teaching, but raw \`concept_67e667ad81d088a8265cb35b\` already represents Aedes transmission of yellow-fever and dengue viruses. The same identity held Mucize core Q55; no duplicate case question was minted.
- **Mucize case-based learning Case 3 Q2 is held as a raw-identity hold.** Printed B, Yellow fever, is supported by the Aedes vector, travel setting, jaundice and dark urine, but the disease-vector association is the same raw \`concept_67e667ad81d088a8265cb35b\` identity. The occurrence remains source evidence only and no duplicate concept or student-facing question was created.

`
  const mucizeCaseFourDelta = `### Mucize Doctors case-based learning Case 4 delta

- The governed Mucize assessment resource and official mosquito teaching resource are reused. Physical page 21 and official pages 19 and 24 were visually read for the complete Case 4 vignette, all four option sets, the printed answer line and the local teaching authority.
- +1 verified local-curriculum claim, +1 citation and +1 article span for Case 4 Q2.
- +1 under-review / needs-evidence concept and +0 articles; the standalone-complete mosquito-diseases Draft article is expanded by exact ID without dropping prior content, relations or questions.
- +1 Draft question, Case 4 Q2, and +3 explicit holds with no student-facing record: Q1 and Q3 are duplicate governed identities, while Q4 is a non-unique teaching-form conflict.
- Every stem, option and printed key remains unchanged. Q4's printed B is not corrected or promoted because official page 19 labels Zika transmission “Propagative/Transoverian??”, supporting both offered B and D rather than a unique single best answer.
- Mucize case-based learning Case 4: **1 authored / 3 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 5 on physical page 22.

`
  const mucizeCaseFourHolds = `- **Mucize case-based learning Case 4 Q1 is held as an exact same-source identity duplicate.** Printed C, Congenital microcephaly, is directly supported, but Mucize core Q58 already authors the Zika-associated newborn-microcephaly identity against \`CON-INF-C78116FCC3B754\`. No second same-source question was minted.
- **Mucize case-based learning Case 4 Q3 is held as an existing governed-question identity hold.** Printed C, Zika virus, is directly supported, but Absalam Part 2 Mosquitoes Q15 and Mucize core Q58 already author the Zika–congenital-microcephaly identity against \`CON-INF-C78116FCC3B754\`. No duplicate case question was created.
- **Mucize case-based learning Case 4 Q4 is held as a non-unique teaching-form conflict.** The bank prints B, Propagative transmission, while the official Aedes table labels Zika transmission “Propagative/Transoverian??”. Because option D is Transovarial transmission, the governed teaching does not authenticate a unique single best answer. Neither the key nor the teaching uncertainty was silently repaired.

`
  const mucizeCaseFiveDelta = `### Mucize Doctors case-based learning Case 5 delta

- The governed Mucize assessment resource and official mosquito teaching resource are reused. Physical page 22 and official pages 14–15 were rendered and visually read for the complete Case 5 vignette, four-option prompt, printed answer line and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit established dependency-chain hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q1 C, Cyclo-propagative. Official pages 14–15 directly support cyclopropagative transmission for Plasmodium in female Anopheles, but the existing concept/article dependency chain cannot be widened safely in this bounded hold-only slice.
- Mucize case-based learning Case 5: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 6 on physical page 22.

`
  const mucizeCaseFiveHolds = `- **Mucize case-based learning Case 5 Q1 is held as an established cyclopropagative dependency-chain hold.** Printed C, Cyclo-propagative, is directly supported for Plasmodium development and multiplication inside female Anopheles by official pages 14–15. However, \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the same unsafe focused dependency chain already documented for Mucize Case 1 Q2 and core Q52/Q78. No partial exact-ID update or duplicate student-facing question was created.

`
  const mucizeCaseSixDelta = `### Mucize Doctors case-based learning Case 6 delta

- The governed Mucize assessment resource and official sandfly teaching resource are reused. Physical pages 22–23 and official pages 10 and 26 were rendered and visually read for the complete Case 6 vignette, all three four-option prompts, printed answer line and local teaching authority.
- +1 verified local-curriculum claim, +1 citation and +1 article span for Case 6 Q1.
- +0 concepts and +0 articles. Q1 safely reuses the exact governed sandfly-disease-profile concept; the standalone-complete reciprocal sandfly-diseases Draft article is expanded by exact ID without dropping prior content, relations or questions.
- +1 Draft question, Case 6 Q1, and +2 exact same-source identity holds with no student-facing record for Q2 and Q3.
- Every stem, option and printed key remains unchanged. Official teaching directly supports Q1 A, Sandfly; Q2 A, Sandfly fever virus; and Q3 B, Propagative. Q2 and Q3 are retained only as source occurrences because Mucize core Q82 and Q83 already author those exact identities.
- Mucize case-based learning Case 6: **1 authored / 2 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 7 on physical page 22.

`
  const mucizeCaseSixHolds = `- **Mucize case-based learning Case 6 Q2 is held as an exact same-source identity duplicate.** Printed A, Sandfly fever virus, is directly supported by official page 26, but Mucize core Q82 already authors the sandfly-fever viral-agent identity against \`CON-INF-F538E763E1260E\`. No second same-source causative-agent question was minted.
- **Mucize case-based learning Case 6 Q3 is held as an exact same-source identity duplicate.** Printed B, Propagative, is directly supported by official pages 10 and 26, but Mucize core Q83 already authors the sandfly-fever propagative-transmission identity against \`CON-INF-F538E763E1260E\`. No second same-source transmission-mode question was created.

`
  const mucizeCaseSevenDelta = `### Mucize Doctors case-based learning Case 7 delta

- The governed Mucize assessment resource and official sandfly teaching resource are reused. Physical pages 22–23 and official page 28 were visually read for the complete Case 7 vignette, all three four-option prompts, printed answer line and local teaching authority.
- +1 verified local-curriculum claim, +1 citation and +1 article span for Case 7 Q2.
- +0 concepts and +0 articles. Q2 safely reuses the exact governed Oroya-fever-profile concept; the standalone-complete reciprocal sandfly-diseases Draft article is expanded by exact ID without dropping prior content, relations or questions.
- +1 Draft question, Case 7 Q2, and +2 exact same-source identity holds with no student-facing record for Q1 and Q3.
- Every stem, option and printed key remains unchanged. Official teaching directly supports Q1 A, Oroya fever (Bartonellosis); Q2 A, Sandfly (Lutzomyia); and Q3 B, Propagative. Q1's option A visibly carries a stray terminal “B”; it is disclosed rather than silently repaired. Q1 and Q3 remain source occurrences because Mucize core Q84 and Q85 already author those exact identities.
- Mucize case-based learning Case 7: **1 authored / 2 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize case-based learning Case 8 on physical page 23.

`
  const mucizeCaseSevenHolds = `- **Mucize case-based learning Case 7 Q1 is held as an exact same-source identity duplicate with a disclosed source artifact.** Printed A, Oroya fever (Bartonellosis), is directly supported by official page 28, but Mucize core Q84 already authors the Bartonella-bacilliformis/Oroya-fever identity against \`CON-INF-482144C092C2DD\`. Option A visibly ends with an extra “B”; neither that artifact nor the key was silently repaired, and no duplicate student-facing record was created.
- **Mucize case-based learning Case 7 Q3 is held as an exact same-source identity duplicate.** Printed B, Propagative, is directly supported by official page 28, but Mucize core Q85 already authors the Bartonella-in-sandfly propagative-transmission identity against \`CON-INF-482144C092C2DD\`. No second same-source transmission-mode question was minted.

`
  const mucizeCaseEightDelta = `### Mucize Doctors case-based learning Case 8 delta

- The governed Mucize assessment resource and official sandfly teaching resource are reused. Physical page 23 and official pages 12–13 and 24 were rendered and visually read for the complete Case 8 vignette, all four four-option prompts, printed answer line and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +4 explicit established dependency-chain holds with no student-facing record.
- Every stem, option and printed key remains unchanged as source evidence: Q1 A, Cutaneous leishmaniasis (Oriental sore); Q2 A, Sandfly; Q3 C, Cyclo-propagative; Q4 A, Promastigote. Official teaching directly supports all four printed answers, but each identity belongs to an existing unsafe focused cutaneous-leishmaniasis or cyclopropagative dependency chain, so no partial exact-ID update or duplicate record was created.
- Mucize case-based learning Case 8: **0 authored / 4 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQs Q1 on physical page 24.

`
  const mucizeCaseEightHolds = `- **Mucize case-based learning Case 8 Q1 is held as an established cutaneous-leishmaniasis dependency-chain hold.** Printed A, Cutaneous leishmaniasis (Oriental sore), is directly supported by official page 24 from the Sinai volcano-like ulcer and macrophage amastigotes, but the diagnosis identity belongs to \`CON-INF-5EAC54C4EC6F18\` / \`ART-INF-MUST-FHB1022-CUTANEOUS-LEISHMANIASIS-VECTOR\`. No partial exact-ID widening or duplicate case question was created.
- **Mucize case-based learning Case 8 Q2 is held as an established cutaneous-leishmaniasis dependency-chain hold.** Printed A, Sandfly, is directly supported by official pages 12–13, but the Leishmania–sandfly vector identity belongs to the same retained concept/article chain and cannot be widened safely through this bounded slice.
- **Mucize case-based learning Case 8 Q3 is held as an established cyclopropagative dependency-chain hold.** Printed C, Cyclo-propagative, is directly supported by official pages 12–13, but \`CON-INF-23265735EECCA1\` / \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the established unsafe focused dependency chain. The printed key was not changed and no record was created.
- **Mucize case-based learning Case 8 Q4 is held as an established cutaneous-leishmaniasis dependency-chain hold.** Printed A, Promastigote, is directly supported by official pages 12–13, but the infective-stage identity already belongs to the retained cutaneous-leishmaniasis concept/article chain. No duplicate concept, article or student-facing question was minted.

`
  const mucizeAdvancedOneDelta = `### Mucize Doctors Advanced MCQ Q1 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24 and 28 and official page 11 were rendered and visually read for the exact Q1 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact raw-identity / same-source duplicate hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q1 A, The host that harbors the sexual stage of the parasite. Official page 11 directly supports that a definitive host harbors adult or sexually mature stages, but exact raw identity \`concept_4cf60f293dd2603501b07838\` already governs this definition and Mucize core Q4 is the earlier same-source occurrence.
- Mucize Advanced MCQ Q1: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q2 on physical page 24.

`
  const mucizeAdvancedOneHolds = `- **Mucize Advanced MCQ Q1 is held as an exact raw-identity and same-source duplicate hold.** Printed A, The host that harbors the sexual stage of the parasite, is directly supported by official Introduction page 11, which defines the definitive host as harboring adult or sexually mature stages or as the site of sexual reproduction. Exact raw identity \`concept_4cf60f293dd2603501b07838\` already states this definition, and Mucize core Q4 is the earlier held occurrence from the same assessment source. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedTwoDelta = `### Mucize Doctors Advanced MCQ Q2 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24 and 28 and official page 11 were rendered and visually read for the exact Q2 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact raw-identity / prior-family duplicate hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q2 B, The host where the parasite undergoes asexual reproduction or larval development. Official page 11 directly supports that an intermediate host harbors larval or sexually immature stages or is where asexual reproduction occurs, but exact raw identity \`concept_379bf3d8ea267775959b6004\` already governs this definition and Absalam Introduction Q7 is the earlier held occurrence.
- Mucize Advanced MCQ Q2: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q3 on physical page 24.

`
  const mucizeAdvancedTwoHolds = `- **Mucize Advanced MCQ Q2 is held as an exact raw-identity and prior-family duplicate hold.** Printed B, The host where the parasite undergoes asexual reproduction or larval development, is directly supported by official Introduction page 11, which defines the intermediate host as harboring larval or sexually immature stages or as the site of asexual reproduction. Exact raw identity \`concept_379bf3d8ea267775959b6004\` already states this definition, and Absalam Introduction Q7 is the earlier held occurrence. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedThreeDelta = `### Mucize Doctors Advanced MCQ Q3 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24 and 28 and official page 12 were rendered and visually read for the exact Q3 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact raw-identity / prior-family duplicate hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q3 B, It maintains the parasite in nature and serves as a source of infection for humans. Official page 12 directly supports that a reservoir host maintains the parasite life cycle in nature and serves as an infection source for man, but exact raw identity \`concept_49b33fb2fff7f5b6f66ebc34\` already governs this definition and Absalam Introduction Q8 is the earlier held occurrence.
- Mucize Advanced MCQ Q3: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q4 on physical page 24.

`
  const mucizeAdvancedThreeHolds = `- **Mucize Advanced MCQ Q3 is held as an exact raw-identity and prior-family duplicate hold.** Printed B, It maintains the parasite in nature and serves as a source of infection for humans, is directly supported by official Introduction page 12, which states that a reservoir host maintains the parasite life cycle in nature and is therefore a reservoir source of infection for man. Exact raw identity \`concept_49b33fb2fff7f5b6f66ebc34\` already states this definition, and Absalam Introduction Q8 is the earlier held occurrence. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedFourDelta = `### Mucize Doctors Advanced MCQ Q4 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24 and 28 and official pages 12 and 14 were rendered and visually read for the exact Q4 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact raw-identity / prior-family overlap hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q4 B, It transmits the parasite after the parasite undergoes development or multiplication within the vector. Official page 12 distinguishes biological from mechanical vectors, and page 14 visibly shows parasite development within the mosquito labelled as a biological vector. Exact raw identity \`concept_43f3ea4937e6ad886a73ed80\` already governs biological transmission by propagation, development or both; Absalam Introduction Q29 and Arthropoda Q36 already occupy overlapping classification and development/multiplication scopes.
- Mucize Advanced MCQ Q4: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q5 on physical page 24.

`
  const mucizeAdvancedFourHolds = `- **Mucize Advanced MCQ Q4 is held as an exact raw-identity and prior-family overlap hold.** Printed B, It transmits the parasite after the parasite undergoes development or multiplication within the vector, is supported by official Introduction page 12's mechanical-versus-biological distinction and page 14's visible parasite development inside a mosquito labelled biological vector. Exact raw identity \`concept_43f3ea4937e6ad886a73ed80\` already states that biological vector transmission requires propagation, development or both, while Absalam Introduction Q29 and Arthropoda Q36 already occupy overlapping classification and development/multiplication scopes. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedFiveDelta = `### Mucize Doctors Advanced MCQ Q5 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24 and 28 and official page 21 were rendered and visually read for the exact Q5 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit existing local dependency / same-source scope-overlap hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q5 C, Fecal-oral route. Official page 21 directly supports ingestion via contaminated food or water and explicitly identifies Giardia lamblia, Entamoeba histolytica and Ascaris lumbricoides as transmitted through the fecal-oral route. Existing \`CON-INF-A5D19C7E204BF3\` and its reciprocal Draft transmission article already govern ingestion among parasite entry routes, while Mucize core Q24 is the earlier same-source authored occurrence; no duplicate or narrowing-only record was created.
- Mucize Advanced MCQ Q5: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q6 on physical page 24.

`
  const mucizeAdvancedFiveHolds = `- **Mucize Advanced MCQ Q5 is held as an existing local dependency and same-source scope-overlap hold.** Printed C, Fecal-oral route, is directly supported by official Introduction page 21, which teaches entry through contaminated food or water and explicitly identifies Giardia lamblia, Entamoeba histolytica and Ascaris lumbricoides as fecal-orally transmitted. Existing \`CON-INF-A5D19C7E204BF3\` and the reciprocal Draft transmission article already govern ingestion among parasite entry routes, while Mucize core Q24 is the earlier same-source authored occurrence. No duplicate or narrowing-only concept, article or student-facing question was created.

`
  const mucizeAdvancedSixDelta = `### Mucize Doctors Advanced MCQ Q6 delta

- The governed Mucize assessment resource and official Flies and Myiasis teaching resource are reused. Physical pages 24 and 28 and official pages 13 and 25 were rendered and visually read for the exact Q6 stem, all four options, printed answer token and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact-identity / unsupported species-precision hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q6 B, Housefly carrying Entamoeba histolytica cysts on its legs. Official page 13 teaches indirect mechanical contamination by protozoal cysts attached to housefly hairs or body parts, and page 25 states that sticky pads on housefly legs collect organisms including protozoal cysts. Neither page names Entamoeba histolytica for this carriage statement. Raw identities \`concept_012efb068aac441646ea164f\` and \`concept_ed540a67619ad2d979d7558f\` already govern housefly mechanical carriage and contamination, while Mucize core Q27 is the earlier same-source occurrence; no duplicate identity or unsupported species-level narrowing was created.
- Mucize Advanced MCQ Q6: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q7 on physical page 24.

`
  const mucizeAdvancedSixHolds = `- **Mucize Advanced MCQ Q6 is held as an exact-identity and unsupported species-precision hold.** Printed B, Housefly carrying Entamoeba histolytica cysts on its legs, is supported at the carrier-class level by official Flies and Myiasis page 13, which teaches housefly carriage of protozoal cysts on hairs or body parts, and page 25, which names sticky leg pads and protozoal cysts. The governed teaching does not name Entamoeba histolytica in this carriage statement. Raw \`concept_012efb068aac441646ea164f\` and \`concept_ed540a67619ad2d979d7558f\` already govern housefly mechanical carriage and contamination, while Mucize core Q27 is the earlier same-source occurrence. No duplicate, species-level extrapolation or student-facing record was created.

`
  const mucizeAdvancedSevenDelta = `### Mucize Doctors Advanced MCQ Q7 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 24–25 and 28 and official page 7 were rendered and visually read for the exact Q7 stem, all four options, printed answer token, next source boundary and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit compound existing-identity hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q7 C, An obligate parasite cannot survive without a host, while a facultative parasite can live both freely and parasitically. Official page 7 directly supports both clauses. Existing \`CON-INF-F82C6307A7B7E3\` and \`CON-INF-6E41B8C3F902AD\` already govern the two atomic definitions, and Absalam Introduction Q4 and Q25 are their earlier authored occurrences; no compound duplicate was created.
- Mucize Advanced MCQ Q7: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q8 on physical page 25.

`
  const mucizeAdvancedSevenHolds = `- **Mucize Advanced MCQ Q7 is held as a compound existing-identity hold.** Printed C, An obligate parasite cannot survive without a host, while a facultative parasite can live both freely and parasitically, is directly supported by official Introduction page 7. Existing \`CON-INF-6E41B8C3F902AD\` governs complete obligatory host dependence and \`CON-INF-F82C6307A7B7E3\` governs facultative free-living/parasitic alternation; Absalam Introduction Q4 and Q25 are the earlier authored atomic occurrences. No third compound concept, article or student-facing question was created.

`
  const mucizeAdvancedEightDelta = `### Mucize Doctors Advanced MCQ Q8 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 25 and 28 and official page 15 were rendered and visually read for the exact Q8 stem, all four options, printed answer token, next source boundary and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact governed-identity / prior-family duplicate hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q8 B, A disease that is transmitted from animals to humans. Official page 15 directly defines zoonotic parasitic diseases as originating from animal sources and being transmitted to man. Existing \`CON-INF-93B7D64C0E2A15\` and its reciprocal Draft transmission article already govern this identity, and Absalam Introduction Q22 is the earlier authored occurrence; no duplicate was created.
- Mucize Advanced MCQ Q8: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q9 on physical page 25.

`
  const mucizeAdvancedEightHolds = `- **Mucize Advanced MCQ Q8 is held as an exact governed-identity and prior-family duplicate hold.** Printed B, A disease that is transmitted from animals to humans, is directly supported by official Introduction page 15. Existing \`CON-INF-93B7D64C0E2A15\` and its reciprocal Draft transmission article already govern animal-origin zoonotic parasitic disease, while Absalam Introduction Q22 is the earlier authored occurrence. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedNineDelta = `### Mucize Doctors Advanced MCQ Q9 delta

- The governed Mucize assessment resource and official Introduction to Medical Parasitology teaching resource are reused. Physical pages 25 and 28 and official page 16 were rendered and visually read for the exact Q9 stem, all four options, printed answer token, next source boundary and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit exact same-source / prior-family duplicate hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q9 C, The bloodstream. Official page 16 directly classifies the malaria parasite as a blood parasite of the haemopoietic system. Existing \`CON-INF-829EB6EC11CC8F\` and its reciprocal Draft classification article already govern this identity; Absalam Introduction Q9 and Mucize core Q5 are earlier authored occurrences, so no duplicate was created.
- Mucize Advanced MCQ Q9: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q10 on physical page 25.

`
  const mucizeAdvancedNineHolds = `- **Mucize Advanced MCQ Q9 is held as an exact same-source and prior-family duplicate hold.** Printed C, The bloodstream, is directly supported by official Introduction page 16, which classifies the malaria parasite as a blood parasite of the haemopoietic system. Existing \`CON-INF-829EB6EC11CC8F\` and its reciprocal Draft classification article already govern the same identity; Absalam Introduction Q9 and Mucize core Q5 are the earlier authored occurrences. No duplicate concept, article or student-facing question was created.

`
  const mucizeAdvancedTenDelta = `### Mucize Doctors Advanced MCQ Q10 delta

- The governed Mucize assessment resource and official mosquito teaching resource are reused. Physical pages 25 and 28 and official mosquito page 34 were rendered and visually read for the exact Q10 stem, all four options, printed answer token, next source boundary and local teaching authority.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit uncorrected authority / superlative-form hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q10 C, Vaccinating the reservoir host. Official mosquito page 34 teaches integrated anti-mosquito control through physical/mechanical, biological and chemical measures; it does not identify reservoir-host vaccination or establish one universally “most effective” option. The printed key was not replaced with offered B, and no unsupported teaching object was created.
- Mucize Advanced MCQ Q10: **0 authored / 1 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q11 on physical page 25.

`
  const mucizeAdvancedTenHolds = `- **Mucize Advanced MCQ Q10 is held as an uncorrected authority and superlative-form hold.** Printed C, Vaccinating the reservoir host, is not supported by the governed faculty deck. Official mosquito page 34 presents integrated anti-mosquito control through physical/mechanical, biological and chemical measures and does not identify reservoir-host vaccination or one universally most-effective intervention. The printed key remains unchanged as source evidence; it was not silently replaced with offered B, and no student-facing record was created.

`
  const mucizeAdvancedElevenDelta = `### Mucize Doctors Advanced MCQ Q11 delta

- The governed Mucize assessment resource and official Flies and Myiasis teaching resource are reused. Physical pages 25 and 28 and official pages 7–8 were rendered and visually read for the exact Q11 stem, all four options, printed answer token, next source boundary and direct teaching authority.
- +1 verified local-curriculum claim, +1 citation and +1 article span.
- +0 resources, +0 concepts and +0 articles: existing \`CON-INF-1E7B4A9D306FC2\` and its standalone-complete reciprocal Draft metamorphosis article are expanded in place without changing their IDs or prior governed content.
- +1 Draft question and +0 holds. The wording, source grammar, option order and printed key remain unchanged: Q11 A, Complete metamorphosis involves a pupal stage, while incomplete metamorphosis does not. Official pages 7–8 directly contrast egg → larva → pupa → adult with egg → nymph → adult.
- Search/replay gate: exact searches for the pupal-stage distinction found the existing general holometabolous/hemimetabolous concept and article but no rival concept ID or duplicate question. The new assessment occurrence is therefore attached to that governed identity rather than minting a semantic twin.
- Mucize Advanced MCQ Q11: **1 authored / 0 held / 0 source-absent / 0 unassessed**. Advanced Q1–Q11 cumulative: **1 authored / 10 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q12 on physical page 25.

`
  const mucizeAdvancedTwelveDelta = `### Mucize Doctors Advanced MCQ Q12 delta

- The governed Mucize assessment resource, department-branded vector teaching carrier and local FHB Para Myiasis Midterm Notes are reused. Physical pages 25 and 28, department carrier page 2 and Myiasis Notes page 2 were rendered and visually read for the exact Q12 stem, all four options, printed answer token, next source boundary and local teaching support.
- +0 resources, +0 claims, +0 citations, +0 article spans, +0 concepts, +0 articles and +0 Draft questions.
- +1 explicit established cyclopropagative dependency-chain hold with no student-facing record.
- The printed key remains unchanged as source evidence: Q12 C, Cyclo-propagative transmission. The local notes directly define cyclo-propagative transmission as pathogen multiplication plus morphological change, and the department carrier illustrates the same category for Trypanosoma cruzi in Triatoma. Existing \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the established unsafe focused dependency chain; no partial exact-ID update or duplicate was created.
- Mucize Advanced MCQ Q12: **0 authored / 1 held / 0 source-absent / 0 unassessed**. Advanced Q1–Q12 cumulative: **1 authored / 11 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q13 on physical page 25.

`
  const mucizeAdvancedTwelveHolds = `- **Mucize Advanced MCQ Q12 is held as an established cyclopropagative dependency-chain hold.** Printed C, Cyclo-propagative transmission, is directly supported by the local Myiasis Notes page 2 definition of multiplication plus morphological change and by the department-branded page 2 Trypanosoma cruzi / Triatoma example. Existing \`CON-INF-23265735EECCA1\` and \`ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE\` remain in the established unsafe focused dependency chain already documented for Absalam Arthropoda Q36/Q42 and other Mucize occurrences. The printed key was not changed; no partial exact-ID update, duplicate concept/article or student-facing question was created.

`
  const mucizeAdvancedThirteenDelta = `### Mucize Doctors Advanced MCQ Q13 delta

- The governed Mucize assessment resource and official Flies and Myiasis teaching resource are reused. Physical pages 25 and 28 and official pages 37 and 42 were rendered and visually read for the exact Q13 stem, all four options, printed answer token, next source boundary and direct teaching authority.
- +1 verified local-curriculum claim, +1 citation, +1 article span and +1 needs_evidence concept.
- +0 resources and +0 articles: the existing standalone-complete reciprocal Draft cutaneous-myiasis article is expanded in place without changing its ID or prior governed content.
- +1 Draft question and +0 holds. The wording, option order and printed key remain unchanged: Q13 B, The larvae cause lesions or nodules in the skin. Official pages 37 and 42 classify cutaneous myiasis as obligatory living-tissue infestation and show larval skin penetration producing swellings or boils.
- Search/replay gate: no duplicate governed question or exact concept identity was found. Raw \`concept_3965ff3ac0ffc63c51c97f38\` is retained as a rejected merge candidate because its furuncular-myiasis statement about maggots protruding from boil-like swellings is narrower than this generic cutaneous lesion-or-nodule identity.
- Mucize Advanced MCQ Q13: **1 authored / 0 held / 0 source-absent / 0 unassessed**. Advanced Q1–Q13 cumulative: **2 authored / 11 held / 0 source-absent / 0 unassessed**. The exact next boundary is Mucize Advanced MCQ Q14 on physical page 25.

`
  return coverage()
    .replace('| Evidence resources | 22 |', '| Evidence resources | 23 |')
    .replace('| Claims | 38 |', '| Claims | 47 |')
    .replace('| Citations | 43 |', '| Citations | 52 |')
    .replace('| Article spans | 38 |', '| Article spans | 47 |')
    .replace('| Concepts | 35 |', '| Concepts | 43 |')
    .replace('| Articles | 21 |', '| Articles | 23 |')
    .replace('| Questions | 38 |', '| Questions | 47 |')
    .replace('| Question authoring holds | 53 |', '| Question authoring holds | 74 |')
    .replace('| Claims | 47 |', '| Claims | 57 |')
    .replace('| Citations | 52 |', '| Citations | 62 |')
    .replace('| Article spans | 47 |', '| Article spans | 57 |')
    .replace('| Concepts | 43 |', '| Concepts | 53 |')
    .replace('| Articles | 23 |', '| Articles | 25 |')
    .replace('| Questions | 47 |', '| Questions | 57 |')
    .replace('| Question authoring holds | 74 |', '| Question authoring holds | 94 |')
    .replace('| Evidence resources | 23 |', '| Evidence resources | 24 |')
    .replace('| Claims | 57 |', '| Claims | 76 |')
    .replace('| Citations | 62 |', '| Citations | 81 |')
    .replace('| Article spans | 57 |', '| Article spans | 76 |')
    .replace('| Concepts | 53 |', '| Concepts | 69 |')
    .replace('| Articles | 25 |', '| Articles | 27 |')
    .replace('| Questions | 57 |', '| Questions | 76 |')
    .replace('| Question authoring holds | 94 |', '| Question authoring holds | 105 |')
    .replace('| Evidence resources | 24 |', '| Evidence resources | 25 |')
    .replace('| Claims | 76 |', '| Claims | 98 |')
    .replace('| Citations | 81 |', '| Citations | 103 |')
    .replace('| Article spans | 76 |', '| Article spans | 98 |')
    .replace('| Concepts | 69 |', '| Concepts | 89 |')
    .replace('| Articles | 27 |', '| Articles | 30 |')
    .replace('| Questions | 76 |', '| Questions | 98 |')
    .replace('| Question authoring holds | 105 |', '| Question authoring holds | 113 |')
    .replace('| Claims | 98 |', '| Claims | 117 |')
    .replace('| Citations | 103 |', '| Citations | 122 |')
    .replace('| Article spans | 98 |', '| Article spans | 117 |')
    .replace('| Concepts | 89 |', '| Concepts | 103 |')
    .replace('| Articles | 30 |', '| Articles | 33 |')
    .replace('| Questions | 98 |', '| Questions | 117 |')
    .replace('| Question authoring holds | 113 |', '| Question authoring holds | 124 |')
    .replace('| Claims | 117 |', '| Claims | 129 |')
    .replace('| Citations | 122 |', '| Citations | 134 |')
    .replace('| Article spans | 117 |', '| Article spans | 129 |')
    .replace('| Concepts | 103 |', '| Concepts | 113 |')
    .replace('| Articles | 33 |', '| Articles | 36 |')
    .replace('| Questions | 117 |', '| Questions | 129 |')
    .replace('| Question authoring holds | 124 |', '| Question authoring holds | 142 |')
    .replace('| Evidence resources | 25 |', '| Evidence resources | 26 |')
    .replace('| Claims | 129 |', '| Claims | 132 |')
    .replace('| Citations | 134 |', '| Citations | 137 |')
    .replace('| Article spans | 129 |', '| Article spans | 132 |')
    .replace('| Concepts | 113 |', '| Concepts | 116 |')
    .replace('| Articles | 36 |', '| Articles | 38 |')
    .replace('| Questions | 129 |', '| Questions | 132 |')
    .replace('| Question authoring holds | 142 |', '| Question authoring holds | 169 |')
    .replace('| Evidence resources | 26 |', '| Evidence resources | 27 |')
    .replace('| Claims | 132 |', '| Claims | 151 |')
    .replace('| Citations | 137 |', '| Citations | 156 |')
    .replace('| Article spans | 132 |', '| Article spans | 151 |')
    .replace('| Concepts | 116 |', '| Concepts | 129 |')
    .replace('| Articles | 38 |', '| Articles | 41 |')
    .replace('| Questions | 132 |', '| Questions | 151 |')
    .replace('| Question authoring holds | 169 |', '| Question authoring holds | 180 |')
    .replace('| Evidence resources | 27 |', '| Evidence resources | 28 |')
    .replace('| Claims | 151 |', '| Claims | 173 |')
    .replace('| Citations | 156 |', '| Citations | 178 |')
    .replace('| Article spans | 151 |', '| Article spans | 173 |')
    .replace('| Concepts | 129 |', '| Concepts | 139 |')
    .replace('| Articles | 41 |', '| Articles | 44 |')
    .replace('| Questions | 151 |', '| Questions | 173 |')
    .replace('| Question authoring holds | 180 |', '| Question authoring holds | 188 |')
    .replace('| Evidence resources | 28 |', '| Evidence resources | 29 |')
    .replace('| Claims | 173 |', '| Claims | 181 |')
    .replace('| Citations | 178 |', '| Citations | 186 |')
    .replace('| Article spans | 173 |', '| Article spans | 181 |')
    .replace('| Questions | 173 |', '| Questions | 181 |')
    .replace('| Question authoring holds | 188 |', '| Question authoring holds | 209 |')
    .replace('| Claims | 181 |', '| Claims | 197 |')
    .replace('| Citations | 186 |', '| Citations | 202 |')
    .replace('| Article spans | 181 |', '| Article spans | 197 |')
    .replace('| Concepts | 139 |', '| Concepts | 148 |')
    .replace('| Questions | 181 |', '| Questions | 197 |')
    .replace('| Question authoring holds | 209 |', '| Question authoring holds | 223 |')
    .replace('| Claims | 197 |', '| Claims | 215 |')
    .replace('| Citations | 202 |', '| Citations | 220 |')
    .replace('| Article spans | 197 |', '| Article spans | 215 |')
    .replace('| Concepts | 148 |', '| Concepts | 153 |')
    .replace('| Questions | 197 |', '| Questions | 215 |')
    .replace('| Question authoring holds | 223 |', '| Question authoring holds | 235 |')
    .replace('| Claims | 215 |', '| Claims | 219 |')
    .replace('| Citations | 220 |', '| Citations | 224 |')
    .replace('| Article spans | 215 |', '| Article spans | 219 |')
    .replace('| Concepts | 153 |', '| Concepts | 156 |')
    .replace('| Questions | 215 |', '| Questions | 219 |')
    .replace('| Question authoring holds | 235 |', '| Question authoring holds | 236 |')
    .replace('| Question authoring holds | 236 |', '| Question authoring holds | 238 |')
    .replace('| Question authoring holds | 238 |', '| Question authoring holds | 241 |')
    .replace('| Question authoring holds | 241 |', '| Question authoring holds | 243 |')
    .replace('| Claims | 219 |', '| Claims | 220 |')
    .replace('| Citations | 224 |', '| Citations | 225 |')
    .replace('| Article spans | 219 |', '| Article spans | 220 |')
    .replace('| Concepts | 156 |', '| Concepts | 157 |')
    .replace('| Questions | 219 |', '| Questions | 220 |')
    .replace('| Question authoring holds | 243 |', '| Question authoring holds | 246 |')
    .replace('| Question authoring holds | 246 |', '| Question authoring holds | 247 |')
    .replace('| Claims | 220 |', '| Claims | 221 |')
    .replace('| Citations | 225 |', '| Citations | 226 |')
    .replace('| Article spans | 220 |', '| Article spans | 221 |')
    .replace('| Questions | 220 |', '| Questions | 221 |')
    .replace('| Question authoring holds | 247 |', '| Question authoring holds | 249 |')
    .replace('| Claims | 221 |', '| Claims | 222 |')
    .replace('| Citations | 226 |', '| Citations | 227 |')
    .replace('| Article spans | 221 |', '| Article spans | 222 |')
    .replace('| Questions | 221 |', '| Questions | 222 |')
    .replace('| Claims | 222 |', '| Claims | 223 |')
    .replace('| Citations | 227 |', '| Citations | 228 |')
    .replace('| Article spans | 222 |', '| Article spans | 223 |')
    .replace('| Questions | 222 |', '| Questions | 223 |')
    .replace('| Claims | 223 |', '| Claims | 224 |')
    .replace('| Citations | 228 |', '| Citations | 229 |')
    .replace('| Article spans | 223 |', '| Article spans | 224 |')
    .replace('| Concepts | 157 |', '| Concepts | 158 |')
    .replace('| Questions | 223 |', '| Questions | 224 |')
    .replace('| Question authoring holds | 249 |', '| Question authoring holds | 251 |')
    .replace('| Question authoring holds | 251 |', '| Question authoring holds | 255 |')
    .replace('| Question authoring holds | 255 |', '| Question authoring holds | 256 |')
    .replace('| Source-absent prompt dispositions | 1 |', '| Source-absent prompt dispositions | 2 |')
    .replace('Q32 has no printed answer and remains un-authored', 'opening-bank Q32 and Mucize Q25 have no printed answer and remain un-authored')
    .replace('## Explicit authoring holds\n\n', `${delta}${secondDelta}${thirdDelta}${fourthDelta}${mosquitoDelta}${sandflyDelta}${mycologyDelta}${virologyDelta}${chapter10Delta}${pharmacologyPart2Delta}${mucizeParasitologyDelta}${mucizeParasitologySecondDelta}${mucizeParasitologyThirdDelta}${mucizeParasitologyFourthDelta}${mucizeCaseOneDelta}${mucizeCaseTwoDelta}${mucizeCaseThreeDelta}${mucizeCaseFourDelta}${mucizeCaseFiveDelta}${mucizeCaseSixDelta}${mucizeCaseSevenDelta}${mucizeCaseEightDelta}${mucizeAdvancedOneDelta}${mucizeAdvancedTwoDelta}${mucizeAdvancedThreeDelta}${mucizeAdvancedFourDelta}${mucizeAdvancedFiveDelta}${mucizeAdvancedSixDelta}${mucizeAdvancedSevenDelta}${mucizeAdvancedEightDelta}${mucizeAdvancedNineDelta}${mucizeAdvancedTenDelta}${mucizeAdvancedElevenDelta}${mucizeAdvancedTwelveDelta}${mucizeAdvancedThirteenDelta}## Explicit authoring holds\n\n${holds}${secondHolds}${thirdHolds}${fourthHolds}${mosquitoHolds}${sandflyHolds}${mycologyHolds}${virologyHolds}${chapter10Holds}${pharmacologyPart2Holds}${mucizeParasitologyHolds}${mucizeParasitologySecondHolds}${mucizeParasitologyThirdHolds}${mucizeParasitologyFourthHolds}${mucizeCaseOneHolds}${mucizeCaseTwoHolds}${mucizeCaseThreeHolds}${mucizeCaseFourHolds}${mucizeCaseFiveHolds}${mucizeCaseSixHolds}${mucizeCaseSevenHolds}${mucizeCaseEightHolds}${mucizeAdvancedOneHolds}${mucizeAdvancedTwoHolds}${mucizeAdvancedThreeHolds}${mucizeAdvancedFourHolds}${mucizeAdvancedFiveHolds}${mucizeAdvancedSixHolds}${mucizeAdvancedSevenHolds}${mucizeAdvancedEightHolds}${mucizeAdvancedNineHolds}${mucizeAdvancedTenHolds}${mucizeAdvancedTwelveHolds}`)
    .replace('Governed prompt observations: 5,444 total; 38 authored; **5,406 raw prompt observations remain**, including 53 explicit holds', 'Governed prompt observations: 5,444 total; 47 authored; **5,397 raw prompt observations remain**, including 74 explicit holds')
    .replace('Governed answer observations: 5,211 total; 38 clean source-keyed prompts authored; **5,173 raw answer observations remain**, including the 53 held printed-key observations', 'Governed answer observations: 5,211 total; 47 clean source-keyed prompts authored; **5,164 raw answer observations remain**, including the 74 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 47 authored; **5,397 raw prompt observations remain**, including 74 explicit holds', 'Governed prompt observations: 5,444 total; 57 authored; **5,387 raw prompt observations remain**, including 94 explicit holds')
    .replace('Governed answer observations: 5,211 total; 47 clean source-keyed prompts authored; **5,164 raw answer observations remain**, including the 74 held printed-key observations', 'Governed answer observations: 5,211 total; 57 clean source-keyed prompts authored; **5,154 raw answer observations remain**, including the 94 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 57 authored; **5,387 raw prompt observations remain**, including 94 explicit holds', 'Governed prompt observations: 5,444 total; 76 authored; **5,368 raw prompt observations remain**, including 105 explicit holds')
    .replace('Governed answer observations: 5,211 total; 57 clean source-keyed prompts authored; **5,154 raw answer observations remain**, including the 94 held printed-key observations', 'Governed answer observations: 5,211 total; 76 clean source-keyed prompts authored; **5,135 raw answer observations remain**, including the 105 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 76 authored; **5,368 raw prompt observations remain**, including 105 explicit holds', 'Governed prompt observations: 5,444 total; 98 authored; **5,346 raw prompt observations remain**, including 113 explicit holds')
    .replace('Governed answer observations: 5,211 total; 76 clean source-keyed prompts authored; **5,135 raw answer observations remain**, including the 105 held printed-key observations', 'Governed answer observations: 5,211 total; 98 clean source-keyed prompts authored; **5,113 raw answer observations remain**, including the 113 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 98 authored; **5,346 raw prompt observations remain**, including 113 explicit holds', 'Governed prompt observations: 5,444 total; 117 authored; **5,327 raw prompt observations remain**, including 124 explicit holds')
    .replace('Governed answer observations: 5,211 total; 98 clean source-keyed prompts authored; **5,113 raw answer observations remain**, including the 113 held printed-key observations', 'Governed answer observations: 5,211 total; 117 clean source-keyed prompts authored; **5,094 raw answer observations remain**, including the 124 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 117 authored; **5,327 raw prompt observations remain**, including 124 explicit holds', 'Governed prompt observations: 5,444 total; 129 authored; **5,315 raw prompt observations remain**, including 142 explicit holds')
    .replace('Governed answer observations: 5,211 total; 117 clean source-keyed prompts authored; **5,094 raw answer observations remain**, including the 124 held printed-key observations', 'Governed answer observations: 5,211 total; 129 clean source-keyed prompts authored; **5,082 raw answer observations remain**, including the 142 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 129 authored; **5,315 raw prompt observations remain**, including 142 explicit holds', 'Governed prompt observations: 5,444 total; 132 authored; **5,312 raw prompt observations remain**, including 169 explicit holds')
    .replace('Governed answer observations: 5,211 total; 129 clean source-keyed prompts authored; **5,082 raw answer observations remain**, including the 142 held printed-key observations', 'Governed answer observations: 5,211 total; 132 clean source-keyed prompts authored; **5,079 raw answer observations remain**, including the 169 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 132 authored; **5,312 raw prompt observations remain**, including 169 explicit holds', 'Governed prompt observations: 5,444 total; 151 authored; **5,293 raw prompt observations remain**, including 180 explicit holds')
    .replace('Governed answer observations: 5,211 total; 132 clean source-keyed prompts authored; **5,079 raw answer observations remain**, including the 169 held printed-key observations', 'Governed answer observations: 5,211 total; 151 clean source-keyed prompts authored; **5,060 raw answer observations remain**, including the 180 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 151 authored; **5,293 raw prompt observations remain**, including 180 explicit holds', 'Governed prompt observations: 5,444 total; 173 authored; **5,271 raw prompt observations remain**, including 188 explicit holds')
    .replace('Governed answer observations: 5,211 total; 151 clean source-keyed prompts authored; **5,060 raw answer observations remain**, including the 180 held printed-key observations', 'Governed answer observations: 5,211 total; 173 clean source-keyed prompts authored; **5,038 raw answer observations remain**, including the 188 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 173 authored; **5,271 raw prompt observations remain**, including 188 explicit holds', 'Governed prompt observations: 5,444 total; 181 authored; **5,263 raw prompt observations remain**, including 209 explicit holds')
    .replace('Governed answer observations: 5,211 total; 173 clean source-keyed prompts authored; **5,038 raw answer observations remain**, including the 188 held printed-key observations', 'Governed answer observations: 5,211 total; 181 clean source-keyed prompts authored; **5,030 raw answer observations remain**, including the 209 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 181 authored; **5,263 raw prompt observations remain**, including 209 explicit holds', 'Governed prompt observations: 5,444 total; 197 authored; **5,247 raw prompt observations remain**, including 223 explicit holds')
    .replace('Governed answer observations: 5,211 total; 181 clean source-keyed prompts authored; **5,030 raw answer observations remain**, including the 209 held printed-key observations', 'Governed answer observations: 5,211 total; 197 clean source-keyed prompts authored; **5,014 raw answer observations remain**, including the 223 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 197 authored; **5,247 raw prompt observations remain**, including 223 explicit holds', 'Governed prompt observations: 5,444 total; 215 authored; **5,229 raw prompt observations remain**, including 235 explicit holds')
    .replace('Governed answer observations: 5,211 total; 197 clean source-keyed prompts authored; **5,014 raw answer observations remain**, including the 223 held printed-key observations', 'Governed answer observations: 5,211 total; 215 clean source-keyed prompts authored; **4,996 raw answer observations remain**, including the 235 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 215 authored; **5,229 raw prompt observations remain**, including 235 explicit holds', 'Governed prompt observations: 5,444 total; 219 authored; **5,225 raw prompt observations remain**, including 236 explicit holds')
    .replace('Governed answer observations: 5,211 total; 215 clean source-keyed prompts authored; **4,996 raw answer observations remain**, including the 235 held printed-key observations', 'Governed answer observations: 5,211 total; 219 clean source-keyed prompts authored; **4,992 raw answer observations remain**, including the 236 held printed-key observations')
    .replace('including 236 explicit holds', 'including 238 explicit holds')
    .replace('including the 236 held printed-key observations', 'including the 238 held printed-key observations')
    .replace('including 238 explicit holds', 'including 241 explicit holds')
    .replace('including the 238 held printed-key observations', 'including the 241 held printed-key observations')
    .replace('including 241 explicit holds', 'including 243 explicit holds')
    .replace('including the 241 held printed-key observations', 'including the 243 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 219 authored; **5,225 raw prompt observations remain**, including 243 explicit holds', 'Governed prompt observations: 5,444 total; 222 authored; **5,222 raw prompt observations remain**, including 251 explicit holds')
    .replace('Governed answer observations: 5,211 total; 219 clean source-keyed prompts authored; **4,992 raw answer observations remain**, including the 243 held printed-key observations', 'Governed answer observations: 5,211 total; 222 clean source-keyed prompts authored; **4,989 raw answer observations remain**, including the 251 held printed-key observations')
    .replace('including 251 explicit holds', 'including 255 explicit holds')
    .replace('including the 251 held printed-key observations', 'including the 255 held printed-key observations')
    .replace('including 255 explicit holds', 'including 256 explicit holds')
    .replace('including the 255 held printed-key observations', 'including the 256 held printed-key observations')
    .replace('including 223 explicit holds and one source-absent opening-family prompt', 'including 223 explicit holds and two source-absent prompts')
    .replace('including 235 explicit holds and one source-absent opening-family prompt', 'including 235 explicit holds and two source-absent prompts')
    .replace('including 236 explicit holds and one source-absent opening-family prompt', 'including 236 explicit holds and two source-absent prompts')
    .replace('including 238 explicit holds and one source-absent opening-family prompt', 'including 238 explicit holds and two source-absent prompts')
    .replace('including 241 explicit holds and one source-absent opening-family prompt', 'including 241 explicit holds and two source-absent prompts')
    .replace('including 243 explicit holds and one source-absent opening-family prompt', 'including 243 explicit holds and two source-absent prompts')
    .replace('including 251 explicit holds and one source-absent opening-family prompt', 'including 251 explicit holds and two source-absent prompts')
    .replace('including 255 explicit holds and one source-absent opening-family prompt', 'including 255 explicit holds and two source-absent prompts')
    .replace('including 256 explicit holds and one source-absent opening-family prompt', 'including 256 explicit holds and two source-absent prompts')
    .replace('Q32 contributes no answer observation', 'opening-bank Q32 and Mucize Q25 contribute no answer observations')
    .replace('Record-level backlog is not asserted as 5,406 unique records', 'Record-level backlog is not asserted as 5,397 unique records')
    .replace('Record-level backlog is not asserted as 5,397 unique records', 'Record-level backlog is not asserted as 5,387 unique records')
    .replace('Record-level backlog is not asserted as 5,387 unique records', 'Record-level backlog is not asserted as 5,368 unique records')
    .replace('Record-level backlog is not asserted as 5,368 unique records', 'Record-level backlog is not asserted as 5,346 unique records')
    .replace('Record-level backlog is not asserted as 5,346 unique records', 'Record-level backlog is not asserted as 5,327 unique records')
    .replace('Record-level backlog is not asserted as 5,327 unique records', 'Record-level backlog is not asserted as 5,315 unique records')
    .replace('Record-level backlog is not asserted as 5,315 unique records', 'Record-level backlog is not asserted as 5,312 unique records')
    .replace('Record-level backlog is not asserted as 5,312 unique records', 'Record-level backlog is not asserted as 5,293 unique records')
    .replace('Record-level backlog is not asserted as 5,293 unique records', 'Record-level backlog is not asserted as 5,271 unique records')
    .replace('Record-level backlog is not asserted as 5,271 unique records', 'Record-level backlog is not asserted as 5,263 unique records')
    .replace('Record-level backlog is not asserted as 5,263 unique records', 'Record-level backlog is not asserted as 5,247 unique records')
    .replace('Record-level backlog is not asserted as 5,247 unique records', 'Record-level backlog is not asserted as 5,229 unique records')
    .replace('Record-level backlog is not asserted as 5,229 unique records', 'Record-level backlog is not asserted as 5,225 unique records')
    .replace('Record-level backlog is not asserted as 5,225 unique records', 'Record-level backlog is not asserted as 5,224 unique records')
    .replace('Record-level backlog is not asserted as 5,224 unique records', 'Record-level backlog is not asserted as 5,223 unique records')
    .replace('Record-level backlog is not asserted as 5,223 unique records', 'Record-level backlog is not asserted as 5,222 unique records')
    .replace('Record-level backlog is not asserted as 5,222 unique records', 'Record-level backlog is not asserted as 5,221 unique records')
    .replace('global Q61–Q90 (Microbiology Ch1-3) and the two later 30-prompt sections remain unopened for downstream authoring.', 'global Q61–Q90 are fully dispositioned; global Q91–Q120, Microbiology Chapter 6, and the final 30-prompt section remain unopened for downstream authoring.')
    .replace('All twenty-one student-facing articles and all thirty-eight questions remain Draft; all thirty-five concepts', 'All twenty-three student-facing articles and all forty-seven questions remain Draft; all forty-three concepts')
    .replace('All twenty-three student-facing articles and all forty-seven questions remain Draft; all forty-three concepts', 'All twenty-five student-facing articles and all fifty-seven questions remain Draft; all fifty-three concepts')
    .replace('All twenty-five student-facing articles and all fifty-seven questions remain Draft; all fifty-three concepts', 'All twenty-seven student-facing articles and all seventy-six questions remain Draft; all sixty-nine concepts')
    .replace('All twenty-seven student-facing articles and all seventy-six questions remain Draft; all sixty-nine concepts', 'All thirty student-facing articles and all ninety-eight questions remain Draft; all eighty-nine concepts')
    .replace('All thirty student-facing articles and all ninety-eight questions remain Draft; all eighty-nine concepts', 'All thirty-three student-facing articles and all one hundred seventeen questions remain Draft; all one hundred three concepts')
    .replace('All thirty-three student-facing articles and all one hundred seventeen questions remain Draft; all one hundred three concepts', 'All thirty-six student-facing articles and all one hundred twenty-nine questions remain Draft; all one hundred thirteen concepts')
    .replace('All thirty-six student-facing articles and all one hundred twenty-nine questions remain Draft; all one hundred thirteen concepts', 'All thirty-eight student-facing articles and all one hundred thirty-two questions remain Draft; all one hundred sixteen concepts')
    .replace('All thirty-eight student-facing articles and all one hundred thirty-two questions remain Draft; all one hundred sixteen concepts', 'All forty-one student-facing articles and all one hundred fifty-one questions remain Draft; all one hundred twenty-nine concepts')
    .replace('All forty-one student-facing articles and all one hundred fifty-one questions remain Draft; all one hundred twenty-nine concepts', 'All forty-four student-facing articles and all one hundred seventy-three questions remain Draft; all one hundred thirty-nine concepts')
    .replace('All forty-four student-facing articles and all one hundred seventy-three questions remain Draft; all one hundred thirty-nine concepts', 'All forty-four student-facing articles and all one hundred eighty-one questions remain Draft; all one hundred thirty-nine concepts')
    .replace('All forty-four student-facing articles and all one hundred eighty-one questions remain Draft; all one hundred thirty-nine concepts', 'All forty-four student-facing articles and all one hundred ninety-seven questions remain Draft; all one hundred forty-eight concepts')
    .replace('All forty-four student-facing articles and all one hundred ninety-seven questions remain Draft; all one hundred forty-eight concepts', 'All forty-four student-facing articles and all two hundred fifteen questions remain Draft; all one hundred fifty-three concepts')
    .replace('All forty-four student-facing articles and all two hundred fifteen questions remain Draft; all one hundred fifty-three concepts', 'All forty-four student-facing articles and all two hundred nineteen questions remain Draft; all one hundred fifty-six concepts')
    .replace('## Exact backlog after twenty-six slices and terminal reconciliation', '## Exact backlog after the bounded slices and terminal reconciliation')
    .replace('Q2, Q3, Q4, Q6, Q13 through Q31 exist only as authoring-ledger holds; Q32 exists only as a source-absent ledger disposition.', 'All 74 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 74 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 94 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 94 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 105 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 105 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 113 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 113 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 124 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 124 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 142 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 142 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 169 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 169 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 180 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 180 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 188 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.')
    .replace('All 188 held prompts exist only as authoring-ledger dispositions with no student-facing record; Q32 exists only as a source-absent ledger disposition.', 'All 209 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 209 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 223 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 223 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 235 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 235 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 236 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 236 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 238 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 238 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 241 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 241 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 243 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All forty-four student-facing articles and all two hundred nineteen questions remain Draft; all one hundred fifty-six concepts', 'All forty-four student-facing articles and all two hundred twenty-two questions remain Draft; all one hundred fifty-seven concepts')
    .replace('All forty-four student-facing articles and all two hundred twenty-two questions remain Draft; all one hundred fifty-seven concepts', 'All forty-four student-facing articles and all two hundred twenty-three questions remain Draft; all one hundred fifty-seven concepts')
    .replace('All forty-four student-facing articles and all two hundred twenty-three questions remain Draft; all one hundred fifty-seven concepts', 'All forty-four student-facing articles and all two hundred twenty-four questions remain Draft; all one hundred fifty-eight concepts')
    .replace('All 243 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 246 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 246 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 247 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 247 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 249 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 249 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 251 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 251 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 255 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 255 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 256 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 256 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 257 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 257 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 258 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 258 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 259 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 259 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 260 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 260 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 261 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 261 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 262 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 262 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 263 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 263 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 264 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 264 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 265 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('All 265 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.', 'All 266 held prompts exist only as authoring-ledger dispositions with no student-facing record; opening-bank Q32 and Mucize Q25 exist only as source-absent ledger dispositions.')
    .replace('| Question authoring holds | 256 |', '| Question authoring holds | 259 |')
    .replace('| Question authoring holds | 259 |', '| Question authoring holds | 260 |')
    .replace('| Question authoring holds | 260 |', '| Question authoring holds | 261 |')
    .replace('| Question authoring holds | 261 |', '| Question authoring holds | 262 |')
    .replace('| Question authoring holds | 262 |', '| Question authoring holds | 263 |')
    .replace('| Question authoring holds | 263 |', '| Question authoring holds | 264 |')
    .replace('| Question authoring holds | 264 |', '| Question authoring holds | 265 |')
    .replace('| Question authoring holds | 265 |', '| Question authoring holds | 266 |')
    .replace('including 256 explicit holds and two source-absent prompts', 'including 259 explicit holds and two source-absent prompts')
    .replace('including the 256 held printed-key observations', 'including the 259 held printed-key observations')
    .replace('including 259 explicit holds and two source-absent prompts', 'including 260 explicit holds and two source-absent prompts')
    .replace('including the 259 held printed-key observations', 'including the 260 held printed-key observations')
    .replace('including 260 explicit holds and two source-absent prompts', 'including 261 explicit holds and two source-absent prompts')
    .replace('including the 260 held printed-key observations', 'including the 261 held printed-key observations')
    .replace('including 261 explicit holds and two source-absent prompts', 'including 262 explicit holds and two source-absent prompts')
    .replace('including the 261 held printed-key observations', 'including the 262 held printed-key observations')
    .replace('including 262 explicit holds and two source-absent prompts', 'including 263 explicit holds and two source-absent prompts')
    .replace('including the 262 held printed-key observations', 'including the 263 held printed-key observations')
    .replace('including 263 explicit holds and two source-absent prompts', 'including 264 explicit holds and two source-absent prompts')
    .replace('including the 263 held printed-key observations', 'including the 264 held printed-key observations')
    .replace('including 264 explicit holds and two source-absent prompts', 'including 265 explicit holds and two source-absent prompts')
    .replace('including the 264 held printed-key observations', 'including the 265 held printed-key observations')
    .replace('including 265 explicit holds and two source-absent prompts', 'including 266 explicit holds and two source-absent prompts')
    .replace('including the 265 held printed-key observations', 'including the 266 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 222 authored; **5,222 raw prompt observations remain**, including 266 explicit holds and two source-absent prompts', 'Governed prompt observations: 5,444 total; 223 authored; **5,221 raw prompt observations remain**, including 266 explicit holds and two source-absent prompts')
    .replace('Governed answer observations: 5,211 total; 222 clean source-keyed prompts authored; **4,989 raw answer observations remain**, including the 266 held printed-key observations', 'Governed answer observations: 5,211 total; 223 clean source-keyed prompts authored; **4,988 raw answer observations remain**, including the 266 held printed-key observations')
    .replace('Governed prompt observations: 5,444 total; 223 authored; **5,221 raw prompt observations remain**, including 266 explicit holds and two source-absent prompts', 'Governed prompt observations: 5,444 total; 224 authored; **5,220 raw prompt observations remain**, including 266 explicit holds and two source-absent prompts')
    .replace('Governed answer observations: 5,211 total; 223 clean source-keyed prompts authored; **4,988 raw answer observations remain**, including the 266 held printed-key observations', 'Governed answer observations: 5,211 total; 224 clean source-keyed prompts authored; **4,987 raw answer observations remain**, including the 266 held printed-key observations')
    .replace('global Q61–Q90 are fully dispositioned; global Q91–Q120, Microbiology Chapter 6, and the final 30-prompt section remain unopened for downstream authoring.', 'global Q1–Q120 are fully dispositioned; only global Q121–Q150, the final 30-prompt section, remains unopened for downstream authoring.')
    .replace('global Q1–Q120 are fully dispositioned; only global Q121–Q150, the final 30-prompt section, remains unopened for downstream authoring.', 'global Q1–Q150 are fully dispositioned; the Absalam source has no remaining unassessed family.')
    .replace('global Q1–Q150 are fully dispositioned; the Absalam source has no remaining unassessed family.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes Q1–Q30 are also fully dispositioned. The exact next boundary is Part 2 Sandfly Q1–Q30 on pages 10–18.')
    .replace('global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes Q1–Q30 are also fully dispositioned. The exact next boundary is Part 2 Sandfly Q1–Q30 on pages 10–18.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes Q1–Q30 and Sandfly Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Mycology Q1–Q30 on pages 19–29.')
    .replace('global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes Q1–Q30 and Sandfly Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Mycology Q1–Q30 on pages 19–29.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly and Mycology Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Virology Q1–Q30 on pages 30–38.')
    .replace('global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly and Mycology Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Virology Q1–Q30 on pages 30–38.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly, Mycology and Virology Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Microbiology Chapter 10 Q1–Q30 on pages 39–47.')
    .replace('global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly, Mycology and Virology Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Microbiology Chapter 10 Q1–Q30 on pages 39–47.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly, Mycology, Virology and Microbiology Chapter 10 Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Pharmacology Q1–Q30 on pages 48–56.')
    .replace('global Q1–Q150 are fully dispositioned for Absalam Part 1; Part 2 Mosquitoes, Sandfly, Mycology, Virology and Microbiology Chapter 10 Q1–Q30 are fully dispositioned. The exact next boundary is Part 2 Pharmacology Q1–Q30 on pages 48–56.', 'global Q1–Q150 are fully dispositioned for Absalam Part 1; all six Part 2 families through Pharmacology Q1–Q30 are fully dispositioned. The Absalam Part 2 source is complete; the next question-bearing family must be selected from the governed FHB-102-2 source ranking.')
    .replace('The Absalam Part 2 source is complete; the next question-bearing family must be selected from the governed FHB-102-2 source ranking.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q31.')
    .replace('The next family boundary is the completed third triage source, `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf`, SHA-256 `4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf`, a 45-page student-authored revision bank containing five independent 30-MCQ sections (150 prompts / 150 printed answers). Its Parasitology Introduction Q1–Q30 and Arthropoda Q1–Q30 boundaries are fully dispositioned; ', 'The current source boundary is the governed 47-page Mucize Doctors student-authored bank, `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf`, SHA-256 `352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f`. Its physical pages 6–18 / Parasitology core Q1–Q90 are fully dispositioned; ')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q31.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q61.')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q61.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q91.')
    .replace('Its physical pages 6–18 / Parasitology core Q1–Q90 are fully dispositioned;', 'Its physical pages 6–19 / Parasitology core Q1–Q95 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Parasitology Q91.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 1 on physical page 20.')
    .replace('Its physical pages 6–19 / Parasitology core Q1–Q95 are fully dispositioned;', 'Its physical pages 6–20 / Parasitology core Q1–Q95 and case-based learning Case 1 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 1 on physical page 20.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 2 on physical page 20.')
    .replace('Its physical pages 6–20 / Parasitology core Q1–Q95 and case-based learning Case 1 are fully dispositioned;', 'Its physical pages 6–20 / Parasitology core Q1–Q95 and case-based learning Cases 1–2 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 2 on physical page 20.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 3 on physical page 21.')
    .replace('Its physical pages 6–20 / Parasitology core Q1–Q95 and case-based learning Cases 1–2 are fully dispositioned;', 'Its physical pages 6–21 / Parasitology core Q1–Q95 and case-based learning Cases 1–3 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 3 on physical page 21.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 4 on physical page 21.')
    .replace('Its physical pages 6–21 / Parasitology core Q1–Q95 and case-based learning Cases 1–3 are fully dispositioned;', 'Its physical pages 6–21 / Parasitology core Q1–Q95 and case-based learning Cases 1–4 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 4 on physical page 21.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 5 on physical page 22.')
    .replace('Its physical pages 6–21 / Parasitology core Q1–Q95 and case-based learning Cases 1–4 are fully dispositioned;', 'Its physical pages 6–22 / Parasitology core Q1–Q95 and case-based learning Cases 1–5 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 5 on physical page 22.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 6 on physical page 22.')
    .replace('Its physical pages 6–22 / Parasitology core Q1–Q95 and case-based learning Cases 1–5 are fully dispositioned;', 'Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–6 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 6 on physical page 22.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 7 on physical page 22.')
    .replace('Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–6 are fully dispositioned;', 'Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–7 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 7 on physical page 22.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 8 on physical page 23.')
    .replace('Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–7 are fully dispositioned;', 'Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–8 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize case-based learning Case 8 on physical page 23.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQs Q1 on physical page 24.')
    .replace('Its physical pages 6–23 / Parasitology core Q1–Q95 and case-based learning Cases 1–8 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQ Q1 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQs Q1 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q2 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQ Q1 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q2 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q2 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q3 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q2 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q3 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q3 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q4 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q3 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q4 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q4 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q5 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q4 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q5 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q5 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q6 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q5 are fully dispositioned;', 'Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q6 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q6 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q7 on physical page 24.')
    .replace('Its physical pages 6–24 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q6 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q7 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q7 on physical page 24.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q8 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q7 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q8 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q8 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q9 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q8 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q9 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q9 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q10 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q9 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q10 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q10 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q11 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q10 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q11 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q11 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q12 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q11 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q12 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q12 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q13 on physical page 25.')
    .replace('Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q12 are fully dispositioned;', 'Its physical pages 6–25 and 28 / Parasitology core Q1–Q95, case-based learning Cases 1–8 and Advanced MCQs Q1–Q13 are fully dispositioned;')
    .replace('The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q13 on physical page 25.', 'The Absalam Part 2 source is complete. The exact next boundary is Mucize Advanced MCQ Q14 on physical page 25.')
}
