use std::sync::Mutex;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct CreoLinguaFile {
    pub dictionary: Option<Dictionary>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Dictionary {
    #[serde(rename = "DictSaveDate")]
    pub dict_save_date: String,
    #[serde(rename = "EtymologyCollection")]
    pub etymology_collection: EtymologyCollection,
    #[serde(rename = "PolyGlotVer")]
    pub poly_glot_ver: String,
    #[serde(rename = "ToDoLog")]
    pub to_do_log: ToDoLog,
    pub dec_combined_form_section: DecCombinedFormSection,
    pub declension_collection: DeclensionCollection,
    #[serde(rename = "etymologyCollection")]
    pub dictionary_etymology_collection: EtymologyCollectionClass,
    pub grammar_collection: DecCombinedFormSection,
    pub language_properties: LanguageProperties,
    pub lexicon: Lexicon,
    pub logo_root_node: LogoRootNode,
    pub parts_of_speech: PartsOfSpeech,
    pub phrase_book_collection: PhraseBookCollection,
    pub rom_guide: RomGuide,
    pub thes_node: ThesNode,
    pub word_grammar_class_collection: WordGrammarClassCollection,
}

#[derive(Serialize, Deserialize)]
pub struct DecCombinedFormSection {
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DeclensionCollection {
    pub dec_gen_rule: Vec<DecGenRule>,
    pub declension_node: Vec<DeclensionNode>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DecGenRule {
    pub dec_gen_rule_apply_to_classes: DecGenRuleApplyToClasses,
    pub dec_gen_rule_comb: String,
    pub dec_gen_rule_index: i64,
    pub dec_gen_rule_name: DecGenRuleNameUnion,
    pub dec_gen_rule_regex: DecGenRuleRegex,
    pub dec_gen_rule_type_id: i64,
    pub dec_gen_trans: Option<DecGenTransUnion>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DecGenRuleApplyToClasses {
    pub dec_gen_rule_apply_to_class_value: Option<DecGenRuleApplyToClassValue>,
}

#[derive(Serialize, Deserialize)]
pub enum DecGenRuleApplyToClassValue {
    #[serde(rename = "-1,-1")]
    The11,
    #[serde(rename = "2,0")]
    The20,
    #[serde(rename = "2,2")]
    The22,
    #[serde(rename = "2,4")]
    The24,
    #[serde(rename = "2,6")]
    The26,
}

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum DecGenRuleNameUnion {
    DecCombinedFormSection(DecCombinedFormSection),
    Enum(DecGenRuleNameEnum),
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DecGenRuleNameEnum {
    #[serde(rename = "Masculine")]
    DecGenRuleNameMasculine,
    #[serde(rename = "simple")]
    DecGenRuleNameSimple,
    #[serde(rename = "Simple Setup")]
    DecGenRuleNameSimpleSetup,
    Epicene,
    Feminine,
    Masculine,
    Netuer,
    Neuter,
    #[serde(rename = "SImple")]
    SImple,
    #[serde(rename = "Simple")]
    Simple,
    #[serde(rename = "SIMPLE-SETUP")]
    SimpleSetup,
}

#[derive(Serialize, Deserialize)]
pub enum DecGenRuleRegex {
    #[serde(rename = ".*")]
    Empty,
}

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum DecGenTransUnion {
    DecGenTranArray(Vec<DecGenTran>),
    DecGenTransClass(DecGenTransClass),
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DecGenTran {
    pub dec_gen_trans_regex: DecGenTransRegexEnum,
    pub dec_gen_trans_replace: String,
}

#[derive(Serialize, Deserialize)]
pub enum DecGenTransRegexEnum {
    #[serde(rename = "^")]
    DecGenTransRegex,
    #[serde(rename = "$")]
    Empty,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DecGenTransClass {
    pub dec_gen_trans_regex: DecGenTransRegexUnion,
    pub dec_gen_trans_replace: PhraseConPhrase,
}

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum DecGenTransRegexUnion {
    DecCombinedFormSection(DecCombinedFormSection),
    Enum(DecGenTransRegexEnum),
}

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum PhraseConPhrase {
    DecCombinedFormSection(DecCombinedFormSection),
    String(String),
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DeclensionNode {
    pub declension_dimensionless: ProGuideRecurse,
    pub declension_id: i64,
    pub declension_notes: DecCombinedFormSection,
    pub declension_related_id: i64,
    pub declension_template: i64,
    pub declension_text: String,
    pub dimension_node: Vec<DimensionNode>,
}

#[derive(Serialize, Deserialize)]
pub enum ProGuideRecurse {
    F,
    T,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DimensionNode {
    pub dimension_id: i64,
    pub dimension_name: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EtymologyCollectionClass {
    #[serde(rename = "proFGFuideSyllableList")]
    pub pro_fg_fuide_syllable_list: ProFgFuideSyllableList,
    pub pro_guide: Vec<ProGuide>,
    pub pro_guide_recurse: ProGuideRecurse,
    pub pro_guide_syllable_composition: ProGuideRecurse,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProFgFuideSyllableList {
    pub pro_guide_syllable: Vec<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProGuide {
    pub pro_guide_base: String,
    pub pro_guide_phon: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct EtymologyCollection {
    pub etymology_internal_relation: Vec<i64>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LanguageProperties {
    pub alpha_order: String,
    pub expanded_lex_list_display: ProGuideRecurse,
    pub font_size: f64,
    pub font_style: i64,
    pub lang_name: String,
    pub lang_prop_author_copyright: DecCombinedFormSection,
    pub lang_prop_char_rep: DecCombinedFormSection,
    pub lang_prop_disable_proc_regex: ProGuideRecurse,
    #[serde(rename = "langPropEnforceRTL")]
    pub lang_prop_enforce_rtl: ProGuideRecurse,
    pub lang_prop_ignore_case: ProGuideRecurse,
    pub lang_prop_kerning_value: f64,
    pub lang_prop_local_lang_name: String,
    pub lang_prop_local_mandatory: ProGuideRecurse,
    pub lang_prop_local_uniqueness: ProGuideRecurse,
    pub lang_prop_override_regex_font: ProGuideRecurse,
    pub lang_prop_type_mandatory: ProGuideRecurse,
    pub lang_prop_use_local_lexicon: ProGuideRecurse,
    pub lang_prop_use_simplified_conjugations: ProGuideRecurse,
    pub lang_prop_word_uniqueness: ProGuideRecurse,
    pub local_font_size: f64,
    pub zompist_categories: String,
    pub zompist_dropoff_rate: f64,
    pub zompist_illegal_clusters: DecCombinedFormSection,
    pub zompist_monosyllable_frequency: f64,
    pub zompist_rewrite_rules: String,
    pub zompist_syllables: String,
}

#[derive(Serialize, Deserialize)]
pub struct Lexicon {
    pub word: Vec<Word>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Word {
    pub auto_decl_override: ProGuideRecurse,
    pub con_word: String,
    pub definition: String,
    pub local_word: String,
    pub pronunciation: String,
    pub word_class_collection: WordClassCollection,
    pub word_class_text_value_collection: DecCombinedFormSection,
    pub word_etymology_notes: DecCombinedFormSection,
    pub word_id: i64,
    pub word_proc_override: ProGuideRecurse,
    pub word_rule_override: ProGuideRecurse,
    pub word_type_id: i64,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WordClassCollection {
    pub word_classification: Option<DecGenRuleApplyToClassValue>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LogoRootNode {
    #[serde(rename = "LogoRelationsCollection")]
    pub logo_relations_collection: DecCombinedFormSection,
    pub logo_graphs_collection: DecCombinedFormSection,
}

#[derive(Serialize, Deserialize)]
pub struct PartsOfSpeech {
    pub class: Vec<Class>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Class {
    pub class_gloss: String,
    pub class_id: i64,
    pub class_name: String,
    pub class_notes: DecCombinedFormSection,
    pub class_pattern: DecCombinedFormSection,
    pub definition_mandatory_class: ProGuideRecurse,
    pub pronunciation_mandatory_class: ProGuideRecurse,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PhraseBookCollection {
    pub phrase_node: Vec<PhraseNode>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PhraseNode {
    pub phrase_con_phrase: PhraseConPhrase,
    pub phrase_gloss: PhraseConPhrase,
    pub phrase_id: i64,
    pub phrase_local_phrase: PhraseConPhrase,
    pub phrase_notes: DecCombinedFormSection,
    pub phrase_notes_order: i64,
    pub phrase_pronunciation: PhraseConPhrase,
    pub phrase_pronunciation_override: ProGuideRecurse,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RomGuide {
    pub rom_guide_enabled: ProGuideRecurse,
    pub rom_guide_node: Vec<RomGuideNode>,
    pub rom_guide_recurse: ProGuideRecurse,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RomGuideNode {
    pub rom_guide_base: String,
    pub rom_guide_phon: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ThesNode {
    pub thes_name: DecCombinedFormSection,
    pub thes_notes: DecCombinedFormSection,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct ToDoLog {
    pub to_do_node_head: ToDoNodeHead,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct ToDoNodeHead {
    pub to_do_node_done: ProGuideRecurse,
    pub to_do_node_label: DecCombinedFormSection,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WordGrammarClassCollection {
    pub word_grammar_class_node: WordGrammarClassNode,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WordGrammarClassNode {
    pub word_grammar_apply_types: String,
    #[serde(rename = "wordGrammarClassID")]
    pub word_grammar_class_id: i64,
    pub word_grammar_class_name: String,
    pub word_grammar_class_values_collection: WordGrammarClassValuesCollection,
    pub word_grammar_is_associative: ProGuideRecurse,
    pub word_grammar_is_free_text_field: ProGuideRecurse,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WordGrammarClassValuesCollection {
    pub word_grammar_class_value_node: Vec<WordGrammarClassValueNode>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WordGrammarClassValueNode {
    pub word_grammar_class_value_id: i64,
    pub word_grammar_class_value_name: String,
}


pub struct FileContents {
    pub contents: Mutex<CreoLinguaFile>
}
