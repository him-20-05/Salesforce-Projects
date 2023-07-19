trigger trigger_rating_field on Account (before insert) {
    account_handler.populate_industry_field(trigger.new);

}