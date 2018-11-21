<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

$source = get_post_meta( get_the_ID(), '_qod_quote_source', true );
$source_url = get_post_meta( get_the_ID(), '_qod_quote_source_url', true );

?>
<div>
<i class="fas fa-quote-left"></i>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

	<div class="entry-meta">
	  <?php the_title( '<h2 class="entry-title">&mdash; ', '</h2>' ); ?>

	  <?php if( $source && $source_url ): ?>

		<span class="source">, <a href="<?php echo $source_url; ?>"><?php echo $source; ?></a></span>

<!-- if both exist -->
	  <?php elseif( $source ): ?>

		<span class="source">, <?php echo $source; ?></span>

<!-- if only source exists -->

	  <?php else: ?>

		<span class="source"></span>

	  <?php endif; ?>

	</div><!-- .entry-meta -->

</article><!-- #post-## -->
<i class="fas fa-quote-right"></i>
</div>

<?php 
	if( is_home() || is_single() ): ?>
		<button type="button" id="new-quote-button">Show Me Another!</button>	
	<?php endif; ?>
